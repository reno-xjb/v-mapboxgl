<template>
  <div
    v-if="menuOpen"
    class="v-mapboxgl-control-menu"
    :style="{
        left: `${computedLeft}px`,
        top: `${computedTop}px`,
    }"
  >
    <button
      :class="[
        'v-mapboxgl-control-menu__card',
        { 'v-mapboxgl-control-menu__card--active': (itemName === value) },
      ]"
      :style="{ 'border-color': itemColor }"
      v-for="(item, itemName) in items"
      :key="itemName"
      @click="onMenuClick(itemName)"
    >
      <div
        class="v-mapboxgl-control-menu__icon"
        :style="{
          'background-image': `url(${item.icon})`,
        }"
      />
    </button>
  </div>
</template>

<script lang='ts'>
  import * as mapboxgl from 'mapbox-gl';
  import { Component, Mixins, Prop, Watch, Inject } from 'vue-property-decorator';
  import { VControlMixin } from 'v-mapboxgl';
  import { Corner } from '@v-mapboxgl/types';
  import { BasicMapboxControl, ButtonStyle } from '@v-mapboxgl/plugin-basic-control';

  export interface ControlMenuItem {
    icon: string;
    [key: string]: any;
  }
  export interface ControlMenuItems {
    [key: string]: ControlMenuItem;
  }

  @Component({})
  export default class VMenuControl extends Mixins(VControlMixin) {

    @Inject({ from: 'getMap', default: undefined })
    protected getMap?: any;

    protected control: BasicMapboxControl | null = null;

    private menuOpen = false;
    private menuX = 0;
    private menuY = 0;

    @Prop({ type: String, required: true })
    private value!: string;
    @Prop({ type: Object, default: () => ({}) })
    private items!: ControlMenuItems;
    @Prop({ type: String, default: '#000' })
    private itemColor!: string;

    private get itemNumber(): number {
      return Object.keys(this.items).length;
    }

    private get style(): ButtonStyle {
      if (!this.items[this.value]) {
        return {};
      }
      const icon = this.items[this.value].icon;
      return {
        backgroundImage: `url(${icon})`,
      };
    }

    private get computedLeft() {
      return this.menuX - (this.itemNumber * 42);
    }
    private get computedTop() {
      return this.menuY + 42;
    }

    protected beforeDestroy() {
      if (!this.getMap) {
        return;
      }
      const map = this.getMap();
      if (!map) {
        return;
      }
      map.off('click', this.closeMenu);
      map.off('resize', this.closeMenu);
      map.off('contextmenu', this.closeMenu);
    }

    @Watch('value')
    private onValueUpdate() {
      if (this.control) {
        this.control.updateButtonStyle(this.style);
      }
    }

    private created() {
      this.control = new BasicMapboxControl({
        style: this.style,
        className: 'control-icon',
        onClick: this.onClick,
      });
      if (!this.getMap) {
        return;
      }
      const map = this.getMap();
      if (!map) {
        return;
      }
      map.on('click', this.closeMenu);
      map.on('resize', this.closeMenu);
      map.on('contextmenu', this.closeMenu);
    }

    private closeMenu() {
      this.menuOpen = false;
    }

    private onClick(event: MouseEvent) {
      if (this.menuOpen) {
        this.closeMenu();
        return;
      }
      if (!this.getMap) {
        return;
      }
      const map = this.getMap();
      if (!map) {
        return;
      }
      const { top, left } = map.getCanvas().getBoundingClientRect();
      const {
        clientX,
        clientY,
        offsetX,
        offsetY,
      } = event;
      this.menuX = clientX - offsetX - left;
      this.menuY = clientY - offsetY - top;
      this.menuOpen = true;
      this.$emit('click', event);
    }

    private onMenuClick(item: string) {
      this.closeMenu();
      this.$emit('menu:click', item);
    }
  }
</script>

<style>
.control-icon {
  background-size: 30px;
}
.v-mapboxgl-control-menu {
  display: inline-flex;
  position: absolute;
  z-index: 1;
  box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.1);
  background-color: #fff;
}
.v-mapboxgl-control-menu__card {
  height: 42px;
  width: 42px;
  padding: 6px;
  cursor: pointer;
  border: 0;
  background-color: #fff;
  box-sizing: border-box;
  outline: none;
}
.v-mapboxgl-control-menu__icon {
  height: 100%;
  width: 100%;
  background-size: 30px;
  background-repeat: no-repeat;
}
.v-mapboxgl-control-menu__card--active {
  padding: 2px;
  border-width: 4px;
  border-style: solid;
}
</style>
