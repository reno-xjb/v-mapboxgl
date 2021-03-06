import Vue from 'vue';
import { Component, Prop, Mixins } from 'vue-property-decorator';
import * as mapboxgl from 'mapbox-gl';
import { LayerType } from '@v-mapboxgl/types';
import VLayerMixin from './mixins/vLayer';

@Component({})
export default class VBackgroundLayer extends Mixins(VLayerMixin) {
  protected type: LayerType = 'background';

  @Prop({ type: Object, default: () => ({}) })
  protected layout!: mapboxgl.BackgroundLayout;
  @Prop({ type: Object, default: () => ({}) })
  protected paint!: mapboxgl.BackgroundPaint;
}
