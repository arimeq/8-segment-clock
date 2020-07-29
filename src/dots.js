export class Dots {
  constructor(color) {
    this.color = color;
    this.segments = this.render();
    return this;
  }

  createRect(y) {
    const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    rect.setAttributeNS(null, 'x', '10');
    rect.setAttributeNS(null, 'y', y);
    rect.setAttributeNS(null, 'width', '10');
    rect.setAttributeNS(null, 'height', '10');
    rect.classList.add(this.color);
    return rect;
  }

  setColor(color) {
    this.segments.forEach(dot => dot.classList.replace(this.color, color));
    this.color = color;
  }

  render() {
    if (Array.isArray(this.segments)) {
      return this.segments[0];
    }
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttributeNS(null, 'width', '30');
    svg.setAttributeNS(null, 'height', '200');
    svg.setAttributeNS(null, 'version', '1.1');
    svg.classList.add('field', this.color);
    const topDot = this.createRect(75);
    const botDot = this.createRect(125);
    svg.appendChild(topDot);
    svg.appendChild(botDot);
    return [svg, topDot, botDot];
  }
}
