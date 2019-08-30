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
    const VMapboxGL = await import('v-mapboxgl');
    // const VMapboxGLBasicControl = await import('@v-mapboxgl/plugin-basic-control');
    // const VMapboxGLMenuControl = await import('@v-mapboxgl/plugin-menu-control');
    Vue.use(VMapboxGL.default);
    // Vue.use(VMapboxGLBasicControl.default);
    // Vue.use(VMapboxGLMenuControl.default);
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
