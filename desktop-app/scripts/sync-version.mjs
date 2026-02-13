import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, "..");

const packageJsonPath = path.join(root, "package.json");
const tauriConfigPath = path.join(root, "src-tauri", "tauri.conf.json");
const cargoTomlPath = path.join(root, "src-tauri", "Cargo.toml");

const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));
const version = packageJson.version;

if (!version) {
  throw new Error("package.json version not found");
}

const tauriConfig = JSON.parse(fs.readFileSync(tauriConfigPath, "utf8"));
tauriConfig.version = version;
fs.writeFileSync(tauriConfigPath, `${JSON.stringify(tauriConfig, null, 4)}\n`, "utf8");

const cargoToml = fs.readFileSync(cargoTomlPath, "utf8");
const nextCargoToml = cargoToml.replace(
  /^version\s*=\s*".*"$/m,
  `version = "${version}"`
);

if (nextCargoToml === cargoToml) {
  throw new Error("Cargo.toml version field not found");
}

fs.writeFileSync(cargoTomlPath, nextCargoToml, "utf8");

console.log(`Synced desktop version to ${version}`);
