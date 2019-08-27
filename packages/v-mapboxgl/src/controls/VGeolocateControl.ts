import * as mapboxgl from 'mapbox-gl';
import { Component, Mixins, Prop, Watch, Emit } from 'vue-property-decorator';
import VControlMixin from './mixins/vControl';

@Component({})
export default class VGeolocateControl extends Mixins(VControlMixin) {
  protected control?: mapboxgl.GeolocateControl;

  @Prop({ type: Object, default: () => ({
    enableHighAccuracy: false,
    timeout: 6000,
  }) })
  private positionOptions!: PositionOptions;
  @Prop({ type: Object, default: () => ({ maxZoom: 15 }) })
  private fitBoundOptions!: any;
  @Prop({ type: Boolean, default: false })
  private trackUserLocation!: boolean;
  @Prop({ type: Boolean, default: true })
  private showUserLocation!: boolean;

  @Emit('trackuserlocationstart')
  private emitTrackStart() { return; }
  @Emit('trackuserlocationend')
  private emitTrackEnd() { return; }
  @Emit('error')
  private emitError(data: PositionError) { return data; }
  @Emit('geolocate')
  private emitPosition(data: Position) { return data; }

  private created() {
    this.initControl();
  }

  private initControl() {
    this.control = new mapboxgl.GeolocateControl({
      positionOptions: this.positionOptions,
      fitBoundsOptions: this.fitBoundOptions,
      trackUserLocation: this.trackUserLocation,
      showUserLocation: this.showUserLocation,
    });
    if (this.control) {
      this.control.on('trackuserlocationstart', this.emitTrackStart);
      this.control.on('trackuserlocationend', this.emitTrackEnd);
      this.control.on('error', this.emitError);
      this.control.on('geolocate', this.emitPosition);
    }
  }
}
