module.exports = {
  productionSourceMap: false,
  configureWebpack: {
    output: {
      libraryExport: 'default'
    },
    externals: {
      'mapbox-gl': 'mapbox-gl',
      'v-mapboxgl': 'v-mapboxgl',
      'vue': 'vue',
    },
  },
  css: {
    extract: false,
  },
};
