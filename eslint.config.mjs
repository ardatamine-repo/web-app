// eslint.config.js
import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Compat todavía puede estar presente, pero no lo usamos
const compat = new FlatCompat({
  baseDirectory: __dirname,
});

// Configuración vacía (no se aplican reglas)
const eslintConfig = [];

export default eslintConfig;
