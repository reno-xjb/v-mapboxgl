const path = require('path');

module.exports = {
  plugins: {
    alias: {
      '@': path.join(__dirname, 'src'),
      resolve: ['', '.js', '.js', '.ts', '.tsx', '.vue'],
    },
    commonjs: true,
    vue: {
      css: false,
      compileTemplate: true,
    },
    typescript2: {
      tsconfigOverride: {
        include: ['src'],
      },
    },
    img: true,
  },
  input: 'src/index.ts',
  output: {
    format: ['cjs', 'esm'],
    name: 'VMapboxGL',
    moduleName: 'VMapboxGL',
    exports: 'named',
    globals: {
      vue: 'Vue',
      'mapbox-gl': 'mapboxgl',
    },
    extractCSS: true,
  },
  target: 'browser',
  banner: true,
  external: ['vue', 'mapbox-gl']
};
