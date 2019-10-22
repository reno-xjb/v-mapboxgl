const path = require('path');

module.exports = {
  base: '/v-mapboxgl/',
  title: 'VMapboxGL',
  description: 'A vue.js wrapper for MapboxGL',
  evergreen: true,
  themeConfig: {
    sidebarDepth: 2,
    lastUpdated: true,
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/guide/' },
      { text: 'Examples', link: '/examples/' },
    ],
    sidebar: {
      '/guide/': [
        {
          title: 'Guide',
          collapsable: false,
          sidebarDepth: 1,
          children:[
            '',
          ],
        },
        {
          title: 'Components',
          collapsable: false,
          sidebarDepth: 1,
          children:[
            'components/map',
            'components/controls',
            'components/sources',
            'components/layers',
            'components/markers',
            'components/wrappers',
          ],
        },
        {
          title: 'Plugins',   // required
          // path: '/plugins/',      // optional, which should be a absolute path.
          collapsable: false, // optional, defaults to true
          sidebarDepth: 1,    // optional, defaults to 1
          children: [
            'plugins/draw',
            'plugins/basic-control',
            'plugins/menu-control',
            'plugins/arrow-line-layer',
            'plugins/cluster-layer',
          ],
        },
      ],
      '/examples/': [
        {
          title: 'Examples',   // required
          // path: '/plugins/',      // optional, which should be a absolute path.
          collapsable: false, // optional, defaults to true
          sidebarDepth: 1,    // optional, defaults to 1
          children: [
            'controls',
            'geojson',
          ],
        },
        {
          title: 'Plugins',   // required
          // path: '/plugins/',      // optional, which should be a absolute path.
          collapsable: false, // optional, defaults to true
          sidebarDepth: 1,    // optional, defaults to 1
          children: [
            'plugins/draw',
            'plugins/basic-control',
            'plugins/menu-control',
            'plugins/cluster-layer',
          ],
        },
      ],
    },
    repo: 'reno-xjb/v-mapboxgl',
    repoLabel: 'Contribute',
    docsDir: 'docs',
    editLinks: true,
    editLinkText: 'Help us improve this page!',
  },
}
