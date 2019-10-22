<template>
  <div :id="container" :ref="container" class="v-mapboxgl-container" style="background-color: hsl(55, 11%, 96%)">
    <slot v-if="loaded"/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import mapbox, * as mapboxgl from 'mapbox-gl';
import { Component, Prop, Watch, Provide } from 'vue-property-decorator';
import { Corner, Viewport } from '@v-mapboxgl/types';
import { validators } from '@v-mapboxgl/utils';

const mapEvents = [
  'resize',
  'remove',
  'mousedown',
  'mouseup',
  'mouseover',
  'mousemove',
  'click',
  'dblclick',
  'mouseenter',
  'mouseleave',
  'mouseout',
  'contextmenu',
  'wheel',
  'touchstart',
  'touchend',
  'touchmove',
  'touchcancel',
  'movestart',
  'move',
  'moveend',
  'dragstart',
  'drag',
  'dragend',
  'zoomstart',
  'zoom',
  'zoomend',
  'rotatestart',
  'rotate',
  'rotateend',
  'pitchstart',
  'pitch',
  'pitchend',
  'boxzoomstart',
  'boxzoomend',
  'boxzoomcancel',
  'webglcontextlost',
  'webglcontextrestored',
  'load',
  'render',
  'error',
  'data',
  'styledata',
  'sourcedata',
  'dataloading',
  'styledataloading',
  'sourcedataloading',
];

@Component({})
export default class VMap extends Vue {
  private loaded: boolean = false;
  private map?: mapboxgl.Map;

  @Prop({ type: [String, Object], default: 'container' })
  private container!: string | HTMLElement;
  @Prop({ type: String, required: true })
  private accessToken!: string;
  @Prop({ type: Number, validator: validators.zoomValidator })
  private minZoom?: number;
  @Prop({ type: Number, validator: validators.zoomValidator })
  private maxZoom?: number;
  @Prop({ type: [String, Object] })
  private mapStyle?: string | mapboxgl.Style;
  // TODO hash
  // TODO interactive
  // TODO bearingSnap
  // TODO pitchWithRotate
  // TODO clickTolerance
  @Prop(Boolean)
  private attributionControl?: boolean;
  @Prop([String, Array])
  private customAttribution?: string | string[];
  @Prop(String)
  private logoPosition?: Corner;
  // TODO failIfMajorPerformanceCaveat
  // TODO preserveDrawingBuffer
  // refreshExpiredTiles
  // TODO maxBounds
  // TODO scrollZoom
  // TODO boxZoom
  // TODO dragRotate
  // TODO dragPan
  // TODO keyboard
  // TODO doubleClickZoom
  // TODO touchZoomRotate
  // TODO trackResize
  @Prop([Object, Array])
  private center?: mapboxgl.LngLatLike;
  @Prop({ type: Number, validator: validators.zoomValidator })
  private zoom?: number;
  // TODO bearing
  // TODO pitch
  // TODO renderWorldCopies
  // TODO maxTileCacheSize
  // TODO localIdeographFontFamily
  // TODO transformRequest
  // TODO collectResourceTiming
  // TODO fadeDuration
  // TODO crossSourceCollisions


  @Provide('getMap')
  public getMap(): mapboxgl.Map | null {
    if (!this.loaded) {
      return null;
    }
    return this.map || null;
  }

  @Watch('mapStyle')
  private updateMapStyle(style: string | mapboxgl.Style) {
    if (this.map) {
      this.map.setStyle(style);
    }
  }

  @Watch('center')
  private updateCenter(center: mapboxgl.LngLatLike) {
    if (this.map) {
      this.map.easeTo({ center, zoom: this.zoom });
    }
  }

  @Watch('zoom')
  private updateZoom(zoom: number) {
    if (this.map) {
      this.map.easeTo({ center: this.center, zoom });
    }
  }

  @Watch('customAttribution')
  private onCustomAttributionUpdate() {
    this.$emit('reload');
    this.removeMap();
    this.mountMap();
  }

  private removeMap() {
    this.loaded = false;
    if (this.map) {
      this.map.remove();
    }
  }

  private mountMap() {
    mapbox.accessToken = this.accessToken;
    const map = new mapbox.Map({
      container: this.container,
      minZoom: this.minZoom,
      maxZoom: this.maxZoom,
      style: this.mapStyle,
      // hash
      // interactive
      // bearingSnap
      // pitchWithRotate
      // clickTolerance
      attributionControl: this.attributionControl,
      customAttribution: this.customAttribution,
      logoPosition: this.logoPosition,
      // failIfMajorPerformanceCaveat
      // preserveDrawingBuffer
      // refreshExpiredTiles
      // maxBounds
      // scrollZoom
      // boxZoom
      // dragRotate
      // dragPan
      // keyboard
      // doubleClickZoom
      // touchZoomRotate
      // trackResize
      center: this.center,
      zoom: this.zoom,
      // bearing
      // pitch
      // renderWorldCopies
      // maxTileCacheSize
      // localIdeographFontFamily
      // transformRequest
      // collectResourceTiming
      // fadeDuration
      // crossSourceCollisions
    });

    // SPECIFIC EVENT ACTIONS
    map.once('styledata', () => map.resize());
    map.on('load', () => this.loadMap(map));
    map.on('wheel', (e: any) => this.onWheel(e, map));
    map.on('mouseup', (e: any) => this.onMouseUp(e, map));

    // PASS MAPBOX EVENTS
    for (const eventName of mapEvents) {
      map.on(eventName, (e: any) => this.$emit(eventName, { ...e, map }));
    }
  }

  private beforeDestroy() {
    this.removeMap();
  }

  private mounted() {
    this.mountMap();
  }

  private loadMap(map: mapboxgl.Map) {
    this.map = map;
    this.loaded = true;
  }

  private onWheel(e: any, map: mapboxgl.Map) {
    const viewport = this.getViewport(map);
    this.$emit('viewport', viewport);
  }

  private onMouseUp(e: any, map: mapboxgl.Map) {
    const viewport = this.getViewport(map);
    this.$emit('viewport', viewport);
  }

  private getViewport(map: mapboxgl.Map): Viewport {
    const center = map.getCenter();
    const zoom = map.getZoom();
    const bounds = map.getBounds();
    return { center, zoom, bounds };
  }

}
</script>

<style>
.v-mapboxgl-container {
  position: relative;
  width: 100%;
  height: 100%;
}
canvas.mapboxgl-canvas {
  left: 0;
  width: 100%;
}
</style>
