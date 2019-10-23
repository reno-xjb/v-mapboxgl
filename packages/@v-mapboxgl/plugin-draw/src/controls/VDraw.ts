
import * as mapboxgl from 'mapbox-gl';
import MapboxDraw, * as mapboxgldraw from '@mapbox/mapbox-gl-draw';
import { Component, Mixins, Prop, Watch, Inject } from 'vue-property-decorator';
import { VControlMixin } from 'v-mapboxgl';

const drawEvents: { [eventName: string]: string } = {
  'draw.create': 'draw:create',
  'draw.delete': 'draw:delete',
  'draw.combine': 'draw:combine',
  'draw.uncombine': 'draw:uncombine',
  'draw.update': 'draw:update',
  'draw.selectionchange': 'draw:selectionchange',
  'draw.modechange': 'draw:modechange',
  'draw.render': 'draw:render',
  'draw.actionable': 'draw:actionable',
};

@Component({})
export default class VDraw extends Mixins(VControlMixin) {
  protected control?: MapboxDraw;

  @Inject({ from: 'getMap', default: undefined })
  protected getMap!: any;

  @Prop({ type: Boolean, default: true })
  private keybindings!: boolean;
  @Prop({ type: Boolean, default: true })
  private touchEnabled!: boolean;
  @Prop({ type: Boolean, default: true })
  private boxSelect!: boolean;
  @Prop({ type: Number, default: 2 })
  private clickBuffer!: number;
  @Prop({ type: Number, default: 25 })
  private touchBuffer!: number;
  @Prop({ type: Object })
  private controls?: mapboxgldraw.MapboxDrawControls;
  @Prop({ type: Boolean, default: true })
  private displayControlsDefault!: boolean;
  @Prop({ type: Array })
  private styles?: any[];
  @Prop({ type: Object })
  private modes?: mapboxgldraw.MapboxDrawModes;
  @Prop({ type: String, default: 'simple_select' })
  private defaultMode!: string;
  @Prop({ type: Boolean, default: false })
  private userProperties!: boolean;

  private created() {
    this.initControl();
    this.assignEvents();
  }

  private assignEvents() {
    if (!this.control || !this.getMap) {
      return;
    }
    const map = this.getMap();
    if (!map) {
      return;
    }
    for (const eventName of Object.keys(drawEvents)) {
      map.on(eventName, (e: any) => this.$emit(drawEvents[eventName], { ...e, draw: this.control, map }));
    }
  }

  private removeEvents() {
    if (!this.control || !this.getMap) {
      return;
    }
    const map = this.getMap();
    if (!map) {
      return;
    }
    for (const eventName of Object.keys(drawEvents)) {
      map.off(eventName, (e: any) => this.$emit(drawEvents[eventName], { ...e, draw: this.control, map }));
    }
  }

  private initControl() {
    const options: mapboxgldraw.MapboxDrawOptions = {
      keybindings: this.keybindings,
      touchEnabled: this.touchEnabled,
      boxSelect: this.boxSelect,
      clickBuffer: this.clickBuffer,
      touchBuffer: this.touchBuffer,
      displayControlsDefault: this.displayControlsDefault,
      defaultMode: this.defaultMode,
      userProperties: this.userProperties,
    };
    if (this.controls) {
      options.controls = this.controls;
    }
    if (this.styles) {
      options.styles = this.styles;
    }
    if (this.modes) {
      options.modes = {
        ...mapboxgldraw.modes,
        ...this.modes,
      };
    }
    this.control = new MapboxDraw(options);
  }

  private reinitControl() {
    this.removeEvents();
    this.removeControl();
    this.initControl();
    this.assignEvents();
    this.addControl();
  }
}
