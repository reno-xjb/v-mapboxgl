import * as mapboxgl from 'mapbox-gl';
import { Component, Mixins, Prop, Watch} from 'vue-property-decorator';
import VControlMixin from '@/controls/mixins/vControl';

@Component({})
export default class VNavigationControl extends Mixins(VControlMixin) {
  protected control?: mapboxgl.NavigationControl;

  @Prop({ type: Boolean, default: true })
  private showCompass!: boolean;
  @Prop({ type: Boolean, default: true })
  private showZoom!: boolean;

  private created() {
    this.initControl();
  }

  private initControl() {
    this.control = new mapboxgl.NavigationControl({
      showCompass: this.showCompass,
      showZoom: this.showZoom,
    });
  }
}
