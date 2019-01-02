import Vue from 'vue';
import { Component, Mixins, Prop, Watch } from 'vue-property-decorator';
import * as mapboxgl from 'mapbox-gl';
import {
  SourceType,
  Scheme,
} from '@/types';
import {
  zoomValidator,
  schemeValidator,
} from '@/validators';
import VSourceMixin from '@/sources/mixins/vSource';

@Component({})
export default class VRasterSource extends Mixins(VSourceMixin) {
  protected type: SourceType = 'raster';

  @Prop(String)
  protected url?: string;
  @Prop(Array)
  protected tiles?: string[];
  @Prop(Array)
  protected bounds?: number[];
  @Prop({ type: Number, validator: zoomValidator })
  protected minZoom?: number;
  @Prop({ type: Number, validator: zoomValidator })
  protected maxZoom?: number;
  @Prop(Number)
  protected tileSize?: number;
  @Prop({ type: String, validator: schemeValidator })
  protected scheme?: Scheme;
  @Prop(String)
  protected attribution?: boolean;

  protected get sourceOptions() {
    return {
      url: this.url,
      tiles: this.tiles,
      bounds: this.bounds,
      minZoom: this.minZoom,
      maxZoom: this.maxZoom,
      tileSize: this.tileSize,
      scheme: this.scheme,
      attribution: this.attribution,
    };
  }

  @Watch('sourceOptions', { immediate: true, deep: true })
  protected onSourceOptionsUpdate() {
    this.updateSource(this.sourceOptions);
  }
}
