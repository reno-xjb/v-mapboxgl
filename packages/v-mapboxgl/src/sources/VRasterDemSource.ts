import Vue from 'vue';
import { Component, Mixins, Prop, Watch } from 'vue-property-decorator';
import * as mapboxgl from 'mapbox-gl';
import {
  SourceType,
  Encoding,
} from '@v-mapboxgl/types';
import { validators } from '@v-mapboxgl/utils';
import VSourceMixin from '@/sources/mixins/vSource';

@Component({})
export default class VRasterDemSource extends Mixins(VSourceMixin) {
  protected type: SourceType = 'raster-dem';

  @Prop(String)
  protected url?: string;
  @Prop(Array)
  protected tiles?: string[];
  @Prop(Array)
  protected bounds?: number[];
  @Prop({ type: Number, validator: validators.zoomValidator })
  protected minZoom?: number;
  @Prop({ type: Number, validator: validators.zoomValidator })
  protected maxZoom?: number;
  @Prop(Number)
  protected tileSize?: number;
  @Prop(String)
  protected attribution?: boolean;
  @Prop({ type: String, validator: validators.encodingValidator })
  protected encoding?: Encoding;

  protected get sourceOptions() {
    return {
      url: this.url,
      tiles: this.tiles,
      bounds: this.bounds,
      minZoom: this.minZoom,
      maxZoom: this.maxZoom,
      tileSize: this.tileSize,
      attribution: this.attribution,
      encoding: this.encoding,
    };
  }

  @Watch('sourceOptions', { immediate: true, deep: true })
  protected onSourceOptionsUpdate() {
    this.updateSource(this.sourceOptions);
  }
}
