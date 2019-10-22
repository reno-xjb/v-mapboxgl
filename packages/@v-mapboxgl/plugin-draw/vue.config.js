module.exports = {
  productionSourceMap: false,
  configureWebpack: {
    externals: {
      'mapbox-gl': 'mapbox-gl',
      '@mapbox/mapbox-gl-draw': '@mapbox/mapbox-gl-draw',
      'v-mapboxgl': 'v-mapboxgl',
      'vue': 'vue',
    },
  },
  css: {
    extract: false,
  },
};
