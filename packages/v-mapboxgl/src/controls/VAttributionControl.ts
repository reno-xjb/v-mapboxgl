import * as mapboxgl from 'mapbox-gl';
import { Component, Mixins, Prop, Watch} from 'vue-property-decorator';
import VControlMixin from '@/controls/mixins/vControl';

@Component({})
export default class VAttributionControl extends Mixins(VControlMixin) {
  protected control?: mapboxgl.AttributionControl;

  @Prop({ type: Boolean })
  private compact?: boolean;
  @Prop({ type: [String, Array] })
  private customAttribution?: string | string[];

  @Watch('compact')
  private updateCompact() {
    this.reinitControl();
  }

  @Watch('customAttribution')
  private updateAttribution() {
    this.reinitControl();
  }

  private created() {
    this.initControl();
  }

  private initControl() {
    this.control = new mapboxgl.AttributionControl({
      compact: this.compact,
      customAttribution: this.customAttribution,
    });
  }

  private reinitControl() {
    this.removeControl();
    this.initControl();
    this.addControl();
  }
}
