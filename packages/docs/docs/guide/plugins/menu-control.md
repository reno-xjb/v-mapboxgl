# Menu Control

[![npm](https://img.shields.io/npm/v/@v-mapboxgl/plugin-menu-control.svg)](https://www.npmjs.com/package/@v-mapboxgl/plugin-menu-control)
![npm bundle size](https://img.shields.io/bundlephobia/minzip/@v-mapboxgl/plugin-menu-control)

## Getting Started

::: tip NOTE
This plugin doesn't work without the main library `v-mapboxgl` (see the [Getting Started](/guide/getting-started.md))
:::

```
yarn add @v-mapboxgl/plugin-menu-control
```

Then, in your `main.js`:

```js
import Vue from 'vue';
import VMapboxGL from 'v-mapboxgl';
import VMapboxGLPluginMenuControl from '@v-mapboxgl/plugin-menu-control';

Vue.use(VMapboxGL);
Vue.use(VMapboxGLPluginMenuControl);
```
