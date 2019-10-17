# Cluster Layer

[![npm](https://img.shields.io/npm/v/@v-mapboxgl/plugin-cluster-layer.svg)](https://www.npmjs.com/package/@v-mapboxgl/plugin-cluster-layer)
![npm bundle size](https://img.shields.io/bundlephobia/minzip/@v-mapboxgl/plugin-cluster-layer)

## Getting Started

::: tip NOTE
This plugin doesn't work without the main library `v-mapboxgl` (see the [Getting Started](/guide/getting-started.md))
:::

```
yarn add @v-mapboxgl/plugin-cluster-layer
```

Then, in your `main.js`:

```js
import Vue from 'vue';
import VMapboxGL from 'v-mapboxgl';
import VMapboxGLPluginClusterLayer from '@v-mapboxgl/plugin-cluster-layer';

Vue.use(VMapboxGL);
Vue.use(VMapboxGLPluginClusterLayer);
```
