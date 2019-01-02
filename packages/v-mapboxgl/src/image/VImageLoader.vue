<template>
  <div v-if="loaded">
    <slot />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Inject, Prop } from 'vue-property-decorator';
import { Image, Images } from '@/types';

import * as mapboxgl from 'mapbox-gl';

@Component({})
export default class VImageLoader extends Vue {
  private loaded = false;
  private loadedImages: string[] = [];

  @Inject({ from: 'getMap', default: undefined })
  private getMap?: any;
  @Inject({ from: 'getPrefix', default: undefined })
  private getPrefix?: any;

  @Prop({ type: Object, default: () => ({}) })
  private images!: Images;

  private loadImage(map: mapboxgl.Map, id: string, properties: Image): Promise<string> {
    return new Promise((resolve, reject) => {
      map.loadImage(properties.url, (error: Error, image: ImageData) => {
        if (error) {
          reject(error);
          return;
        }
        map.addImage(id, image, properties.options);
        resolve(id);
      });
    });
  }

  private mounted() {
    if (!this.getMap) {
      return;
    }
    const map = this.getMap();
    if (!map) {
      return;
    }
    const promises = Object.keys(this.images).map((imageId: string) =>
      this.loadImage(map, imageId, this.images[imageId]));
    Promise.all(promises)
      .then((ids: string[]) => {
        this.loadedImages = ids;
        this.loaded = true;
      });
  }

  private beforeDestroy() {
    if (!this.getMap) {
      return;
    }
    const map = this.getMap();
    if (!map) {
      return;
    }
    for (const imageId of this.loadedImages) {
      map.removeImage(imageId);
    }
  }
}
</script>
