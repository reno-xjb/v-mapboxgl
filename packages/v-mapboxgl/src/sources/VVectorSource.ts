import Vue from 'vue';
import { Component, Mixins, Prop, Watch } from 'vue-property-decorator';
import * as mapboxgl from 'mapbox-gl';
import {
  SourceType,
  Scheme,
} from '@v-mapboxgl/types';
import { validators } from '@v-mapboxgl/utils';
import VSourceMixin from './mixins/vSource';

@Component({})
export default class VVectorSource extends Mixins(VSourceMixin) {
  protected type: SourceType = 'vector';

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
  @Prop({ type: String, validator: validators.schemeValidator })
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
      scheme: this.scheme,
      attribution: this.attribution,
    };
  }

  @Watch('sourceOptions', { immediate: true, deep: true })
  protected onSourceOptionsUpdate() {
    this.updateSource(this.sourceOptions);
  }
}
