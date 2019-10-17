<template>
  <div>
    <div style="display: none">
      <div ref="marker" @click="click" @mouseover="openPopup" @mouseout="closePopup">
        <!-- slot for custom marker -->
        <slot v-if="marker" name="marker">
          <div class="marker" />
        </slot>
      </div>
    </div>
    <VPopup
      v-if="marker && $slots.popup"
      :closeButton="false"
      :closeOnClick="popupCloseOnMapClick"
      anchor="bottom"
      :offset="popupOffset"
      @open.once="initPopup"
      @open="popupOpened = true"
      @close="popupOpened = false"
    >
      <slot name="popup" />
    </VPopup>
    <portal to="v_mapboxgl_details_portal" v-if="marker && $slots.details && clicked">
      <div style="height: 100%">
        <slot name="details" />
      </div>
    </portal>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Watch, Prop, Inject, Provide, Emit } from 'vue-property-decorator';
import * as mapboxgl from 'mapbox-gl';
import { noop } from '@v-mapboxgl/utils';
import VPopup from '../popup/VPopup.vue';
import { Position } from '@v-mapboxgl/types';

@Component({
  components: {
    VPopup,
  },
})
export default class VMarker extends Vue {
  private popupOpened = false;
  private popupHovered = false;
  private marker: mapboxgl.Marker | null = null;
  private clicked: boolean = false;

  @Inject({ from: 'getMap', default: undefined })
  private getMap?: any;

  @Prop({ type: [Object, Array], required: true })
  private coordinates!: mapboxgl.LngLatLike;
  @Prop({ type: String, default: 'center' })
  private anchor!: Position;
  @Prop({ type: [Object, Array], default: () => [0, -15] })
  private offset!: mapboxgl.PointLike;
  @Prop({ type: String, default: '#3FB1CE' })
  private color!: string;
  @Prop({ type: Boolean, default: false })
  private draggable!: boolean;
  @Prop({ type: [Number, Object, Array], default: 30 })
  private popupOffset!: number | mapboxgl.PointLike | { [key: string]: mapboxgl.PointLike; };
  @Prop({ type: Boolean, default: false })
  private popupOnHover!: boolean;
  @Prop({ type: Boolean, default: false })
  private popupInitiallyOpened!: boolean;
  @Prop({ type: Boolean, default: true })
  private popupCloseOnMapClick!: boolean;

  @Emit('dragstart')
  private dragstart(coordinates: mapboxgl.LngLatLike) {
    return coordinates;
  }
  @Emit('drag')
  private drag(coordinates: mapboxgl.LngLatLike) {
    return coordinates;
  }
  @Emit('dragend')
  private dragend(coordinates: mapboxgl.LngLatLike) {
    return coordinates;
  }

  @Provide('getMarker')
  private getMarker(): mapboxgl.Marker | null {
    if (!this.marker) {
      return null;
    }
    return this.marker;
  }

  @Watch('coordinates')
  private onCoordinatesUpdate() {
    if (this.marker) {
      this.marker.setLngLat(this.coordinates);
    }
  }

  @Watch('offset')
  private onOffsetUpdate() {
    if (this.marker) {
      this.marker.setOffset(this.offset);
    }
  }

  private convertLngLat(lnglat: mapboxgl.LngLat): mapboxgl.LngLatLike {
    if (this.coordinates instanceof Array) {
      // convert into array to fit input coordinates type
      return lnglat.toArray() as [number, number];
    }
    return lnglat;
  }

  private mounted() {
    if (!this.getMap) {
      return;
    }
    const map = this.getMap();
    let element;
    if (this.$refs.marker) {
      element = this.$refs.marker as HTMLElement;
    }
    this.marker = new mapboxgl.Marker({
      element,
      anchor: this.anchor,
      offset: this.offset,
      color: this.color,
      draggable: this.draggable,
    });
    this.marker.setLngLat(this.coordinates);

    this.marker.on('dragstart', (event: any) => {
      this.dragstart(this.convertLngLat(event.target.getLngLat()));
    });
    this.marker.on('drag', (event: any) => {
      this.drag(this.convertLngLat(event.target.getLngLat()));
    });
    this.marker.on('dragend', (event: any) => {
      this.dragend(this.convertLngLat(event.target.getLngLat()));
    });

    this.marker.addTo(map);

    map.on('click', this.unclick);
  }

  private beforeDestroy() {
    if (this.marker) {
      this.marker.remove();
    }
    if (!this.getMap) {
      return;
    }
    const map = this.getMap();
    if (!map) {
      return;
    }
    map.off('click', this.unclick);
  }

  private click() {
    this.clicked = !this.clicked;
  }
  private unclick(event: any) {
    if (!this.$refs.marker || !(this.$refs.marker as Element).contains(event.originalEvent.target)) {
      this.clicked = false;
    }
  }

  private initPopup() {
    if (this.marker && !this.popupInitiallyOpened) {
      this.marker.togglePopup();
    }
  }

  private openPopup() {
    if (this.marker && this.popupOnHover) {
      if (!this.popupHovered) {
        this.popupHovered = true;
        if (!this.popupOpened) {
          this.marker.togglePopup();
        }
      }
    }
  }
  private closePopup() {
    if (this.marker && this.popupOnHover) {
      if (this.popupHovered) {
        this.popupHovered = false;
        if (!this.popupOpened) {
          this.marker.togglePopup();
        }
      }
    }
  }
}
</script>

<style>
.marker {
  display: block;
  box-sizing: border-box;
  outline: none;
  border: 0;
  padding: 0;
  cursor: pointer;
  border-radius: 50%;
  width: 16px;
  height: 16px;
  color: black;
}
</style>
