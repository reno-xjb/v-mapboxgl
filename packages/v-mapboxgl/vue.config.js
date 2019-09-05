module.exports = {
  productionSourceMap: false,
  configureWebpack: {
    externals: {
      'mapbox-gl': 'mapbox-gl',
      vue: 'vue',
    }
  },
  css: {
    extract: false,
  },
};
