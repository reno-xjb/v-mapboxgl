import * as mapboxgl from 'mapbox-gl';
import Vue from 'vue';
import { Component, Mixins, Prop, Watch} from 'vue-property-decorator';
import VControlMixin from '@/controls/mixins/vControl';
import { UnitSystem } from '@v-mapboxgl/types';

@Component({})
export default class VScaleControl extends Mixins(VControlMixin) {
  protected control?: mapboxgl.ScaleControl;

  @Prop({ type: Number, default: 100 })
  private maxWidth!: number;
  @Prop({ type: String, default: 'metric' })
  private unit!: UnitSystem;

  @Watch('maxWidth')
  private changeMaxWidth() {
    this.removeControl();
    this.initControl();
    this.addControl();
  }

  @Watch('unit')
  private changeUnit() {
    if (this.control) {
      this.control.setUnit(this.unit);
    }
  }

  private created() {
    this.initControl();
  }

  private initControl() {
    this.control = new mapboxgl.ScaleControl({
      maxWidth: this.maxWidth,
      unit: this.unit,
    });
  }
}
