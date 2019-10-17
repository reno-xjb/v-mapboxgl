# Controls

Here are the wrappers around native mapbox-gl controls.

In addition to their native parameters, all of these Controls include the following additional property:

  | Name | Description|
  |------|------------|
  | **position**: _string?_ (default: `'top-right'`) | Position on the map to which the control will be added. Valid values are `'top-left'` ,  `'top-right'` ,  `'bottom-left'` , and  `'bottom-right'`. |

## Attribution Control
See [mapbox-gl Attribution control](https://docs.mapbox.com/mapbox-gl-js/api/#attributioncontrol).

-----------
**Example:**
```html
<v-attribution-control
  position="bottom-right"
  :compact="true"
  custom-attribution="Awesome!"
/>
```
----------

## Fullscreen Control
See [mapbox-gl Fullscreen control](https://docs.mapbox.com/mapbox-gl-js/api/#fullscreencontrol).

-----------
**Example:**
```html
<v-fullscreen-control position="bottom-right" />
```
----------

## Geolocate Control
See [mapbox-gl Geolocate control](https://docs.mapbox.com/mapbox-gl-js/api/#geolocatecontrol).

-----------
**Example:**
```html
<v-geolocate-control
  position="bottom-right"
  :position-options="{
    enableHighAccuracy: true,
    timeout: 6000,
  }"
  :track-user-location="true"
/>
```
----------

## Navigation Control
See [mapbox-gl Navigation control](https://docs.mapbox.com/mapbox-gl-js/api/#navigationcontrol).

-----------
**Example:**
```html
<v-navigation-control
  position="bottom-right"
  :show-compass="false"
/>
```
----------

## Scale Control
See [mapbox-gl Scale control](https://docs.mapbox.com/mapbox-gl-js/api/#scalecontrol).

-----------
**Example:**
```html
<v-scale-control
  position="bottom-left"
  :max-width="500"
/>
```
----------
