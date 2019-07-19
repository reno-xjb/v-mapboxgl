import * as mapboxgl from 'mapbox-gl';

export type Corner = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
export type Position = Corner | 'center' | 'top' | 'bottom' | 'left' | 'right';
export type UnitSystem = 'metric' | 'imperial' | 'nautical';
export type LayerType = 'fill' | 'line' | 'symbol' | 'circle' | 'fill-extrusion' | 'raster' | 'background'
 | 'heatmap' | 'hillshade';
export type SourceType = 'vector' | 'raster' | 'raster-dem' | 'geojson' | 'image' | 'video' | 'canvas';
export type Scheme = 'xyz' | 'tms';
export type Encoding = 'terrarium' | 'mapbox';

export interface ImageOptions {
  pixelRatio?: number;
  sdf?: boolean;
}

export interface Image {
  url: string;
  options?: ImageOptions;
}

export interface Images {
  [key: string]: Image;
}


export interface Viewport {
  zoom: number;
  center: mapboxgl.LngLat;
  bounds: mapboxgl.LngLatBounds;
}
