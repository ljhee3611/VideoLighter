import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.7";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? "";
const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
const supabase = createClient(supabaseUrl, serviceRoleKey);

type VerifyPayload = {
  licenseKey?: string;
  deviceId?: string;
  appVersion?: string;
  osName?: string;
};

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const body = (await req.json()) as VerifyPayload;
    const licenseKey = String(body.licenseKey ?? "").trim();
    const deviceFingerprint = String(body.deviceId ?? "").trim();
    const appVersion = body.appVersion ? String(body.appVersion) : null;
    const osName = body.osName ? String(body.osName) : null;

    if (!licenseKey || !deviceFingerprint) {
      return new Response(JSON.stringify({ success: false, reason: "INVALID_REQUEST" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { data: licenseRows, error: licenseError } = await supabase
      .from("licenses")
      .select("id,license_key,status,product_type,expires_at,user_id")
      .eq("license_key", licenseKey)
      .order("created_at", { ascending: false })
      .limit(1);

    if (licenseError) throw licenseError;
    const license = licenseRows?.[0];

    if (!license) {
      return new Response(JSON.stringify({ success: false, reason: "INVALID_KEY" }), {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (license.status !== "active") {
      return new Response(JSON.stringify({ success: false, reason: "INVALID_KEY" }), {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (license.expires_at && new Date(license.expires_at).getTime() <= Date.now()) {
      return new Response(JSON.stringify({ success: false, reason: "EXPIRED" }), {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { data: existingActivationRows, error: existingActivationError } = await supabase
      .from("license_activations")
      .select("id,device_id,deactivated_at")
      .eq("license_id", license.id)
      .is("deactivated_at", null)
      .limit(1);
    if (existingActivationError) throw existingActivationError;

    const existingActivation = existingActivationRows?.[0] ?? null;

    const { data: deviceRows, error: deviceError } = await supabase
      .from("devices")
      .select("id")
      .eq("device_fingerprint", deviceFingerprint)
      .limit(1);
    if (deviceError) throw deviceError;

    let deviceId = deviceRows?.[0]?.id ?? null;

    if (!deviceId) {
      const { data: newDevice, error: createDeviceError } = await supabase
        .from("devices")
        .insert({
          device_fingerprint: deviceFingerprint,
          os_name: osName,
          app_version: appVersion,
          first_seen_at: new Date().toISOString(),
          last_seen_at: new Date().toISOString(),
        })
        .select("id")
        .single();
      if (createDeviceError) throw createDeviceError;
      deviceId = newDevice.id;
    } else {
      const { error: updateDeviceError } = await supabase
        .from("devices")
        .update({
          os_name: osName,
          app_version: appVersion,
          last_seen_at: new Date().toISOString(),
        })
        .eq("id", deviceId);
      if (updateDeviceError) throw updateDeviceError;
    }

    if (existingActivation && existingActivation.device_id !== deviceId) {
      return new Response(JSON.stringify({ success: false, reason: "MACHINE_LOCKED" }), {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (!existingActivation) {
      const { error: createActivationError } = await supabase
        .from("license_activations")
        .insert({
          license_id: license.id,
          device_id: deviceId,
          activated_at: new Date().toISOString(),
        });
      if (createActivationError) {
        // One active license per device, one active device per license.
        if (createActivationError.message?.includes("uq_license_activations")) {
          return new Response(JSON.stringify({ success: false, reason: "MACHINE_LOCKED" }), {
            status: 200,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          });
        }
        throw createActivationError;
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        reason: "OK",
        productType: license.product_type,
        expiresAt: license.expires_at,
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("verify-license error:", message);
    return new Response(JSON.stringify({ success: false, reason: "SERVER_ERROR", message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
