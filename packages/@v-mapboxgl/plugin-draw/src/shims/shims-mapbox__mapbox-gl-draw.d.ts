declare module '@mapbox/mapbox-gl-draw' {
  import { Feature, FeatureCollection } from 'geojson';
  import { IControl } from 'mapbox-gl';

  export interface MapboxDrawOptions {
    displayControlsDefault?: boolean;
    keybindings?: boolean;
    touchEnabled?: boolean;
    boxSelect?: boolean;
    clickBuffer?: number;
    touchBuffer?: number;
    controls?: MapboxDrawControls;
    styles?: object[];
    modes?: MapboxDrawModes;
    defaultMode?: string;
    userProperties?: boolean;
  }

  export interface MapboxDrawControls {
    point?: boolean;
    line_string?: boolean;
    polygon?: boolean;
    trash?: boolean;
    combine_features?: boolean;
    uncombine_features?: boolean;
  }

  export interface MapboxDrawState {
    [property: string]: any;
  }

  export interface MapboxDrawModeOptions {
    [option: string]: any;
  }

  export interface MapboxDrawModes {
    [mode: string]: {
      onSetup: (opts: MapboxDrawModeOptions) => MapboxDrawState;
      onDrag: (state: MapboxDrawState, e: Event) => any;
      onClick: (state: MapboxDrawState, e: Event) => any;
      onMouseMove: (state: MapboxDrawState, e: Event) => any;
      onMouseDown: (state: MapboxDrawState, e: Event) => any;
      onMouseUp: (state: MapboxDrawState, e: Event) => any;
      onMouseOut: (state: MapboxDrawState, e: Event) => any;
      onKeyUp: (state: MapboxDrawState, e: Event) => any;
      onKeyDown: (state: MapboxDrawState, e: Event) => any;
      onTouchStart: (state: MapboxDrawState, e: Event) => any;
      onTouchMove: (state: MapboxDrawState, e: Event) => any;
      onTouchEnd: (state: MapboxDrawState, e: Event) => any;
      onTap: (state: MapboxDrawState, e: Event) => any;
      onStop: (state: MapboxDrawState) => any;
      onTrash: (state: MapboxDrawState) => any;
      onCombineFeature: (state: MapboxDrawState) => any;
      onUncombineFeature: (state: MapboxDrawState) => any;
      toDisplayFeatures: (state: MapboxDrawState, geojson: any, display: any) => any;
    };
  }

  export const modes: MapboxDrawModes;

  export default class MapboxDraw implements IControl {

    public getDefaultPosition: () => string;

    constructor(options?: MapboxDrawOptions);

    public add(geojson: object): string[];

    public get(featureId: string): Feature | undefined;

    public getFeatureIdsAt(point: { x: number, y: number }): string[];

    public getSelectedIds(): string[];

    public getSelected(): FeatureCollection;

    public getSelectedPoints(): FeatureCollection;

    public getAll(): FeatureCollection;

    public delete(ids: string | string[]): this;

    public deleteAll(): this;

    public set(featureCollection: FeatureCollection): string[];

    public trash(): this;

    public combineFeatures(): this;

    public uncombineFeatures(): this;

    public getMode(): string;

    public changeMode(mode: string, options?: object): this;

    public setFeatureProperty(featureId: string, property: string, value: any): this;

    public onAdd(map: mapboxgl.Map): HTMLElement;

    public onRemove(map: mapboxgl.Map): any;

  }
}
