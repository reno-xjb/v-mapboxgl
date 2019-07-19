import { LayerType, Scheme, Encoding } from '@v-mapboxgl/types';

export function zoomValidator(value: number): boolean {
  return (value >= 0 && value <= 24);
}

export function bufferValidator(value: number): boolean {
  return (value >= 0 && value <= 512);
}

export function geojsonLayerTypeValidator(value: LayerType): boolean {
  return ['fill', 'line', 'symbol', 'circle', 'fill-extrusion', 'raster', 'background'].indexOf(value) !== -1;
}

export function schemeValidator(value: Scheme): boolean {
  return ['xyz', 'tms'].indexOf(value) !== -1;
}

export function encodingValidator(value: Encoding): boolean {
  return ['terrarium', 'mapbox'].indexOf(value) !== -1;
}

export function coordinatesValidator(value: number[][]): boolean {
  return value.length === 4
    && value[0].length === 2
    && value[1].length === 2
    && value[2].length === 2
    && value[3].length === 2;
}
