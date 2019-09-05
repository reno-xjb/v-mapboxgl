module.exports = {
  productionSourceMap: false,
  configureWebpack: {
    output: {
      libraryExport: 'default'
    },
    externals: {
      'mapbox-gl': 'mapbox-gl',
      vue: 'vue',
    }
  },
  css: {
    extract: false,
  },
};
