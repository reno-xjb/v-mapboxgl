import * as mapboxgl from 'mapbox-gl';
import { noop } from '@v-mapboxgl/utils';
import { Position } from '@v-mapboxgl/types';
import { BasicControlOptions, ButtonStyle } from './types';

export default class BasicControl {
  private className: string = '';
  private style: ButtonStyle = {};
  private onClick: any = noop;

  private map: mapboxgl.Map | null = null;
  private container?: HTMLDivElement;
  private button?: HTMLButtonElement;

  constructor(options: BasicControlOptions) {
    if (options.className) {
      this.className = options.className;
    }
    if (options.style) {
      this.style = options.style;
    }
    if (options.onClick) {
      this.onClick = options.onClick;
    }
  }

  public onAdd(map: mapboxgl.Map): HTMLDivElement {
    this.map = map;

    this.container = document.createElement('div');
    this.container.className = 'mapboxgl-ctrl mapboxgl-ctrl-group';

    this.button = document.createElement('button');
    this.button.className = `mapboxgl-ctrl-icon ${this.className}`;
    this.assignButtonStyle(this.style);
    this.button.addEventListener('click', this.onClick.bind(this));

    this.container.appendChild(this.button);

    return this.container;
  }

  public assignButtonStyle(style: ButtonStyle) {
    if (!this.button) {
      return;
    }
    for (const key of Object.keys(style)) {
      (this.button.style as ButtonStyle)[key] = style[key];
    }
  }

  public onRemove() {
    if (this.container && this.container.parentNode) {
      this.container.parentNode.removeChild(this.container);
    }
    this.map = null;
  }

  public getDefaultPosition(): Position {
    return 'top-right';
  }

  public updateButtonClassName(className: string) {
    if (this.button) {
      this.button.className = `mapboxgl-ctrl-icon ${className}`;
    }
  }

  public updateButtonStyle(style: ButtonStyle) {
    if (this.button) {
      this.assignButtonStyle(style);
    }
  }
}
