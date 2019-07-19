import Vue from 'vue';
import { Component, Prop, Mixins } from 'vue-property-decorator';
import * as mapboxgl from 'mapbox-gl';
import { LayerType } from '@v-mapboxgl/types';
import VSourceLayerMixin from '@/layers/mixins/vSourceLayer';

@Component({})
export default class VHeatmapLayer extends Mixins(VSourceLayerMixin) {
  protected type: LayerType = 'heatmap';

  @Prop({ type: Object, default: () => ({}) })
  protected layout!: mapboxgl.HeatmapLayout;
  @Prop({ type: Object, default: () => ({}) })
  protected paint!: mapboxgl.HeatmapPaint;
}
