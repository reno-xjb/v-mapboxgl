import Vue, { VueConstructor } from 'vue';

import VArrowLineLayer from './layers/VArrowLineLayer.vue';

export {
  VArrowLineLayer,
};

function install(vue: VueConstructor<Vue>) {
  vue.component('VArrowLineLayer', VArrowLineLayer);
}

export default {
  install,
};

if (window !== undefined && window.hasOwnProperty('Vue')) {
  install((window as any).Vue);
}
