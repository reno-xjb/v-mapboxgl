import Vue, { VueConstructor } from 'vue';
import VMenuControl from './controls/VMenuControl.vue';

export { VMenuControl };

function install(vue: VueConstructor<Vue>) {
  vue.component('VMenuControl', VMenuControl);
}

export default {
  install,
};

if (window !== undefined && window.hasOwnProperty('Vue')) {
  install((window as any).Vue);
}
