import eslintPluginAstro from "eslint-plugin-astro";

export default [
    {
        ignores: [".astro", ".vercel"],
    },
    // add more generic rule sets here, such as:
    ...eslintPluginAstro.configs.all,
];
