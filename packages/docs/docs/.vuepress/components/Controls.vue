<template>
  <v-map-provider
    :access-token="$mapbox.token"
    :map-style="mapStyle"
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
    <v-menu-control
      :value="background"
      :items="backgrounds"
      @menu:click="updateBackground"
    />
    <v-attribution-control
    :compact="true"
    customAttribution="reno-xjb"
    position="bottom-right"
    />
    <v-scale-control position="bottom-left"/>
  </v-map-provider>
</template>

<script>
// import Arrow from '@/assets/arrow_head.png';
// import Pin from '@/assets/pin.png';
export default {
  data() {
    return {
      background: 'light',
      backgrounds: {
        light: {
          // icon: Arrow,
          style: 'mapbox://styles/mapbox/light-v9',
        },
        dark: {
          // icon: Pin,
          style: 'mapbox://styles/mapbox/dark-v9',
        },
        satellite: {
          // icon: Pin,
          style: 'mapbox://styles/mapbox/satellite-v9',
        },
      },
    };
  },
  computed: {
    mapStyle() {
      return this.backgrounds[this.background].style;
    },
  },
  methods: {
    updateBackground(background) {
      this.background = background;
    },
  },
};
</script>
