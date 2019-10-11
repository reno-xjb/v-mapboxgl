import Vue from 'vue';
import { Component, Prop, Mixins } from 'vue-property-decorator';
import * as mapboxgl from 'mapbox-gl';
import { LayerType } from '@v-mapboxgl/types';
import VPopupLayerMixin from './mixins/vPopupLayer';

@Component({})
export default class VLineLayer extends Mixins(VPopupLayerMixin) {
  protected type: LayerType = 'line';

  @Prop({ type: Object, default: () => ({}) })
  protected layout!: mapboxgl.LineLayout;
  @Prop({ type: Object, default: () => ({}) })
  protected paint!: mapboxgl.LinePaint;
}
