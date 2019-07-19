import Vue, { VueConstructor } from 'vue';
import BasicMapboxControl from './controls/mapbox/basicControl';
import VBasicControl from './controls/VBasicControl';

export {
  BasicMapboxControl,
  VBasicControl,
};
export * from './controls/mapbox/types';

function install(vue: VueConstructor<Vue>) {
  vue.component('VBasicControl', VBasicControl);
}

export default {
  install,
};

if (window !== undefined && window.hasOwnProperty('Vue')) {
  install((window as any).Vue);
}
