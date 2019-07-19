import * as mapboxgl from 'mapbox-gl';
import { Component, Mixins, Prop, Watch} from 'vue-property-decorator';
import { VControlMixin } from 'v-mapboxgl';
import { Corner } from '@v-mapboxgl/types';
import BasicMapboxControl from './mapbox/basicControl';
import { ButtonStyle } from './mapbox/types';


@Component({})
export default class VBasicControl extends Mixins(VControlMixin) {
  protected control?: BasicMapboxControl;

  @Prop(String)
  private controlStyle?: ButtonStyle;
  @Prop(String)
  private controlClass?: string;

  @Watch('controlClass')
  private onClassNameUpdate() {
    if (this.control && this.controlClass) {
      this.control.updateButtonClassName(this.controlClass);
    }
  }

  @Watch('controlStyle')
  private onStyleUpdate() {
    if (this.control && this.controlStyle) {
      this.control.updateButtonStyle(this.controlStyle);
    }
  }

  private created() {
    this.control = new   BasicMapboxControl({
      style: this.controlStyle,
      className: this.controlClass,
      onClick: this.onClick,
    });
  }

  private onClick(event: MouseEvent) {
    this.$emit('click', event);
  }
}
