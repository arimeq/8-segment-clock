const generateSegment = (id) => {
  const svgEl = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svgEl.setAttributeNS(null, 'width', 100);
  svgEl.setAttributeNS(null, 'height', 200);
  svgEl.setAttributeNS(null, 'version', '1.1');
  svgEl.setAttributeNS(null, 'id', id);
  svgEl.classList.add(currentColor);
  svgEl.classList.add('field');
  const createPolygon = (id, points) => {
    const poly = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
    poly.setAttributeNS(null, 'points', points);
    poly.setAttributeNS(null, 'id', id);
    poly.classList.add(currentColor);
    poly.classList.add('dim');
    return poly;
  }

  svgEl.appendChild(createPolygon('seg-lt', '10  20 20  10 30  20 30  90 20 100 10  90'));
  svgEl.appendChild(createPolygon('seg-rt', '70  20 80  10 90  20 90  90 80 100 70  90'));
  svgEl.appendChild(createPolygon('seg-lb', '10 110 20 100 30 110 30 180 20 190 10 180'));
  svgEl.appendChild(createPolygon('seg-rb', '70 110 80 100 90 110 90 180 80 190 70 180'));
  svgEl.appendChild(createPolygon('seg-t',  '20  10 30   0 70   0 80  10 70  20 30  20'));
  svgEl.appendChild(createPolygon('seg-m',  '20 100 30  90 70  90 80 100 70 110 30 110'));
  svgEl.appendChild(createPolygon('seg-b',  '20 190 30 180 70 180 80 190 70 200 30 200'));
  return svgEl;
};

const generateDots = () => {
  const svgEl = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svgEl.setAttributeNS(null, 'width', '30');
  svgEl.setAttributeNS(null, 'height', '200');
  svgEl.setAttributeNS(null, 'version', '1.1');
  svgEl.classList.add('field');
  const createRect = y => {
    const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    rect.setAttributeNS(null, 'x', '10');
    rect.setAttributeNS(null, 'y', y);
    rect.setAttributeNS(null, 'width', '10');
    rect.setAttributeNS(null, 'height', '10');
    rect.classList.add(currentColor);
    return rect;
  };
  svgEl.appendChild(createRect(75));
  svgEl.appendChild(createRect(125));
  return svgEl;
};

const getField = num => document.querySelector(`#field-${num}`);
const getSegm = (field, segm) => field.querySelector(`#seg-${segm}`);
const dim = (...segm) => [...segm].forEach(seg => seg.classList.replace('lit', 'dim'));
const lit = (...segm) => [...segm].forEach(seg => seg.classList.replace('dim', 'lit'));

const displ = (field, num) => {
  const fl = getField(field);

  const a = getSegm(fl, 't');
  const b = getSegm(fl, 'rt');
  const c = getSegm(fl, 'rb');
  const d = getSegm(fl, 'b');
  const e = getSegm(fl, 'lb');
  const f = getSegm(fl, 'lt');
  const g = getSegm(fl, 'm');

  switch (num) {
    case 1:
      lit(b, c); dim(a, d, e, f, g);
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
};

const showTime = () => (new Date()).toLocaleTimeString().replace(/:/g, '');

const writeClock = () => {
  const tStr = showTime();
  const tArr = tStr.split('');
  if (tArr[0] === '0') {
    tArr.shift();
    tArr.unshift(undefined);
  }
  tArr.forEach((num, idx) => {
    displ(++idx, Number(num));
  });
};

const switchColor = color => {
  document.querySelectorAll('svg, polygon, rect').forEach(poly => poly.classList.replace(currentColor, color));
  currentColor = color;
};
