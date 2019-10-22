(window.webpackJsonp=window.webpackJsonp||[]).push([[28],{148:function(t,a,e){"use strict";e.r(a);var s=e(1),r=Object(s.a)({},function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[e("h1",{attrs:{id:"wrappers"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#wrappers","aria-hidden":"true"}},[t._v("#")]),t._v(" Wrappers")]),t._v(" "),e("h2",{attrs:{id:"image-loader"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#image-loader","aria-hidden":"true"}},[t._v("#")]),t._v(" Image Loader")]),t._v(" "),e("p",[t._v("This wrapper loads some images into mapbox-gl sprite to be used later as icon for Symbol Layers for example.")]),t._v(" "),e("table",[e("thead",[e("tr",[e("th",[t._v("Name")]),t._v(" "),e("th",[t._v("Description")])])]),t._v(" "),e("tbody",[e("tr",[e("td",[e("strong",[t._v("images")]),t._v(": "),e("em",[t._v("object?")]),t._v(" (default: "),e("code",[t._v("{}")]),t._v(")")]),t._v(" "),e("td",[t._v("Images to be loaded. Each key is the name of the image, each value is an object whose properties are the "),e("code",[t._v("url")]),t._v(" of the image and an optional "),e("code",[t._v("options")]),t._v(" object. The "),e("code",[t._v("options")]),t._v(" has optional "),e("code",[t._v("pixelRatio")]),t._v(" and "),e("code",[t._v("sdf")]),t._v(" properties (as described "),e("a",{attrs:{href:"https://docs.mapbox.com/mapbox-gl-js/api/#map#addimage",target:"_blank",rel:"noopener noreferrer"}},[t._v("there"),e("OutboundLink")],1),t._v(")")])])])]),t._v(" "),e("hr"),t._v(" "),e("p",[e("strong",[t._v("Example:")])]),t._v(" "),e("div",{staticClass:"language-html extra-class"},[e("pre",{pre:!0,attrs:{class:"language-html"}},[e("code",[e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("v-image-loader")]),t._v("\n  "),e("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v(":images")]),e("span",{pre:!0,attrs:{class:"token attr-value"}},[e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("=")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("{\n    'my-icon': {\n      url: '/path/to/my/icon',\n      options: {\n        pixelRatio: 0.5,\n      },\n    },\n  }"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n  "),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("\x3c!-- Here goes your sources and layers, the latter can use 'my-icon' icon ID in their layout properties --\x3e")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("v-image-loader")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n")])])]),e("hr"),t._v(" "),e("h2",{attrs:{id:"layer-wrapper"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#layer-wrapper","aria-hidden":"true"}},[t._v("#")]),t._v(" Layer Wrapper")]),t._v(" "),e("p",[t._v("This wrapper allows to define some properties that will be passed to children components.")]),t._v(" "),e("p",[t._v("It is particularly useful to isolate layers and avoiding name collision.")]),t._v(" "),e("table",[e("thead",[e("tr",[e("th",[t._v("Name")]),t._v(" "),e("th",[t._v("Description")])])]),t._v(" "),e("tbody",[e("tr",[e("td",[e("strong",[t._v("prefix")]),t._v(": "),e("em",[t._v("string?")]),t._v(" (default: "),e("code",[t._v("''")]),t._v(")")]),t._v(" "),e("td",[t._v("Prefix for source and layer IDs.")])]),t._v(" "),e("tr",[e("td",[e("strong",[t._v("metadata")]),t._v(": "),e("em",[t._v("object?")]),t._v(" (default: "),e("code",[t._v("{}")]),t._v(")")]),t._v(" "),e("td",[t._v("Specific metadata to add to layers.")])]),t._v(" "),e("tr",[e("td",[e("strong",[t._v("before")]),t._v(": "),e("em",[t._v("string?")])]),t._v(" "),e("td",[t._v("The ID of the layer before which drawing layers if not specified otherwise.")])])])]),t._v(" "),e("hr"),t._v(" "),e("p",[e("strong",[t._v("Example:")])]),t._v(" "),e("div",{staticClass:"language-html extra-class"},[e("pre",{pre:!0,attrs:{class:"language-html"}},[e("code",[e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("v-layer-wrapper")]),t._v("\n  "),e("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("prefix")]),e("span",{pre:!0,attrs:{class:"token attr-value"}},[e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("=")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("My-Awesome-Usecase"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),t._v("\n  "),e("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v(":metadata")]),e("span",{pre:!0,attrs:{class:"token attr-value"}},[e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("=")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("{\n    usecase: 'My-Awesome-Usecase',\n    status: 'prod',\n  }"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),t._v("\n  "),e("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("before")]),e("span",{pre:!0,attrs:{class:"token attr-value"}},[e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("=")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("thisLayerYouDonTDrawLayersAfter"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n  "),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("\x3c!-- Here goes your sources and layers --\x3e")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("v-layer-wrapper")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n")])])]),e("hr")])},[],!1,null,null,null);a.default=r.exports}}]);