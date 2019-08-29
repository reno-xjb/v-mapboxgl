const path = require('path');

module.exports = {
    plugins: {
        postcss: {
          inject: false,
        },
        typescript2: {
            tsconfigOverride: {
                include: ['src'],
            },
        },
        commonjs: true,
        vue: true,
        img: true,
        alias: {
            '@': path.join(__dirname, 'src'),
            resolve: ['', '.js', '.js', '.ts', '.tsx', '.vue'],
        }
    },
    input: 'src/index.ts',
    output: {
        format: ['cjs', 'esm'],
        moduleName: 'VMapboxGL',
    },
    target: 'browser',
    banner: true,
};
