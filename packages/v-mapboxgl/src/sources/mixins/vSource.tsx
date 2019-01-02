import Vue from 'vue';
import { Component, Provide, Inject, Prop, Watch } from 'vue-property-decorator';
import * as mapboxgl from 'mapbox-gl';
import { SourceType } from '@/types';

@Component({})
export default class VSource extends Vue {
  protected loaded = false;
  protected type: SourceType = 'vector';

  @Inject({ from: 'getMap', default: undefined })
  protected getMap?: any;
  @Inject({ from: 'getPrefix', default: undefined })
  protected getPrefix?: any;

  @Prop({ type: String, required: true })
  protected sourceId!: string;

  protected get trueSourceId(): string {
    return this.getPrefix ? `${this.getPrefix()}/${this.sourceId}` : this.sourceId;
  }

  @Provide('getSourceId')
  public getSourceId(): string {
    return this.sourceId;
  }
  @Provide('getTrueSourceId')
  public getTrueSourceId(): string {
    return this.trueSourceId;
  }

  protected updateSource(options: any = {}, onExistingSource?: any) {
    if (!this.getMap) {
      return;
    }
    const map = this.getMap();
    const existingSource = map.getSource(this.trueSourceId);
    if (!existingSource) {
      this.createSource(options);
      this.loaded = true;
      return;
    }
    if (onExistingSource) {
      onExistingSource(existingSource);
      return;
    }
    this.loaded = false;
    this.$nextTick(() => {
      this.removeSource();
      this.createSource(options);
      this.loaded = true;
    });
  }

  protected createSource(options: any = {}) {
    if (!this.getMap) {
      return;
    }
    const map = this.getMap();
    const sourceOptions = {
      type: this.type,
      ...Object.keys(options).reduce((acc: any, opt: string) => {
        if (options[opt] === undefined) {
          return acc;
        }
        return {
          ...acc,
          [opt]: options[opt],
        };
      }, {}),
    };
    map.addSource(this.trueSourceId, sourceOptions);
  }

  protected beforeDestroy() {
    this.removeSource();
  }

  protected removeSource() {
    if (!this.getMap) {
      return;
    }
    const map = this.getMap();
    if (map && map.getSource(this.trueSourceId)) {
      map.removeSource(this.trueSourceId);
    }
  }

  protected render(): JSX.Element | Element | null {
    if (!this.loaded) {
      return null;
    }
    return (
      <div>
        {this.$slots.default}
      </div>
    );
  }
}
