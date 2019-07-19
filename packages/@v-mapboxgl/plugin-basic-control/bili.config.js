const path = require('path');

module.exports = {
    plugins: {
        typescript2: {
            tsconfigOverride: {
                include: ['src'],
            },
        },
    },
    input: 'src/index.ts',
    output: {
        format: ['cjs', 'esm'],
        extractCSS: false,
    },
    target: 'browser',
    banner: true,
};
