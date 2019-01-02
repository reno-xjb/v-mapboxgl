const path = require('path');

module.exports = {
  base: '/v-mapboxgl/',
  title: 'VMapboxGL',
  description: 'A vue.js wrapper for MapboxGL',
  evergreen: true,
  themeConfig: {
    lastUpdated: true,
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/guide/' },
    ],
    sidebar: {
      '/guide/': [
        '',
        'controls',
        'geojson',
      ],
    },
    repo: 'reno-xjb/v-mapboxgl',
    repoLabel: 'Contribute',
    docsDir: 'docs',
    editLinks: true,
    editLinkText: 'Help us improve this page!',
  },
}
