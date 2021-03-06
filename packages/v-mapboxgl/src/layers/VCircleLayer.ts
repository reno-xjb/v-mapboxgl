import Vue from 'vue';
import { Component, Prop, Mixins } from 'vue-property-decorator';
import * as mapboxgl from 'mapbox-gl';
import { LayerType } from '@v-mapboxgl/types';
import VPopupLayerMixin from './mixins/vPopupLayer';

@Component({})
export default class VCircleLayer extends Mixins(VPopupLayerMixin) {
  protected type: LayerType = 'circle';

  @Prop({ type: Object, default: () => ({}) })
  protected layout!: mapboxgl.CircleLayout;
  @Prop({ type: Object, default: () => ({}) })
  protected paint!: mapboxgl.CirclePaint;
}
