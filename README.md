# v-mapboxgl

Vue.js 2 wrapper around Mapbox GL.

## Status
[![build status](https://travis-ci.org/reno-xjb/v-mapboxgl.svg?branch=master)](https://travis-ci.org/reno-xjb/v-mapboxgl)
[![npm](https://img.shields.io/npm/v/v-mapboxgl.svg)](https://www.npmjs.com/package/v-mapboxgl)
![npm bundle size](https://img.shields.io/bundlephobia/minzip/v-mapboxgl)
![npm peer dependency version](https://img.shields.io/npm/dependency-version/v-mapboxgl/peer/mapbox-gl)
![GitHub](https://img.shields.io/github/license/reno-xjb/v-mapboxgl)

## Getting started

v-mapboxgl requires **Mapbox GL JS 0.54 or later** and **Vue.js 2.6.10 or later**

```
yarn add v-mapboxgl
```

Then, in your `main.js`:

```js
import Vue from 'vue';
import VMapboxGL from 'v-mapboxgl';

Vue.use(VMapboxGL);
```

And in your component:

```html
<template>
  <div id="#map">
    <v-map
      access-token="YOUR_MAPBOX_TOKEN"
      map-style="mapbox://styles/mapbox/light-v9"
      :center="[-119.8138027, 39.5296329]"
      :zoom="12"
    />
  </div>
</template>
<style>
#map {
  width: 100%;
  height: 500px;
}
</style>
```


For further examples and description, see the [documentation](https://reno-xjb.github.io/v-mapboxgl).

## License
MIT
