import Vue from 'vue';
import { Component, Prop, Mixins } from 'vue-property-decorator';
import * as mapboxgl from 'mapbox-gl';
import { LayerType } from '@/types';
import VPopupLayerMixin from '@/layers/mixins/vPopupLayer';

@Component({})
export default class VFillExtrusionLayer extends Mixins(VPopupLayerMixin) {
  protected type: LayerType = 'fill-extrusion';

  @Prop({ type: Object, default: () => ({}) })
  protected layout!: mapboxgl.FillExtrusionLayout;
  @Prop({ type: Object, default: () => ({}) })
  protected paint!: mapboxgl.FillExtrusionPaint;
}
