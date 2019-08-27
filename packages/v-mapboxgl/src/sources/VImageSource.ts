import Vue from 'vue';
import { Component, Mixins, Prop, Watch } from 'vue-property-decorator';
import * as mapboxgl from 'mapbox-gl';
import { SourceType } from '@v-mapboxgl/types';
import { validators } from '@v-mapboxgl/utils';
import VSourceMixin from './mixins/vSource';

@Component({})
export default class VImageSource extends Mixins(VSourceMixin) {
  protected type: SourceType = 'image';

  @Prop({ type: String, required: true })
  protected url!: string;
  @Prop({ type: Array, validator: validators.coordinatesValidator, required: true })
  protected coordinates!: number[][];

  @Watch('url', { immediate: true })
  protected onUrlUpdate() {
    this.updateSource({
      url: this.url,
      coordinates: this.coordinates,
    },
    // @ts-ignore updateImage is missing in mapbox-gl types
    (source: mapboxgl.ImageSource) => source.updateImage({ url: this.url, coordinates: this.coordinates }));
  }

  @Watch('coordinates', { deep: true })
  protected onCoordinatesUpdate() {
    this.updateSource({
      url: this.url,
      coordinates: this.coordinates,
    }, (source: mapboxgl.ImageSource) => source.setCoordinates(this.coordinates));
  }
}
