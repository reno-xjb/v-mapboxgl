# Map

The `v-map` component corresponds to the [mapbox-gl Map object](https://docs.mapbox.com/mapbox-gl-js/api/#map). It is the component that draws the map on your page. The following components will not render anything if this one is not their common ancestor.

## API

* _**Properties**_

  Only the following parameters of the original mapbox-gl component have been implemented into properties:

  <!--TODO import code snippet when vuepress deals with sections of code -->

  ```typescript
  @Prop({ type: [String, Object], default: 'container' })
  private container!: string | HTMLElement;
  @Prop({ type: String, required: true })
  private accessToken!: string;
  @Prop({ type: Number, validator: zoomValidator })
  private minZoom?: number;
  @Prop({ type: Number, validator: zoomValidator })
  private maxZoom?: number;
  @Prop({ type: [String, Object] })
  private mapStyle?: string | mapboxgl.Style;
  // hash
  // interactive
  // bearingSnap
  // pitchWithRotate
  // clickTolerance
  @Prop(Boolean)
  private attributionControl?: boolean;
  @Prop([String, Array])
  private customAttribution?: string | string[];
  @Prop(String)
  private logoPosition?: Corner;
  // failIfMajorPerformanceCaveat
  // preserveDrawingBuffer
  // refreshExpiredTiles
  // maxBounds
  // scrollZoom
  // boxZoom
  // dragRotate
  // dragPan
  // keyboard
  // doubleClickZoom
  // touchZoomRotate
  // trackResize
  @Prop([Object, Array])
  private center?: mapboxgl.LngLatLike;
  @Prop({ type: Number, validator: zoomValidator })
  private zoom?: number;
  // bearing
  // pitch
  // renderWorldCopies
  // maxTileCacheSize
  // localIdeographFontFamily
  // transformRequest
  // collectResourceTiming
  // fadeDuration
  // crossSourceCollisions
  ```

* _**Events**_

  All mapbox-gl events are re-emitted as is, with an additional key `map` holding the mapbox-gl map instance, in case of need.

-------------
**Example:**
```html
<v-map
  access-token="MAPBOX_ACCESS_TOKEN"
  map-style="mapbox://styles/mapbox/light-v9"
  :center="[43.1, 1.63]"
  :zoom="12"
  logo-position="bottom-left"
  :attribution-control="true"
  @load="(event) => {
    // Map is loaded, do something
  }"
  @error="(event) => {
    // Deal with the error
  }"
>
  <!-- Here goes the controls, sources, layers,... -->
</v-map>
```
-------------
