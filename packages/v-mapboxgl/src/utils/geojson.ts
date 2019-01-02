import turfNearestPointOnLine from '@turf/nearest-point-on-line';
import * as mapboxgl from 'mapbox-gl';

export function resolveCoordinatesToFeature({
  feature,
  lngLat,
  accurate = false,
}: {
  feature: GeoJSON.Feature | null,
  lngLat: mapboxgl.LngLat | null,
  accurate: boolean,
}): mapboxgl.LngLat | null {
  if (!lngLat || !feature || !feature.geometry) {
    return null;
  }
  switch (feature.geometry.type) {
    case 'Point':
      return mapboxgl.LngLat.convert(feature.geometry.coordinates as [number, number]);
    case 'LineString':
      if (!accurate) {
        return lngLat;
      }
      return mapboxgl.LngLat.convert(turfNearestPointOnLine(feature, [lngLat.lng, lngLat.lat]).geometry.coordinates);
    case 'Polygon':
      if (!accurate) {
        return lngLat;
      }
      // TODO compute accurate coordinates on the polygon
      return lngLat;
    default:
      return null;
  }
}
