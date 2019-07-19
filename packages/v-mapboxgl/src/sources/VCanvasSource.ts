import Vue from 'vue';
import { Component, Mixins, Prop, Watch } from 'vue-property-decorator';
import * as mapboxgl from 'mapbox-gl';
import { SourceType } from '@v-mapboxgl/types';
import { validators } from '@v-mapboxgl/utils';
import VSourceMixin from '@/sources/mixins/vSource';

@Component({})
export default class VCanvasSource extends Mixins(VSourceMixin) {
  protected type: SourceType = 'canvas';
  protected playing = false;

  @Prop({ type: [String, Object], required: true })
  protected canvas!: string | HTMLCanvasElement;
  @Prop({ type: Array, validator: validators.coordinatesValidator, required: true })
  protected coordinates!: number[][];
  @Prop({ type: Boolean, default: false })
  protected animate!: boolean;
  @Prop({ type: Boolean, default: false })
  protected play!: boolean;

  private get sourceOptions() {
    return {
      canvas: this.canvas,
      animate: this.animate,
    };
  }

  @Watch('loaded')
  protected onLoadedUpdate() {
    if (!this.getMap || !this.loaded || !this.play || this.playing) {
      return;
    }
    if (!this.getMap) {
      return;
    }
    const map = this.getMap();
    const source = map.getSource(this.trueSourceId);
    source.play();
    this.playing = true;
  }

  @Watch('play')
  protected onPlayUpdate() {
    if (!this.getMap || !this.loaded) {
      return;
    }
    const map = this.getMap();
    const source = map.getSource(this.trueSourceId);
    if (this.play && !this.playing) {
      source.play();
      this.playing = true;
    }
    if (this.playing && !this.play) {
      source.pause();
      this.playing = false;
    }
  }

  @Watch('sourceOptions', { immediate: true })
  protected onSourceOptionsUpdate() {
    this.updateSource({
      canvas: this.canvas,
      coordinates: this.coordinates,
      animate: this.animate,
    });
  }

  @Watch('coordinates', { deep: true })
  protected onCoordinatesUpdate() {
    this.updateSource({
      canvas: this.canvas,
      coordinates: this.coordinates,
      animate: this.animate,
    }, (source: mapboxgl.CanvasSource) => source.setCoordinates(this.coordinates));
  }
}
