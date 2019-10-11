<template>
  <div>
    <!-- <Pins with Popup> -->
    <v-symbol-layer
      :visible="visible"
      :layer-id="pinId"
      :source-id="sourceId"
      :filter="['!has', 'point_count']"
      :layout="computedPinLayout"
      :paint="pinPaint"
      popupAnchor="top"
      @click="onEmitClick"
      @clickaway="onEmitClickAway"
      @mouseover="onMouseOver"
      @mouseout="onMouseOut"
      @mousemove="onMouseMove"
    >
      <div v-if="$scopedSlots.popup" v-slot:popup="{ feature }">
        <slot name="popup" :feature="feature" />
      </div>
      <div v-if="$scopedSlots.details" v-slot:details="{ feature }">
        <slot name="details" :feature="feature" />
      </div>
    </v-symbol-layer>
    <!-- <Cluster Circles> -->
    <v-circle-layer
      :visible="visible"
      :layer-id='clusterId'
      :source-id="sourceId"
      :filter="['has', 'point_count']"
      :layout="clusterLayout"
      :paint="computedClusterPaint"
      :listenUserEvents="false"
    />
    <v-symbol-layer
      :visible="visible"
      :layer-id='clusterSymbolId'
      :source-id="sourceId"
      :filter="['has', 'point_count']"
      :layout="computedClusterSymbolLayout"
      :paint="clusterSymbolPaint"
      :listenUserEvents="false"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop, Inject, Mixins, Watch } from 'vue-property-decorator';
import * as mapboxgl from 'mapbox-gl';
import {
  VSymbolLayer,
  VCircleLayer,
  VImageLoader,
} from 'v-mapboxgl';
import { Images } from '@v-mapboxgl/types';

@Component({
  components: {
    VSymbolLayer,
    VCircleLayer,
    VImageLoader,
  },
})
export default class VClusterLayer extends Mixins(VSymbolLayer) {
  @Prop(String)
  protected pinIconImage?: string;
  @Prop(String)
  protected clusterIconImage?: string;
  @Prop({ type: Array, default: () => [0, 5] })
  protected clusterIconOffset!: [number, number];
  @Prop({ type: String, default: 'grey' })
  protected clusterColor!: string;

  @Prop(Object)
  protected pinLayout?: mapboxgl.SymbolLayout;
  @Prop({ type: Object, default: () => ({}) })
  protected pinPaint?: mapboxgl.SymbolPaint;


  @Prop({ type: Object, default: () => ({}) })
  protected clusterLayout?: mapboxgl.CircleLayout;
  @Prop(Object)
  protected clusterPaint?: mapboxgl.CirclePaint;

  @Prop(Object)
  protected clusterSymbolLayout?: mapboxgl.SymbolLayout;
  @Prop({ type: Object, default: () => ({ 'text-color': 'white' })})
  protected clusterSymbolPaint?: mapboxgl.SymbolPaint;


  protected get computedPinLayout(): mapboxgl.SymbolLayout {
    if (!this.pinLayout) {
      return {
        'icon-image': this.pinIconImage || 'marker-15',
        'icon-anchor': 'bottom',
        'icon-allow-overlap': true,
        'icon-ignore-placement': true,
      };
    }
    return this.pinLayout;
  }

  protected get computedClusterPaint(): mapboxgl.CirclePaint {
    if (!this.clusterPaint) {
      return {
        'circle-color': [
          'step',
          ['get', 'point_count'],
          'transparent',
          1,
          this.clusterColor,
        ],
        'circle-radius': [
          'step',
          ['get', 'point_count'],
          25,
          100,
          40,
          750,
          40,
        ],
      };
    }
    return this.clusterPaint;
  }

  private get computedClusterSymbolLayout() {
    if (!this.clusterSymbolLayout) {
      if (!this.clusterIconImage) {
        return {
          'text-field': '{point_count}',
          'text-size': 12,
          'text-anchor': 'center',
          'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
          'text-allow-overlap': true,
          'text-ignore-placement': true,
        };
      }
      return {
        'icon-image': this.clusterIconImage,
        'icon-anchor': 'top',
        'icon-offset': this.clusterIconOffset,
        'icon-allow-overlap': true,
        'icon-ignore-placement': true,
        'text-field': '{point_count}',
        'text-size': 12,
        'text-anchor': 'bottom',
        'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
        'text-allow-overlap': true,
        'text-ignore-placement': true,
      };
    }
    return this.clusterSymbolLayout;
  }

  protected get pinId(): string {
    return `cluster-layer-group/${this.layerId}/pin`;
  }

  protected get clusterId(): string {
    return `cluster-layer-group/${this.layerId}/cluster`;
  }

  protected get clusterSymbolId(): string {
    return `cluster-layer-group/${this.layerId}/cluster-symbol`;
  }

  protected onEmitClick(e: any) {
    this.$emit('click', e);
  }
  protected onEmitClickAway(e: any) {
    this.$emit('clickaway', e);
  }
  protected onMouseOver(e: any) {
    this.$emit('mouseover', e);
  }
  protected onMouseOut(e: any) {
    this.$emit('mouseout', e);
  }
  protected onMouseMove(e: any) {
    this.$emit('mousemove', e);
  }
}
</script>
