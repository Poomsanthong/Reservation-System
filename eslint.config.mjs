import { defineConfig, globalIgnores } from "eslint/config";

const eslintConfig = defineConfig([
  {
    files: ["**/*.{js,mjs}"],
    rules: {
      "no-unused-vars": "warn",
    },
  },
  globalIgnores([
    "**/*.ts",
    "**/*.tsx",
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
