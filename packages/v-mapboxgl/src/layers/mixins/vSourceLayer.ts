import Vue from 'vue';
import { Component, Inject, Prop, Watch, Mixins } from 'vue-property-decorator';
import VLayerMixin from './vLayer';

@Component({})
export default class VSourceLayer extends Mixins(VLayerMixin) {
  @Inject({ from: 'getTrueSourceId', default: undefined })
  protected getTrueSourceId!: any;

  @Prop(String)
  protected sourceId?: string;
  @Prop(Array)
  protected filter?: mapboxgl.Expression;

  protected get trueSourceId(): string {
    if (this.sourceId) {
      return this.getPrefix ? `${this.getPrefix()}/${this.sourceId}` : this.sourceId;
    }
    if (this.getTrueSourceId) {
      return this.getTrueSourceId();
    }
    throw Error(`No source id was given, and no parent source seems to exist (layer: ${this.layerId})`);
  }

  @Watch('source', { deep: true })
  protected onSourceUdate() {
    this.updateLayer();
  }

  @Watch('filter', { immediate: true, deep: true })
  protected onFilterUpdate() {
    if (!this.getMap) {
      return;
    }
    const map = this.getMap();
    if (map.getLayer(this.trueLayerId)) {
      map.setFilter(this.trueLayerId, this.filter);
    }
  }

  protected updateLayer() {
    if (!this.getMap) {
      return;
    }
    const map = this.getMap();
    const existingSource = map.getSource(this.trueSourceId) as mapboxgl.GeoJSONSource;
    if (!existingSource) {
      return;
    }
    const existingLayer = map.getLayer(this.trueLayerId) as mapboxgl.Layer;
    if (existingLayer) {
      return;
    }
    const layerOptions: mapboxgl.Layer = {
      id: this.trueLayerId,
      type: this.type,
      metadata: this.trueMetadata,
      source: this.trueSourceId,
      layout: this.layout,
      paint: this.paint,
    };
    if (this.filter) {
      layerOptions.filter = this.filter;
    }
    if (this.minZoom !== undefined) {
      layerOptions.minzoom = this.minZoom;
    }
    if (this.maxZoom !== undefined) {
      layerOptions.maxzoom = this.maxZoom;
    }
    map.addLayer(layerOptions, this.trueBefore);
    this.$emit('loaded');
  }
}
