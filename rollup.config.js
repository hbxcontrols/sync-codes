import commonjs from '@rollup/plugin-commonjs';

export default {
    input: 'src/index.js', // Your main ESM entry file
    output: [
        {
            file: 'dist/index.cjs',
            format: 'cjs',
            sourcemap: true,
        },
        {
            file: 'dist/index.mjs',
            format: 'es', // The 'es' format is for ES Modules
            sourcemap: true,
        },
    ],
    plugins: [
        commonjs() // Use the commonjs plugin to handle any CJS dependencies
    ]
};