import Vue from 'vue';
import { Component, Prop, Watch, Mixins } from 'vue-property-decorator';
import * as mapboxgl from 'mapbox-gl';
import {
  Position,
  LayerType,
} from '@v-mapboxgl/types';
import VPopup from '@/popup/VPopup.vue';
import VLayer from '@/layers/mixins/vLayer';
import VSourceLayerMixin from '@/layers/mixins/vSourceLayer';
import '@/layers/mixins/vPopupLayer.css';
import { geojson } from '@v-mapboxgl/utils';

@Component({})
export default class VPopupLayer extends Mixins(VSourceLayerMixin) {
  @Prop({ type: Boolean, default: false })
  protected popupOnClick!: boolean;
  @Prop({ type: Boolean, default: true })
  protected popupOnHover!: boolean;
  @Prop(String)
  protected popupAnchor?: Position;
  @Prop([Number, Object, Array])
  protected popupOffset?: number | mapboxgl.PointLike | { [key: string]: mapboxgl.PointLike; };
  @Prop({ type: Boolean, default: true })
  protected listenUserEvents!: boolean;

  protected currentLngLat: mapboxgl.LngLat | null = null;
  protected clickedLngLat: mapboxgl.LngLat | null = null;
  protected currentFeature: GeoJSON.Feature | null = null;
  protected clickedFeature: GeoJSON.Feature | null = null;

  protected get currentPopupCoordinates(): mapboxgl.LngLat | null {
    return geojson.resolveCoordinatesToFeature({
      feature: this.currentFeature,
      lngLat: this.currentLngLat,
      accurate: false,
    });
  }
  protected get clickedPopupCoordinates(): mapboxgl.LngLat | null {
    return geojson.resolveCoordinatesToFeature({
      feature: this.clickedFeature,
      lngLat: this.clickedLngLat,
      accurate: true,
    });
  }

  protected get portalName(): string {
    return `layer-${this.trueLayerId}`;
  }

  protected resetFeatures() {
    this.currentLngLat = null;
    this.clickedLngLat = null;
    this.currentFeature = null;
    this.clickedFeature = null;
  }
  protected resetCurrentFeature() {
    this.currentLngLat = null;
    this.currentFeature = null;
  }
  protected assignClickedFeature(event: any) {
    this.currentLngLat = null;
    this.clickedLngLat = event.lngLat;
    this.currentFeature = null;
    this.clickedFeature = event.features[0];
  }
  protected assignCurrentFeature(event: any) {
    this.currentLngLat = event.lngLat;
    this.currentFeature = event.features[0];
  }

  protected onMapClick(event: any) {
    if (this.clickedLngLat) {
      this.$emit('clickaway', event);
    }
    this.resetFeatures();

  }
  protected onClick(event: any) {
    this.assignClickedFeature(event);
    this.$emit('click', { ...event, feature: this.clickedFeature });
  }
  protected onMouseOver(event: any) {
    if (!this.getMap) {
      return;
    }
    const map = this.getMap();
    map.getCanvas().style.cursor = 'pointer';
    if (this.popupOnHover) {
      this.assignCurrentFeature(event);
    }
    this.$emit('mouseover', { ...event, feature: this.currentFeature });
  }
  protected onMouseMove(event: any) {
    if (this.popupOnHover) {
      this.assignCurrentFeature(event);
    }
    this.$emit('mouvemove', { ...event, feature: this.currentFeature });
  }
  protected onMouseOut(event: any) {
    if (!this.getMap) {
      return;
    }
    const map = this.getMap();
    map.getCanvas().style.cursor = '';
    if (this.popupOnHover) {
      this.resetCurrentFeature();
    }
    this.$emit('mouseout', event);
  }

  protected bindEvents() {
    if (!this.listenUserEvents) {
      return;
    }
    if (!this.getMap) {
      return;
    }
    const map = this.getMap();
    map.on('click', this.onMapClick);
    map.on('click', this.trueLayerId, this.onClick);
    map.on('mouseover', this.trueLayerId, this.onMouseOver);
    map.on('mouseout', this.trueLayerId, this.onMouseOut);
    map.on('mousemove', this.trueLayerId, this.onMouseMove);
    // 'dblclick',
    // 'contextmenu',
    // 'touchstart',
    // 'touchend',
    // 'touchcancel'
  }
  protected unbindEvents() {
    if (!this.listenUserEvents) {
      return;
    }
    if (!this.getMap) {
      return;
    }
    const map = this.getMap();
    if (!map) {
      return;
    }
    map.off('click', this.onMapClick);
    map.off('click', this.trueLayerId, this.onClick);
    map.off('mouseover', this.trueLayerId, this.onMouseOver);
    map.off('mouseout', this.trueLayerId, this.onMouseOut);
    // 'dblclick',
    // 'contextmenu',
    // 'touchstart',
    // 'touchend',
    // 'touchcancel'
  }

  @Watch('visible', { immediate: true })
  protected onPopupVisibilityUpdate() {
    this.resetFeatures();
  }

  protected mounted() {
    this.bindEvents();
  }

  protected beforeDestroy() {
    this.unbindEvents();
  }

  protected renderHoveredPopup(): JSX.Element | Element | null {
    if (!this.visible || !this.currentPopupCoordinates || !this.$scopedSlots.popup) {
      return null;
    }
    return (
      // @ts-ignore vue is not able to typecheck jsx components TODO to remove when passing to vue3
      <VPopup
        coordinates={this.currentPopupCoordinates}
        closeButton={false}
        closeOnClick={false}
        anchor={this.popupAnchor}
        offset={this.popupOffset}
      >
        {this.$scopedSlots.popup({
          lngLat: this.currentPopupCoordinates,
          feature: this.currentFeature,
        })}
      </VPopup>
    );
  }

  protected renderClickedPopup(): JSX.Element | Element | null {
    if (!this.visible || !this.clickedPopupCoordinates || !this.popupOnClick || !this.$scopedSlots.popup) {
      return null;
    }
    return (
      // @ts-ignore vue is not able to typecheck jsx components TODO to remove when passing to vue3
      <VPopup
        coordinates={this.clickedPopupCoordinates}
        closeButton={false}
        closeOnClick={true}
        anchor={this.popupAnchor}
        offset={this.popupOffset}
      >
        {this.$scopedSlots.popup({
          lngLat: this.clickedPopupCoordinates,
          feature: this.clickedFeature,
        })}
      </VPopup>
    );
  }

  protected renderDetailsPortal(): JSX.Element | Element | null {
    if (!this.clickedPopupCoordinates || !this.$scopedSlots.details) {
      return null;
    }
    return (
      <portal
        targetClass='v-mapboxgl-details-portal-content'
        name={this.portalName}
        to='v_mapboxgl_details_portal'
      >
        <div style={{ height: '100%' }}>
          {this.$scopedSlots.details({
            lngLat: this.clickedPopupCoordinates,
            feature: this.clickedFeature,
          })}
        </div>
      </portal>
    );
  }

  protected render(): JSX.Element | Element | null {
    if (!this.$scopedSlots.popup && !this.$scopedSlots.details) {
      return null;
    }
    return (
      <div>
        {this.renderHoveredPopup()}
        {this.renderClickedPopup()}
        {this.renderDetailsPortal()}
      </div>
    );
  }
}
