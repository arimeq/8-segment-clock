import { Field } from './field.js';
import { Dots } from './dots.js';

const generateField = color => new Field(color);
const generateDots = color => new Dots(color);
const showTime = () => (new Date()).toLocaleTimeString().replace(/:/g, '');
const numberFields = [];
const allFields = [];

export const buildClock = (anchor, color) => {
  for (let i = 1; i <= 6; i++) {
    const field = generateField(color);
    numberFields.push(field);
    allFields.push(field);
    anchor.appendChild(field.render());
    if (i === 2 || i === 4) {
      const dots = generateDots(color);
      allFields.push(dots);
      anchor.appendChild(dots.render());
    }
  }
}

export const writeClock = () => {
  if (numberFields.length < 6) {
    return;
  }
  const tStr = showTime();
  const tArr = tStr.split('');
  if (tArr[0] === '0') {
    tArr.shift();
    tArr.unshift(undefined);
  }
  tArr.forEach((num, idx) => {
    numberFields[idx].display(Number(num));
  });
};

export const switchColor = color => allFields.forEach(field => field.setColor(color));
