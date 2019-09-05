/// <reference path="shims/shims-tsx.d.ts" />
import Vue, { VueConstructor } from 'vue';

import * as components from './components';

export * from './components';
export * from './mixins';

export interface VComponents {
  [key: string]: VueConstructor<Vue>;
}

export default {
  install(vue: VueConstructor<Vue>) {
    for (const component of Object.keys(components)) {
      vue.component(component, (components as VComponents)[component]);
    }
  },
};
