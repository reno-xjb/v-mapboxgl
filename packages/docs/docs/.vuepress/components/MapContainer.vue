<template>
  <div class="v-mapboxgl-docs-container">
    <client-only>
      <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
      <slot v-if="$mapbox.ready"/>
    </client-only>
  </div>
</template>

<script>
import Vue from 'vue';
export default {
  mounted: async function() {
    if (this.$mapbox.ready) {
      return;
    }
    await import('mapbox-gl/dist/mapbox-gl.css');
    await import('@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css');
    const VMapboxGL = await import('v-mapboxgl');
    const VMapboxGLArrowLineLayer = await import('@v-mapboxgl/plugin-arrow-line-layer');
    const VMapboxGLBasicControl = await import('@v-mapboxgl/plugin-basic-control');
    const VMapboxGLClusterLayer = await import('@v-mapboxgl/plugin-cluster-layer');
    const VMapboxGLMenuControl = await import('@v-mapboxgl/plugin-menu-control');
    const VMapboxGLDraw = await import('@v-mapboxgl/plugin-draw');
    Vue.use(VMapboxGL.default);
    Vue.use(VMapboxGLArrowLineLayer.default);
    Vue.use(VMapboxGLBasicControl.default);
    Vue.use(VMapboxGLClusterLayer.default);
    Vue.use(VMapboxGLMenuControl.default);
    Vue.use(VMapboxGLDraw.default);
    this.$set(this.$mapbox, 'ready', true);
    this.$forceUpdate();
  },
}
</script>

<style>
.v-mapboxgl-docs-container {
  height: 500px;
  width: 100%;
}
</style>
