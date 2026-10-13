const SVG_NS = 'http://www.w3.org/2000/svg';

/**
 * Common ancestor of everything the clock is built from (digit fields, dots).
 * It owns the <svg> and keeps the color class of the svg and its shapes in sync.
 *
 * Extending SVGElement itself is not an option: SVG elements can't be
 * constructed with `new` and custom elements exist only for HTML.
 */
export class DisplayElement {
  constructor(color) {
    this.color = color;
    this.svg = null;
    this.shapes = [];
  }

  createSvg(width, height) {
    const svg = document.createElementNS(SVG_NS, 'svg');
    svg.setAttributeNS(null, 'width', width);
    svg.setAttributeNS(null, 'height', height);
    svg.setAttributeNS(null, 'version', '1.1');
    svg.classList.add('field', this.color);
    return svg;
  }

  createShape(tag, attributes) {
    const shape = document.createElementNS(SVG_NS, tag);
    Object.entries(attributes).forEach(([name, value]) => shape.setAttributeNS(null, name, value));
    shape.classList.add(this.color);
    this.shapes.push(shape);
    return shape;
  }

  /** Builds the <svg>; implemented by subclasses */
  build() {
    throw new Error('not implemented');
  }

  render() {
    if (!this.svg) {
      this.svg = this.build();
    }
    return this.svg;
  }

  setColor(color) {
    [this.render(), ...this.shapes].forEach(el => el.classList.replace(this.color, color));
    this.color = color;
  }
}
