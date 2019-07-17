<template>
  <v-map
    :access-token="$mapbox.token"
    map-style="mapbox://styles/mapbox/light-v9"
    :center="[-119.8138027, 39.5296329]"
    :zoom="12"
  />
</template>
