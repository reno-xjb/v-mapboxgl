import Vue, { VueConstructor } from 'vue';

import VClusterLayer from './layers/VClusterLayer.vue';

export {
  VClusterLayer,
};

function install(vue: VueConstructor<Vue>) {
  vue.component('VClusterLayer', VClusterLayer);
}

export default {
  install,
};

if (window !== undefined && window.hasOwnProperty('Vue')) {
  install((window as any).Vue);
}
