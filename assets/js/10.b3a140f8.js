(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{71:function(e,t,o){"use strict";o.r(t);var a={data:()=>({data:{type:"FeatureCollection",features:[{type:"Feature",geometry:{type:"Polygon",coordinates:[[[-121.353637,40.584978],[-121.284551,40.584758],[-121.275349,40.541646],[-121.246768,40.541017],[-121.251343,40.423383],[-121.32687,40.423768],[-121.360619,40.43479],[-121.363694,40.409124],[-121.439713,40.409197],[-121.439711,40.423791],[-121.572133,40.423548],[-121.577415,40.550766],[-121.539486,40.558107],[-121.520284,40.572459],[-121.487219,40.550822],[-121.446951,40.56319],[-121.370644,40.563267],[-121.353637,40.584978]]]}},{type:"Feature",geometry:{type:"Point",coordinates:[-121.415061,40.506229]},properties:{label:"Awesome Place"}},{type:"Feature",geometry:{type:"Point",coordinates:[-121.505184,40.488084]},properties:{label:"Wonderful Place"}},{type:"Feature",geometry:{type:"Point",coordinates:[-121.354465,40.488737]},properties:{label:"Fantastic Place"}}]}})},r=o(1),i=Object(r.a)(a,function(){var e=this.$createElement,t=this._self._c||e;return t("v-map",{attrs:{"access-token":this.$mapbox.token,"map-style":"mapbox://styles/mapbox/outdoors-v11",center:[-121.403732,40.492392],zoom:10}},[t("v-geojson-source",{attrs:{"source-id":"parks",data:this.data}},[t("v-fill-layer",{attrs:{"layer-id":"shapes",paint:{"fill-color":"#888888","fill-opacity":.4},filter:["!=","$type","Point"],",":""}}),this._v(" "),t("v-circle-layer",{attrs:{"layer-id":"points",paint:{"circle-color":"#b42222","circle-radius":6},filter:["==","$type","Point"],",":""}}),this._v(" "),t("v-line-layer",{attrs:{"layer-id":"border",paint:{"line-color":"#888888","line-width":4},filter:["!=","$type","Point"],",":""}}),this._v(" "),t("v-symbol-layer",{attrs:{"layer-id":"symbol",layout:{"icon-image":"marker-15","icon-anchor":"center","text-field":"{label}","text-size":12,"text-anchor":"bottom"},filter:["==","$type","Point"],",":""}})],1)],1)},[],!1,null,null,null);t.default=i.exports}}]);