# Overview

[![build status](https://travis-ci.org/reno-xjb/v-mapboxgl.svg?branch=master)](https://travis-ci.org/reno-xjb/v-mapboxgl)
[![npm](https://img.shields.io/npm/v/v-mapboxgl.svg)](https://www.npmjs.com/package/v-mapboxgl)
![npm bundle size](https://img.shields.io/bundlephobia/minzip/v-mapboxgl)
![npm peer dependency version](https://img.shields.io/npm/dependency-version/v-mapboxgl/peer/mapbox-gl)
![GitHub](https://img.shields.io/github/license/reno-xjb/v-mapboxgl)

`v-mapboxgl` is a [Vue.js](https://vuejs.org/) wrapper around [mapbox-gl-js](https://www.mapbox.com/mapbox-gl-js/api/).

It consists of the implementation of lots of mapbox-gl objects into Vue.js components, as well as useful helpers around those components (popups, layer isolation, images, ...).

The described parameters in mapbox-gl documentation are available as properties on these components, unless indicated otherwise.

* [Map](/guide/map.md)
* [Controls](/guide/controls.md)
* [Sources](/guide/sources.md)
* [Layers](/guide/layers.md)
* [Markers](/guide/markers.md)
* [Useful wrappers](/guide/wrappers.md)


Some plugins were also designed for specific use cases. They are entirely optional and less maintained.

* [Basic Control](/guide/plugins/basic-control.md)
* [Menu Control](/guide/plugins/menu-control.md)
* [Arrow Line Layer](/guide/plugins/arrow-line-layer.md)
* [Cluster Layer](/guide/plugins/cluster-layer.md)
