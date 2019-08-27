import Vue from 'vue';
import { Component, Prop, Mixins } from 'vue-property-decorator';
import * as mapboxgl from 'mapbox-gl';
import { LayerType } from '@v-mapboxgl/types';
import VSourceLayerMixin from './mixins/vSourceLayer';

@Component({})
export default class VHillshadeLayer extends Mixins(VSourceLayerMixin) {
  protected type: LayerType = 'hillshade';

  @Prop({ type: Object, default: () => ({}) })
  protected layout!: mapboxgl.HillshadeLayout;
  @Prop({ type: Object, default: () => ({}) })
  protected paint!: mapboxgl.HillshadePaint;
}
