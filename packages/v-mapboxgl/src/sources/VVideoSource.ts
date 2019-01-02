import Vue from 'vue';
import { Component, Mixins, Prop, Watch } from 'vue-property-decorator';
import * as mapboxgl from 'mapbox-gl';
import { SourceType } from '@/types';
import { coordinatesValidator } from '@/validators';
import VSourceMixin from '@/sources/mixins/vSource';

@Component({})
export default class VVideoource extends Mixins(VSourceMixin) {
  protected type: SourceType = 'video';

  @Prop({ type: Array, required: true })
  protected urls!: string[];
  @Prop({ type: Array, validator: coordinatesValidator, required: true })
  protected coordinates!: number[][];

  @Watch('urls', { immediate: true, deep: true })
  protected onUrlsUpdate() {
    this.updateSource({
      urls: this.urls,
      coordinates: this.coordinates,
    });
  }

  @Watch('coordinates', { deep: true })
  protected onCoordinatesUpdate() {
    this.updateSource({
      urls: this.urls,
      coordinates: this.coordinates,
    }, (source: mapboxgl.VideoSource) => source.setCoordinates(this.coordinates));
  }
}
