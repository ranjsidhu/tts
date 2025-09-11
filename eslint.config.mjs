import { defineConfig } from "eslint/config";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default defineConfig([
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "coverage/**",
      "generated/**",
      "dist/**",
      "build/**",
      "next.config.mjs",
      "eslint.config.mjs",
      "jest.config.ts",
    ],
  },
  // Spread the Next.js config produced by compat to avoid redefining plugins
  ...compat.extends("next"),
  {
    rules: {
      "no-unused-vars": [
        "error",
        {
          vars: "all",
          args: "after-used",
          ignoreRestSiblings: false,
        },
      ],

      "import/no-unused-modules": [
        "error",
        {
          unusedExports: true,
          missingExports: false,
          ignoreExports: ["**/page.tsx", "**/not-found.tsx"],
        },
      ],
    },
  },
]);
