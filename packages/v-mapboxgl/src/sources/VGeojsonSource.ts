import Vue from 'vue';
import { Component, Mixins, Prop, Watch } from 'vue-property-decorator';
import * as mapboxgl from 'mapbox-gl';
import { SourceType } from '@/types';
import {
  zoomValidator,
  bufferValidator,
} from '@/validators';
import VSourceMixin from '@/sources/mixins/vSource';

@Component({})
export default class VGeojsonSource extends Mixins(VSourceMixin) {
  protected type: SourceType = 'geojson';

  @Prop({ type: [Object, String], required: true })
  protected data!: string | GeoJSON.FeatureCollection | GeoJSON.Feature;
  @Prop({ type: Number, validator: zoomValidator })
  protected maxZoom?: number;
  @Prop(String)
  protected attribution?: string;
  @Prop({ type: Number, validator: bufferValidator })
  protected buffer?: number;
  @Prop(Number)
  protected tolerance?: number;
  @Prop({ type: Boolean, default: false })
  protected cluster!: boolean;
  @Prop({ type: Number, validator: zoomValidator })
  protected clusterMaxZoom?: number;
  @Prop(Number)
  protected clusterRadius?: number;
  @Prop(Boolean)
  protected lineMetrics?: boolean;
  @Prop(Boolean)
  protected generateId?: boolean;

  protected get sourceOptions() {
    return {
      maxZoom: this.maxZoom,
      attribution: this.attribution,
      buffer: this.buffer,
      tolerance: this.tolerance,
      cluster: this.cluster,
      clusterRadius: this.clusterRadius,
      clusterMaxZoom: this.clusterMaxZoom,
      lineMetrics: this.lineMetrics,
      generateId: this.generateId,
    };
  }

  @Watch('data', { deep: true })
  protected onDataUpdate() {
    this.updateSource({
      data: this.data,
      ...this.sourceOptions,
    }, (source: mapboxgl.GeoJSONSource) => source.setData(this.data));
  }

  @Watch('sourceOptions', { immediate: true, deep: true })
  protected onSourceOptionsUpdate() {
    this.updateSource({
      data: this.data,
      ...this.sourceOptions,
    });
  }
}
