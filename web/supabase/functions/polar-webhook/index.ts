import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.7';

const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

Deno.serve(async (req: Request) => {
    try {
        const body = await req.json();
        const { type, data } = body;

        // Polar Webhook: order.created or purchase.created
        if (type === 'order.created' || type === 'purchase.created') {
            const email = data.customer_email || data.user?.email;
            const polarUserId = data.user_id;

            // 1. Find or create profile (Auth is usually separate, but we ensure DB entry)
            // Note: Realistically, we find user by email since they should have logged in with Google first.
            const { data: profile, error: profileError } = await supabase
                .from('profiles')
                .select('id')
                .eq('email', email)
                .single();

            if (profileError || !profile) {
                console.error('User profile not found for email:', email);
                return new Response(JSON.stringify({ error: 'User not found' }), { status: 404 });
            }

            // 2. Generate specialized license key
            const licenseKey = `VL-${Math.random().toString(36).substring(2, 6).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;

            // 3. Insert into licenses table
            const { error: licenseError } = await supabase
                .from('licenses')
                .insert({
                    user_id: profile.id,
                    license_key: licenseKey,
                    status: 'active',
                    product_type: 'lifetime',
                    user_email: email
                });

            if (licenseError) throw licenseError;

            return new Response(JSON.stringify({ success: true, licenseKey }), {
                headers: { 'Content-Type': 'application/json' },
            });
        }

        return new Response(JSON.stringify({ message: 'Ignored event' }), { status: 200 });
    } catch (err) {
        console.error('Webhook error:', err);
        return new Response(JSON.stringify({ error: err.message }), { status: 400 });
    }
});
