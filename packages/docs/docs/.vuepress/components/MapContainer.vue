<template>
  <div class="v-mapboxgl-docs-container">
    <client-only>
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
    Vue.use(VMapboxGL.default);
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
