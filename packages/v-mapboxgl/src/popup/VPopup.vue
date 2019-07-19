<template>
  <div style="display: none">
    <slot/>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import { Component, Prop, Inject, Watch } from 'vue-property-decorator';
import * as mapboxgl from 'mapbox-gl';
import { Position } from '@v-mapboxgl/types';

@Component({})
export default class VPopup extends Vue {
  private popup: mapboxgl.Popup | null = null;

  @Inject({ from: 'getMap', default: null })
  private getMap!: any | null;
  @Inject({ from: 'getMarker', default: null })
  private getMarker!: any | null;

  @Prop({ default: null })
  private coordinates!: mapboxgl.LngLat | null;
  @Prop({ type: Boolean, default: true })
  private closeButton!: boolean;
  @Prop({ type: Boolean, default: true })
  private closeOnClick!: boolean;
  @Prop({ type: String, default: 'bottom' })
  private anchor!: Position;
  @Prop({ type: [Number, Object, Array], default: () => [0, 0] })
  private offset?: number | mapboxgl.PointLike | { [key: string]: mapboxgl.PointLike; };


  @Watch('coordinates')
  private updateCoordinates() {
    if (this.popup && this.coordinates) {
      this.popup.setLngLat(this.coordinates);
    }
  }

  private mounted() {
    if (!this.getMap || !this.$slots.default || !this.$slots.default[0].elm) {
      return;
    }
    const map = this.getMap();
    this.popup = new mapboxgl.Popup({
      closeButton: this.closeButton,
      closeOnClick: this.closeOnClick,
      anchor: this.anchor,
      offset: this.offset,
    });
    this.popup.on('open', (event: any) => this.$emit('open', event));
    this.popup.on('close', (event: any) => this.$emit('close', event));
    if (this.coordinates) {
      this.popup.setLngLat(this.coordinates);
    }
    this.popup.setDOMContent(this.$slots.default[0].elm as HTMLElement);
    this.popup.addTo(map);
    if (this.getMarker) {
      const marker = this.getMarker();
      if (marker && this.popup) {
        marker.setPopup(this.popup);
      }
    }
  }

  private beforeDestroy() {
    if (this.popup) {
      this.popup.remove();
      if (this.getMarker) {
        const marker = this.getMarker();
        if (marker) {
          marker.setPopup(undefined);
        }
      }
    }
  }
}
</script>
