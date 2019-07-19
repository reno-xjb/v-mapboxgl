import Vue from 'vue';
import { Component, Prop, Mixins } from 'vue-property-decorator';
import * as mapboxgl from 'mapbox-gl';
import { LayerType } from '@v-mapboxgl/types';
import VPopupLayerMixin from '@/layers/mixins/vPopupLayer';

@Component({})
export default class VFillLayer extends Mixins(VPopupLayerMixin) {
  protected type: LayerType = 'fill';

  @Prop({ type: Object, default: () => ({}) })
  protected layout!: mapboxgl.FillLayout;
  @Prop({ type: Object, default: () => ({}) })
  protected paint!: mapboxgl.FillPaint;
}
