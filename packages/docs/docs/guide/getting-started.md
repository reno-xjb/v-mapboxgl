# Getting started

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
