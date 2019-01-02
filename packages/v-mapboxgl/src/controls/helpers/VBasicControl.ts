import * as mapboxgl from 'mapbox-gl';
import { Component, Mixins, Prop, Watch} from 'vue-property-decorator';
import VControlMixin from '@/controls/mixins/vControl';
import BasicMapboxControl from '@/controls/helpers/mapbox/basicControl';
import { Corner } from '@/types';


@Component({})
export default class VBasicControl extends Mixins(VControlMixin) {
  protected control?: BasicMapboxControl;

  @Prop(String)
  private iconClass?: string;
  @Prop(Function)
  private onClick?: any;

  @Watch('iconClass')
  private changeIcon() {
    if (this.control && this.iconClass) {
      this.control.updateButtonClassName(this.iconClass);
    }
  }

  private created() {
    this.control = new BasicMapboxControl({
      className: this.iconClass,
      onClick: this.onClick,
    });
  }
}
