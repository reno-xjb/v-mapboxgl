<template>
  <v-map
    :access-token="$mapbox.token"
    map-style="mapbox://styles/mapbox/light-v9"
    :center="[-119.8138027, 39.5296329]"
    :zoom="12"
  >
    <v-navigation-control :show-compass="false" />
    <v-fullscreen-control />
    <v-geolocate-control
      :position-options="{
        enableHighAccuracy: true,
        timeout: 6000,
      }"
      :track-user-location="true"
    />
    <v-attribution-control
      :compact="true"
      customAttribution="reno-xjb"
      position="bottom-right"
    />
    <v-scale-control position="bottom-left"/>
  </v-map>
</template>
