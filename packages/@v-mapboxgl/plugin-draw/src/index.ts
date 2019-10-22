import Vue, { VueConstructor } from 'vue';
import VDraw from './controls/VDraw';

export { VDraw };

function install(vue: VueConstructor<Vue>) {
  vue.component('VDraw', VDraw);
}

export default {
  install,
};

if (window !== undefined && window.hasOwnProperty('Vue')) {
  install((window as any).Vue);
}
