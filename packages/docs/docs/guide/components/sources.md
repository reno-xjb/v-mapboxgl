# Sources

> Sources supply data to be shown on the map

> Adding a source won't immediately make data appear on the map because sources don't contain styling details like color or width. Layers refer to a source and give it a visual representation. This makes it possible to style the same source in different ways, like differentiating between types of roads in a highways layer.

Here are the wrappers around native mapbox-gl sources.

In addition to their native parameters, all of these Sources include the following additional property:

  | Name | Description|
  |------|------------|
  | **sourceId**: _string_ | The ID of the source to add. No need to prefix, it will be internally prefixed (see [Layer Wrapper](/common-components/core-map/wrappers.md#layer-wrapper)). |

## Vector
See [mapbox-gl Vector source](https://docs.mapbox.com/mapbox-gl-js/style-spec#sources-vector).

-----------
**Example:**
```html
<v-vector-source
  source-id="myVectorSourceId"
  :tiles="['/url/to/vector/source']"
  :tileSize="512"
>
  <!-- Here goes your 'fill', 'line', 'symbol', 'circle', 'fill-extrusion' or 'heatmap' layer(s) -->
</v-vector-source>
```
----------

## Raster
See [mapbox-gl Raster source](https://docs.mapbox.com/mapbox-gl-js/style-spec#sources-raster).

-----------
**Example:**
```html
<v-raster-source
  source-id="myRasterSourceId"
  :tiles="['/url/to/raster/source']"
  :tileSize="512"
>
  <!-- Here goes your 'raster' layer(s) -->
</v-raster-source>
```
----------

## Raster Dem
See [mapbox-gl Raster Dem source](https://docs.mapbox.com/mapbox-gl-js/style-spec#sources-raster-dem).

-----------
**Example:**
```html
<v-raster-dem-source
  source-id="myRasterDemSourceId"
  :tiles="['/url/to/raster-dem/source']"
  :tileSize="512"
>
  <!-- Here goes your 'hillshade' layer(s) -->
</v-raster-dem-source>
```
----------

## Geojson
See [mapbox-gl Geojson source](https://docs.mapbox.com/mapbox-gl-js/style-spec#sources-geojson).

-----------
**Example:**
```html
<v-geojson-source
  source-id="myGeojsonSourceId"
  :data="{
    type: 'FeatureCollection',
    features: [
      // features
    ],
  }"
>
  <!-- Here goes your 'fill', 'line', 'symbol', 'circle', 'fill-extrusion' or 'heatmap' layer(s) -->
</v-geojson-source>
```
----------

## Image
See [mapbox-gl Image source](https://docs.mapbox.com/mapbox-gl-js/style-spec#sources-image).

-----------
**Example:**
```html
<v-image-source
  source-id="myImageSourceId"
  url="/url/to/image/source"
  :coordinates="[
    [1.29, 43.66],
    [1.42, 43.66],
    [1.42, 43.56],
    [1.29, 43.56],
  ]"
>
  <!-- Here goes your 'raster' layer(s) -->
</v-image-source>
```
----------


## Video
See [mapbox-gl Video source](https://docs.mapbox.com/mapbox-gl-js/style-spec#sources-video).

-----------
**Example:**
```html
<v-video-source
  source-id="myVideoSourceId"
  :urls="['/url/to/video/source']"
  :coordinates="[
    [1.29, 43.66],
    [1.42, 43.66],
    [1.42, 43.56],
    [1.29, 43.56],
  ]"
>
  <!-- Here goes your 'raster' layer(s) -->
</v-video-source>
```
----------
