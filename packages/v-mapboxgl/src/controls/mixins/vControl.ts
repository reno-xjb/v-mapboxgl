import Vue from 'vue';
import { Component, Prop, Watch, Inject} from 'vue-property-decorator';
import * as mapboxgl from 'mapbox-gl';
import { Corner } from '@v-mapboxgl/types';

@Component({})
export default class VControlMixin extends Vue {
  protected control: mapboxgl.Control | mapboxgl.IControl | null = null;

  @Inject({ from: 'getMap', default: undefined })
  protected getMap?: any;

  @Prop({ type: String, default: 'top-right' })
  protected position!: Corner;

  @Watch('position')
  protected changePosition() {
    this.removeControl();
    this.addControl();
  }

  protected mounted() {
    this.addControl();
  }

  protected beforeDestroy() {
    this.removeControl();
  }

  protected addControl() {
    if (this.getMap) {
      const map = this.getMap();
      if (this.control && map) {
        map.addControl(this.control, this.position);
        this.$emit('loaded', this.control);
      }
    }
  }
  protected removeControl() {
    if (this.getMap) {
      const map = this.getMap();
      if (this.control && map) {
        map.removeControl(this.control);
        this.$emit('removed');
      }
    }
  }
  protected render(): JSX.Element | Element | null {
    return null;
  }
}
