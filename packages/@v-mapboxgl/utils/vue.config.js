module.exports = {
  productionSourceMap: false,
  configureWebpack: {
    output: {
      libraryTarget: 'commonjs2',
    },
    externals: {
      'mapbox-gl': 'mapbox-gl',
      'vue': 'vue',
    },
  },
};
