# Wrappers

## Image Loader

This wrapper loads some images into mapbox-gl sprite to be used later as icon for Symbol Layers for example.

  | Name | Description |
  |------|-------------|
  | **images**: _object?_ (default: `{}`) | Images to be loaded. Each key is the name of the image, each value is an object whose properties are the `url` of the image and an optional `options` object. The `options` has optional `pixelRatio` and `sdf` properties (as described [there](https://docs.mapbox.com/mapbox-gl-js/api/#map#addimage)) |

------------
**Example:**
```html
<v-image-loader
  :images="{
    'my-icon': {
      url: '/path/to/my/icon',
      options: {
        pixelRatio: 0.5,
      },
    },
  }"
>
  <!-- Here goes your sources and layers, the latter can use 'my-icon' icon ID in their layout properties -->
</v-image-loader>
```
------------

## Layer Wrapper

This wrapper allows to define some properties that will be passed to children components.

It is particularly useful to isolate layers and avoiding name collision.

  | Name | Description |
  |------|-------------|
  | **prefix**: _string?_ (default: `''`) | Prefix for source and layer IDs. |
  | **metadata**: _object?_ (default: `{}`) | Specific metadata to add to layers. |
  | **before**: _string?_ | The ID of the layer before which drawing layers if not specified otherwise. |

------------
**Example:**
```html
<v-layer-wrapper
  prefix="My-Awesome-Usecase"
  :metadata="{
    usecase: 'My-Awesome-Usecase',
    status: 'prod',
  }"
  before="thisLayerYouDonTDrawLayersAfter"
>
  <!-- Here goes your sources and layers -->
</v-layer-wrapper>
```
------------
