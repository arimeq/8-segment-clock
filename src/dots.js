import { DisplayElement } from './display-element.js';

export class Dots extends DisplayElement {
  build() {
    const svg = this.createSvg(30, 200);
    svg.classList.add('dots');
    svg.appendChild(this.createShape('circle', { cx: 15, cy: 80, r: 8 }));
    svg.appendChild(this.createShape('circle', { cx: 15, cy: 130, r: 8 }));
    return svg;
  }

  setLit(lit) {
    this.render().classList.toggle('off', !lit);
  }
}

export const generateDots = color => new Dots(color);
