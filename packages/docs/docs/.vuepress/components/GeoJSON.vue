<template>
  <v-map
    :access-token="$mapbox.token"
    map-style="mapbox://styles/mapbox/outdoors-v11"
    :center="[-121.403732, 40.492392]"
    :zoom="10"
  >
    <v-geojson-source
      source-id="parks"
      :data="data"
    >
      <v-fill-layer
        layer-id="shapes"
        :paint="{
          'fill-color': '#888888',
          'fill-opacity': 0.4,
        }"
        :filter="['!=', '$type', 'Point']",
      />
      <v-circle-layer
        layer-id="points"
        :paint="{
          'circle-color': '#b42222',
          'circle-radius': 6,
        }"
        :filter="['==', '$type', 'Point']",
      />
      <v-line-layer
        layer-id="border"
        :paint="{
          'line-color': '#888888',
          'line-width': 4,
        }"
        :filter="['!=', '$type', 'Point']",
      />
      <v-symbol-layer
        layer-id="symbol"
        :layout="{
          'icon-image': 'marker-15',
          'icon-anchor': 'center',
          'text-field': '{label}',
          'text-size': 12,
          'text-anchor': 'bottom',
        }"
        :filter="['==', '$type', 'Point']",
      />
    </v-geojson-source>
  </v-map>
</template>

<script>
export default {
  data() {
    return {
      data: {
        "type": "FeatureCollection",
        "features": [{
          "type": "Feature",
          "geometry": {
            "type": "Polygon",
            "coordinates": [
              [
                [-121.353637, 40.584978],
                [-121.284551, 40.584758],
                [-121.275349, 40.541646],
                [-121.246768, 40.541017],
                [-121.251343, 40.423383],
                [-121.326870, 40.423768],
                [-121.360619, 40.434790],
                [-121.363694, 40.409124],
                [-121.439713, 40.409197],
                [-121.439711, 40.423791],
                [-121.572133, 40.423548],
                [-121.577415, 40.550766],
                [-121.539486, 40.558107],
                [-121.520284, 40.572459],
                [-121.487219, 40.550822],
                [-121.446951, 40.563190],
                [-121.370644, 40.563267],
                [-121.353637, 40.584978]
              ]
            ]
          }
        }, {
          "type": "Feature",
          "geometry": {
            "type": "Point",
            "coordinates": [-121.415061, 40.506229]
          },
          properties: {
            label: 'Awesome Place',
          },
        }, {
          "type": "Feature",
          "geometry": {
            "type": "Point",
            "coordinates": [-121.505184, 40.488084]
          },
          properties: {
            label: 'Wonderful Place',
          },
        }, {
          "type": "Feature",
          "geometry": {
            "type": "Point",
            "coordinates": [-121.354465, 40.488737]
          },
          properties: {
            label: 'Fantastic Place',
          },
        }]
      }
    };
  },
};
</script>
