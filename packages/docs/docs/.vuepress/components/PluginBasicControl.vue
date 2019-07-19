<template>
  <v-map
    :access-token="$mapbox.token"
    map-style="mapbox://styles/mapbox/light-v9"
    :center="[-119.8138027, 39.5296329]"
    :zoom="12"
  >
    <v-basic-control
      :control-class="className"
      @click="updateClassName"
    />
  </v-map>
</template>

<style>
.basic-control-icon {
  background-image: url('~material-design-icons/action/1x_web/ic_done_black_36dp.png');
  background-size: 30px;
}
.basic-control-icon.toggled {
  background-image: url('~material-design-icons/action/1x_web/ic_done_all_black_36dp.png');
}
</style>

<script>
export default {
  data() {
    return {
      toggled: false,
    };
  },
  computed: {
    className() {
      return this.toggled ? 'basic-control-icon toggled' : 'basic-control-icon';
    },
  },
  methods: {
    updateBackground(background) {
      this.background = background;
    },
    updateClassName() {
      this.toggled = !this.toggled;
      console.log('toggled', this.toggled)
    },
  },
};
</script>
