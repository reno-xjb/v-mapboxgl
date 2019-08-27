import * as mapboxgl from 'mapbox-gl';
import { Component, Mixins } from 'vue-property-decorator';
import VControlMixin from './mixins/vControl';

@Component({})
export default class VFullscreenControl extends Mixins(VControlMixin) {
  protected control?: mapboxgl.FullscreenControl;

  private created() {
    this.initControl();
  }

  private initControl() {
    this.control = new mapboxgl.FullscreenControl();
  }
}
