<template>
  <v-image-loader :images="images">
    <v-line-layer
      :visible="visible"
      :layer-id="layerId"
      :source-id="sourceId"
      :paint="computedLinePaint"
      :layout="computedLineLayout"
      popupAnchor="top"
      @click="onEmitClick"
      @clickaway="onEmitClickAway"
      @mouseover="onMouseOver"
      @mouseout="onMouseOut"
      @mousemove="onMouseMove"
    >
      <div v-if="$scopedSlots.popup" slot="popup" slot-scope="{ feature }">
        <slot name="popup" :feature="feature" />
      </div>
      <div v-if="$scopedSlots.details" slot="details" slot-scope="{ feature }">
        <slot name="details" :feature="feature" />
      </div>
    </v-line-layer>
    <v-geojson-source
      :source-id="arrowSourceId"
      :data="arrowSource"
    >
      <v-symbol-layer
        v-if="arrowStart || arrowEnd"
        :visible="visible"
        :layer-id='arrowLayerId'
        :source-id="arrowSourceId"
        :layout="{
          'icon-image': 'arrow',
          'icon-size': [
            'interpolate',
            ['linear'],
            ['zoom'],
            6,
            0,
            14,
            iconSize,
          ],
          'icon-allow-overlap': true,
          'icon-ignore-placement': true,
          'icon-rotate': {
            'type': 'identity',
            'property': '_v_mapboxgl_arrow_rotation',
          }
        }"
        :paint="{
          'icon-color': color,
        }"
        :listenUserEvents="false"
      />
    </v-geojson-source>
  </v-image-loader>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Mixins, Prop, Inject } from 'vue-property-decorator';
import * as mapboxgl from 'mapbox-gl';
import { point as turfPoint } from '@turf/helpers';
import turfBearing from '@turf/bearing';
import VLineLayer from '@/layers/VLineLayer';
import VSymbolLayer from '@/layers/VSymbolLayer';
import ArrowHead from '@/assets/arrow_head.png';

@Component({})
export default class VArrowLineLayer extends Mixins(VLineLayer) {
  @Inject({ from: 'getSourceId', default: undefined })
  protected getSourceId!: any;

  @Prop({ type: String, default: '#888' })
  protected color!: string;
  @Prop({ type: Number, default: 2 })
  protected width!: number;
  @Prop({ type: Boolean, default: false })
  protected arrowStart!: boolean;
  @Prop({ type: Boolean, default: false })
  protected arrowEnd!: boolean;

  protected images = {
    arrow: {
      url: ArrowHead,
      options: {
        sdf: true,
      },
    },
  };

  protected get iconSize(): number {
    return 0.15 * this.width;
  }

  protected get computedLinePaint(): mapboxgl.LinePaint {
    if (!Object.keys(this.paint).length) {
      return {
        'line-color': this.color,
        'line-width': this.width,
      };
    }
    return this.paint;
  }

  protected get computedLineLayout(): mapboxgl.LineLayout {
    if (!Object.keys(this.layout).length) {
      return {
        'line-join': 'round',
      };
    }
    return this.layout;
  }

  protected get arrowSourceId(): string {
    if (this.sourceId) {
      return `${this.sourceId}/arrow-source`;
    }
    if (this.getSourceId) {
      return `${this.getSourceId()}/arrow-source`;
    }
    throw Error(`No source id was given, and no parent source seems to exist (layer: ${this.layerId})`);
  }

  protected get arrowLayerId(): string {
    return `${this.layerId}/arrow-line-layer`;
  }

  protected get source(): GeoJSON.Feature<GeoJSON.LineString> | null {
    if (!this.getMap) {
      return null;
    }
    const map = this.getMap();
    const source = map.getSource(this.trueSourceId);
    if (source.type !== 'geojson') {
      return null;
    }
    const data = source._data;
    if (data.type === 'FeatureCollection') {
      if (data.features.length === 0) {
        return null;
      }
      const features = data.features.filter((feature: GeoJSON.Feature) => feature.geometry.type === 'LineString');
      return features[0] as GeoJSON.Feature<GeoJSON.LineString>;
    }
    if (data.type === 'Feature') {
      return data as GeoJSON.Feature<GeoJSON.LineString>;
    }
    return null;
  }

  protected get arrowSource(): GeoJSON.FeatureCollection<GeoJSON.Point> {
    const features = [];
    if (this.source && typeof this.source !== 'string') {
      if (this.arrowStart) {
        const startSource = this.arrowStartFeature(this.source);
        if (startSource) {
          features.push(startSource);
        }
      }
      if (this.arrowEnd) {
        const endSource = this.arrowEndFeature(this.source);
        if (endSource) {
          features.push(endSource);
        }
      }
    }
    return { type: 'FeatureCollection', features };
  }

  protected arrowStartFeature(feature: GeoJSON.Feature<GeoJSON.LineString>): GeoJSON.Feature<GeoJSON.Point> | null {
    if (feature.geometry.coordinates.length < 2) {
      return null;
    }
    const startCoord = feature.geometry.coordinates[0];
    const firstPoints = feature.geometry.coordinates.slice(0, 2).map((coord: any) => turfPoint(coord));
    const properties = Object.assign(
      { _v_mapboxgl_arrow_rotation: turfBearing(firstPoints[1], firstPoints[0]) },
      feature.properties,
    );
    return turfPoint(startCoord, properties);
  }

  protected arrowEndFeature(feature: GeoJSON.Feature<GeoJSON.LineString>): GeoJSON.Feature<GeoJSON.Point> | null {
    if (feature.geometry.coordinates.length < 2) {
      return null;
    }
    const endCoord = feature.geometry.coordinates.slice(-1)[0];
    const lastPoints = feature.geometry.coordinates.slice(-2).map((coord: any) => turfPoint(coord));
    const properties = Object.assign(
      { _v_mapboxgl_arrow_rotation: turfBearing(lastPoints[0], lastPoints[1]) },
      feature.properties,
    );
    return turfPoint(endCoord, properties);
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
