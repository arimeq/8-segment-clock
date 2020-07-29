const pointsMap = new Map([
  ['a', '20  10 30   0 70   0 80  10 70  20 30  20'],
  ['b', '70  20 80  10 90  20 90  90 80 100 70  90'],
  ['c', '70 110 80 100 90 110 90 180 80 190 70 180'],
  ['d', '20 190 30 180 70 180 80 190 70 200 30 200'],
  ['e', '10 110 20 100 30 110 30 180 20 190 10 180'],
  ['f', '10  20 20  10 30  20 30  90 20 100 10  90'],
  ['g', '20 100 30  90 70  90 80 100 70 110 30 110'],
]);

const dim = (...segm) => {
  [...segm].forEach(seg => seg.classList.replace('lit', 'dim'));
};

const lit = (...segm) => {
  [...segm].forEach(seg => seg.classList.replace('dim', 'lit'));
};

export class Field {
  constructor(color) {
    this.color = color;
    this.segments = new Map();
    this.segments.set('main', this.render());
    return this;
  }

  createPolygon(points) {
    const poly = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
    poly.setAttributeNS(null, 'points', points);
    poly.classList.add(this.color);
    poly.classList.add('dim');
    return poly;
  }

  render() {
    if (this.segments.has('main')) {
      return this.segments.get('main');
    }
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttributeNS(null, 'width', 100);
    svg.setAttributeNS(null, 'height', 200);
    svg.setAttributeNS(null, 'version', '1.1');
    svg.classList.add('field', this.color);
    for (const [key, value] of pointsMap) {
      const poly = this.createPolygon(value);
      this.segments.set(key, poly)
      svg.appendChild(poly);
    }
    return svg;
  }

  setColor(color) {
    this.segments.forEach(segm => segm.classList.replace(this.color, color));
    this.color = color;
  }

  display(num) {
    const a = this.segments.get('a');
    const b = this.segments.get('b');
    const c = this.segments.get('c');
    const d = this.segments.get('d');
    const e = this.segments.get('e');
    const f = this.segments.get('f');
    const g = this.segments.get('g');

    switch (num) {
      case 1:
        dim(a, d, e, f, g); lit(b, c);
        break;
      case 2:
        dim(c, f); lit(a, b, d, e, g);
        break;
      case 3:
        dim(e, f); lit(a, b, c, d, g);
        break;
      case 4:
        dim(a, d, e); lit(b, c, f, g);
        break;
      case 5:
        dim(b, e); lit(a, c, d, f, g);
        break;
      case 6:
        dim(b); lit(a, c, d, e, f, g);
        break;
      case 7:
        dim(d, e, f, g); lit(a, b, c);
        break;
      case 8:
        lit(a, b, c, d, e, f, g);
        break;
      case 9:
        dim(e); lit(a, b, c, d, f, g);
        break;
      case 0:
        dim(g); lit(a, b, c, d, e, f);
        break;
      case Number.isNaN(num):
      default:
        dim(a, b, c, d, e, f, g);
    }
   }
}
