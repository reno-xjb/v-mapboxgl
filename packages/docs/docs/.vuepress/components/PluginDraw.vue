<template>
  <v-map
    :access-token="$mapbox.token"
    map-style="mapbox://styles/mapbox/light-v9"
    :center="[-119.8138027, 39.5296329]"
    :zoom="12"
  >
    <v-draw
      @draw:create="onFeatureCreation"
    />
  </v-map>
</template>

<script>
export default {
  data() {
    return {
    };
  },
  methods: {
    onFeatureCreation({ features }) {
      alert(`Created features: ${JSON.stringify(features)}`);
    },
  },
};
</script>
