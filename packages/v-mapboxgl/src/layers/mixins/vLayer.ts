import Vue from 'vue';
import { Component, Inject, Prop, Watch } from 'vue-property-decorator';
import { LayerType } from '@v-mapboxgl/types';
import { validators } from '@v-mapboxgl/utils';

@Component({})
export default class VLayer extends Vue {
  protected type: LayerType = 'background';

  @Inject({ from: 'getMap', default: undefined })
  protected getMap?: any;
  @Inject({ from: 'getPrefix', default: undefined })
  protected getPrefix?: any;
  @Inject({ from: 'getMetadata', default: undefined })
  protected getMetadata?: any;
  @Inject({ from: 'getBefore', default: undefined })
  protected getBefore?: any;

  @Prop({ type: String, required: true })
  protected layerId!: string;
  @Prop({ type: Boolean, default: true })
  protected visible!: boolean;
  @Prop({ type: Object, default: () => ({}) })
  protected metadata!: { [key: string]: any };
  @Prop({ type: Number, validator: validators.zoomValidator })
  protected minZoom?: number;
  @Prop({ type: Number, validator: validators.zoomValidator })
  protected maxZoom?: number;
  @Prop({ type: Object, default: () => ({}) })
  protected layout!: mapboxgl.BackgroundLayout | mapboxgl.FillLayout | mapboxgl.FillExtrusionLayout |
    mapboxgl.LineLayout | mapboxgl.SymbolLayout | mapboxgl.RasterLayout | mapboxgl.CircleLayout |
    mapboxgl.HeatmapLayout | mapboxgl.HillshadeLayout;
  @Prop({ type: Object, default: () => ({}) })
  protected paint!: mapboxgl.BackgroundPaint | mapboxgl.FillPaint | mapboxgl.FillExtrusionPaint |
    mapboxgl.LinePaint | mapboxgl.SymbolPaint | mapboxgl.RasterPaint | mapboxgl.CirclePaint |
    mapboxgl.HeatmapPaint | mapboxgl.HillshadePaint;
  @Prop(String)
  protected before!: string;

  protected get trueLayerId(): string {
    return this.getPrefix ? `${this.getPrefix()}/${this.layerId}` : this.layerId;
  }

  protected get trueMetadata(): any {
    if (this.getMetadata) {
      return {
        _v_mapboxgl_raw_layer_id: this.layerId,
        ...this.getMetadata(),
        ...this.metadata,
      };
    }
    return this.metadata;
  }

  protected get trueBefore(): string | undefined {
    if (this.before) {
      return this.getPrefix ? `${this.getPrefix()}/${this.before}` : this.before;
    }
    return this.getBefore ? this.getBefore() : undefined;
  }

  @Watch('visible', { immediate: true })
  protected onVisibilityUpdate() {
    if (!this.getMap) {
      return;
    }
    const map = this.getMap();
    const visibility = this.visible ? 'visible' : 'none';
    this.layout.visibility = visibility;
    if (map.getLayer(this.trueLayerId)) {
      map.setLayoutProperty(this.trueLayerId, 'visibility', visibility);
    }
  }

  @Watch('paint', { immediate: true, deep: true })
  protected onPaintUdate() {
    if (!this.getMap) {
      return;
    }
    const map = this.getMap();
    const paint: any = this.paint;
    if (map.getLayer(this.trueLayerId)) {
      for (const paintProperty of Object.keys(paint)) {
        map.setPaintProperty(this.trueLayerId, paintProperty, paint[paintProperty]);
      }
    }
  }

  protected mounted() {
    this.updateLayer();
  }

  protected beforeDestroy() {
    this.removeLayer();
  }

  protected updateLayer() {
    if (!this.getMap) {
      return;
    }
    const map = this.getMap();
    const existingLayer = map.getLayer(this.trueLayerId) as mapboxgl.Layer;
    if (existingLayer) {
      return;
    }
    const layerOptions: mapboxgl.Layer = {
      id: this.trueLayerId,
      type: this.type,
      metadata: this.trueMetadata,
      layout: this.layout,
      paint: this.paint,
    };
    if (this.minZoom !== undefined) {
      layerOptions.minzoom = this.minZoom;
    }
    if (this.maxZoom !== undefined) {
      layerOptions.maxzoom = this.maxZoom;
    }
    map.addLayer(layerOptions, this.trueBefore);
    this.$emit('loaded');
  }

  protected removeLayer() {
    if (!this.getMap) {
      return;
    }
    const map = this.getMap();
    if (map && map.getLayer(this.trueLayerId)) {
      map.removeLayer(this.trueLayerId);
    }
  }

  protected render(): JSX.Element | Element | null {
    return null;
  }
}
