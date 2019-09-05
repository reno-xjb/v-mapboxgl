module.exports = {
  productionSourceMap: false,
  configureWebpack: {
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
