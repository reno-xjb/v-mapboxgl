<template>
  <v-map
    :access-token="$mapbox.token"
    :map-style="mapStyle"
    :center="[-119.8138027, 39.5296329]"
    :zoom="12"
  >
    <v-menu-control
      :value="background"
      :items="backgrounds"
      @menu:click="updateBackground"
    />
  </v-map>
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
