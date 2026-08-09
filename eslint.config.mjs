import nextConfig from "eslint-config-next";
import nextTypescriptConfig from "eslint-config-next/typescript";

const eslintConfig = [
  { ignores: ["scripts/**"] },
  ...nextConfig,
  ...nextTypescriptConfig,
];

export default eslintConfig;
