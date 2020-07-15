import { Field } from './segment.js';

const generateField = color => new Field(color);

const generateDots = (color) => {
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
    rect.classList.add(color);
    return rect;
  };
  svgEl.appendChild(createRect(75));
  svgEl.appendChild(createRect(125));
  return svgEl;
};

const showTime = () => (new Date()).toLocaleTimeString().replace(/:/g, '');
const clockFields = [];

export const buildClock = (anchor, color) => {
  for (let i = 1; i <= 6; i++) {
    const field = generateField(color);
    clockFields.push(field);
    anchor.appendChild(field.render());
    if (i === 2 || i === 4) {
      anchor.appendChild(generateDots(color));
    }
  }
}

export const writeClock = () => {
  if (clockFields.length < 6) {
    return;
  }
  const tStr = showTime();
  const tArr = tStr.split('');
  if (tArr[0] === '0') {
    tArr.shift();
    tArr.unshift(undefined);
  }
  tArr.forEach((num, idx) => {
    clockFields[idx].display(Number(num));
  });
};
