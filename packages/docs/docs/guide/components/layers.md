# Layers

> Except for layers of the background type, each layer needs to refer to a source. Layers take the data that they get from a source, optionally filter features, and then define how those features are styled.

Here are the wrappers around native mapbox-gl layers.

All of these Layers include the following properties:

  | Name | Description |
  |------|-------------|
  | **layerId**: _string_ | The ID of the layer to add. No need to prefix, it will be internally prefixed (see [Layer Wrapper](/common-components/core-map/wrappers.md#layer-wrapper)). |
  | **visible**: _?_ | Whether the layer is displayed. This is a shortcut to the `visibility` layout property and has precedence over it. |
  | **metadata**: _object?_ (default: `{}`) | Arbitrary properties useful to track with the layer, but do not influence rendering. Properties should be prefixed to avoid collisions, like 'mapbox:'. |
  | **minZoom**: _number?_ (between `0` and `24`) | The minimum zoom level for the layer. At zoom levels less than the minzoom, the layer will be hidden. |
  | **maxZoom**: _number?_ (between `0` and `24`) | The maximum zoom level for the layer. At zoom levels equal to or greater than the maxzoom, the layer will be hidden. |
  | **layout**: _object?_ | Layout properties of the layer (see the following) |
  | **paint**: _object?_ | Paint properties of the layer (see the following) |
  | **before**: _string?_ | The ID of an existing layer to insert the new layer before. If not provided, it will have the value provided by the [Layer Wrapper](/common-components/core-map/wrappers.md#layer-wrapper) if any. If the latter is also not defined the layer will be draw on top of the others. |

And events:

  | Name | Description |
  |------|-------------|
  | **loaded** | Fired after the layer has been added to the map. |

Additionally, all of these Layers except Background include also the following properties:

  | Name | Description |
  |------|-------------|
  | **sourceId**: _string_ | The ID of the source to be used for this layer. If not provided, it will be the ID of the closest Source parent |
  | **filter**: [_expression?_](https://docs.mapbox.com/mapbox-gl-js/style-spec/#expressions) | An expression specifying conditions on source features. Only features that match the filter are displayed. Zoom expressions in filters are only evaluated at integer zoom levels. |
  | **popupOnClick**: _boolean?_ (default: `false`) | Whether the popup is displayed when clicking on a feature if a popup slot is provided (see [Popup Management](#popup-management)) |
  | **popupOnHover**: _boolean?_ (default: `true`) | Whether the popup is displayed when hovering a feature if a popup slot is provided (see [Popup Management](#popup-management)) |
  | **popupAnchor**: _string?_ | Anchor position of the popup (one of `'center'` ,  `'top'` ,  `'bottom'` , `'left'` ,  `'right'` ,  `'top-left'` ,  `'top-right'` ,  `'bottom-left'` , and  `'bottom-right'`). |
  | **popupOffset**: _(number \| [PointLike](https://docs.mapbox.com/mapbox-gl-js/api/#pointlike) \| object)?_ | A pixel offset applied to the popup's location specified as: <ul><li>a single number specifying a distance from the popup's location</li><li>a [PointLike](https://docs.mapbox.com/mapbox-gl-js/api/#pointlike) specifying a constant offset</li><li>an object of [Point](https://docs.mapbox.com/mapbox-gl-js/api/#point)s specifing an offset for each anchor position. Negative offsets indicate left and up.</li></ul> |
  | **listenUserEvents**: _boolean?_ (default: `true`) | Whether Mouse events on the layer are handled. |

And events:

  | Name | Description |
  |------|-------------|
  | **click** | Fired when clicking on a feature of the layer. Returns a [_MouseEvent_](https://developer.mozilla.org/fr/docs/Web/API/MouseEvent) with an additional property `feature: GeoJSON.Feature?` |
  | **clickaway** | Fired when clicking away from a feature of the layer. Returns a [_MouseEvent_](https://developer.mozilla.org/fr/docs/Web/API/MouseEvent). |
  | **mouseover** | Fired when entering a feature of the layer. Returns a [_MouseEvent_](https://developer.mozilla.org/fr/docs/Web/API/MouseEvent) with an additional property `feature: GeoJSON.Feature?` |
  | **mousemove** | Fired when moving on a feature of the layer. Returns a [_MouseEvent_](https://developer.mozilla.org/fr/docs/Web/API/MouseEvent) with an additional property `feature: GeoJSON.Feature?` |
  | **mouseout** | Fired when exiting a feature of the layer. Returns a [_MouseEvent_](https://developer.mozilla.org/fr/docs/Web/API/MouseEvent). |


## Background
See [mapbox-gl Background layer](https://docs.mapbox.com/mapbox-gl-js/style-spec#layers-background) for layout and paint property details.

-----------
**Example:**
```html
<v-background-layer
  layer-id="myBackgroundLayerId"
  :paint="{
    'background-color': '#f8e6a2',
    'background-opacity': 0.4,
  }"
/>
```
----------

## Circle
See [mapbox-gl Circle layer](https://docs.mapbox.com/mapbox-gl-js/style-spec#layers-circle) for layout and paint property details.

-----------
**Example:**
```html
<v-circle-layer
 layer-id="myCircleLayerId"
 :paint="{
   'circle-radius': 4,
   'circle-color': '#ec6400',
 }"
>
  <!-- Here goes your slots for popup and details -->
</v-circle-layer>
```
----------

## Fill
See [mapbox-gl Fill layer](https://docs.mapbox.com/mapbox-gl-js/style-spec#layers-fill) for layout and paint property details.

-----------
**Example:**
```html
<v-fill-layer
 layer-id="myFillLayerId"
 :paint="{
   'fill-color': '#ccc',
 }"
>
  <!-- Here goes your slots for popup and details -->
</v-fill-layer>
```
----------

## Fill Extrusion
See [mapbox-gl Fill Extrusion layer](https://docs.mapbox.com/mapbox-gl-js/style-spec#layers-fill-extrusion) for layout and paint property details.

-----------
**Example:**
```html
<v-fill-extrusion-layer
 layer-id="myFillExtrusionLayerId"
 :paint="{
   'fill-extrusion-color': '#ccc',
   'fill-extrusion-height': 50,
 }"
>
  <!-- Here goes your slots for popup and details -->
</v-fill-extrusion-layer>
```
----------

## Heatmap
See [mapbox-gl Heatmap layer](https://docs.mapbox.com/mapbox-gl-js/style-spec#layers-heatmap) for layout and paint property details.

-----------
**Example:**
```html
<v-heatmap-layer
 layer-id="myHeatmapLayerId"
/>
```
----------

## Hillshade
See [mapbox-gl Hillshade layer](https://docs.mapbox.com/mapbox-gl-js/style-spec#layers-hillshade) for layout and paint property details.

-----------
**Example:**
```html
<v-hillshade-layer
 layer-id="myHillshadeLayerId"
/>
```
----------

## Line
See [mapbox-gl Line layer](https://docs.mapbox.com/mapbox-gl-js/style-spec#layers-line) for layout and paint property details.

-----------
**Example:**
```html
<v-line-layer
 layer-id="myLineLayerId"
 :paint="{
   'line-color': '#f786a5',
   'line-width': 4,
 }"
>
  <!-- Here goes your slots for popup and details -->
</v-line-layer>
```
----------

## Raster
See [mapbox-gl Raster layer](https://docs.mapbox.com/mapbox-gl-js/style-spec#layers-raster) for layout and paint property details.

-----------
**Example:**
```html
<v-raster-layer
 layer-id="myRasterLayerId"
 :paint="{
   'raster-opacity': 0.85,
 }"
>
  <!-- Here goes your slots for popup and details -->
</v-raster-layer>
```
----------

## Symbol
See [mapbox-gl Symbol layer](https://docs.mapbox.com/mapbox-gl-js/style-spec#layers-symbol) for layout and paint property details.

See also [Layer Wrappers](/common-components/core-map/wrappers.md#image-wrapper) to know how to load images in layers to be used as icons.

-----------
**Example:**
```html
<v-symbol-layer
 layer-id="mySymbolLayerId"
 :paint="{
   'icon-image': 'my-icon',
   'icon-anchor': 'top',
   'text-field': 'Awesome!',
   'text-anchor': 'bottom',
 }"
>
  <!-- Here goes your slots for popup and details -->
</v-symbol-layer>
```
----------

## Popup Management

All of the layers (except Background) provide you two Vue.js slots, one for the popup and one for the details.

### Popup slot

The children occupying the `'popup'` slot will be rendered in a popup attached to the feature. The scope of the slot give access to the following properties:

  | Name | Description |
  |------|-------------|
  | **feature**: _GeoJSON.Feature?_ | The feature that was hovered or clicked, for geojson source. |
  | **lngLat**: [_LngLat?_](https://docs.mapbox.com/mapbox-gl-js/api/#lnglat) | The coordinates where the feature was clicked or hovered |

It is advised not to put too much information in popups and to use the according [Design Helper](/common-components/design-helpers/popup-content.md).

-------------
**Example**
```html
<v-circle-layer
 layer-id="myCircleLayerWithPopup"
 :paint="{
   'circle-radius': 4,
   'circle-color': '#ec6400',
 }"
>
  <div slot="popup" slot-scope="{ lngLat }">
    This was clicked on latitude {{lngLat.lat}}
  </div>
</v-circle-layer>
```
-------------

### Details slot

The children occupying the `'details'` slot will be rendered in a [portal-vue](https://linusborg.github.io/portal-vue) component outside of the map (for Wayware, in the Details panel on the right of the application). It is advised to use the according [Design Helper](/common-components/design-helpers/details-content.md).

-------------
**Example:**
```html
<v-circle-layer
 layer-id="myCircleLayerWithDetails"
 :paint="{
   'circle-radius': 4,
   'circle-color': '#ec6400',
 }"
>
  <div slot="details" slot-scope="{ lngLat }">
    This was clicked on latitude {{lngLat.lat}}
  </div>
</v-circle-layer>
```
-------------
