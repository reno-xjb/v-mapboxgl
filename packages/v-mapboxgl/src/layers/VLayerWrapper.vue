<template>
  <div>
    <slot />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop, Provide } from 'vue-property-decorator';

export interface Metadata {
  [key: string]: any;
}

@Component({})
export default class VLayerWrapper extends Vue {
  @Prop({ type: String, default: '' })
  private prefix!: string;
  @Prop({ type: Object, default: () => ({}) })
  private metadata!: Metadata;
  @Prop(String)
  private before?: string;

  @Provide('getPrefix')
  private getPrefix(): string {
    return this.prefix;
  }
  @Provide('getMetadata')
  private getMetadata(): Metadata {
    return this.metadata;
  }

  @Provide('getBefore')
  private getBefore(): string {
    return this.before || '';
  }
}
</script>
