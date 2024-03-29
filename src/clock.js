import { generateField } from './field.js';
import { generateDots } from './dots.js';

const timeFormatRe = /(\d)(?=(\d{2})+(?!\d))/g;
const formatTime = time => time.replace(timeFormatRe, '$1:');
const numberFields = [];
const allFields = [];
let lastTime = '';
let formattedTime = formatTime(lastTime);

export const buildClock = (anchor, color, runner) => {
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
  if (typeof runner === 'function') {
    runner();
  }
}

export const writeClock = (tStr) => {
  if (numberFields.length < 6) {
    return;
  }
  if (tStr === lastTime) {
    return formattedTime;
  }
  lastTime = tStr;
  formattedTime = formatTime(lastTime);
  const tArr = tStr.split('');
  if (tArr[0] === '0') {
    tArr.shift();
    tArr.unshift(undefined);
  }
  while (tArr.length < 6) {
    tArr.unshift(undefined);
  }
  tArr.forEach((num, idx) => {
    const field = numberFields[idx];
    if (!field || typeof field.display !== 'function') {
      return;
    }
    field.display(Number(num));
  });
  return formattedTime;
};

export const switchColor = color => allFields.forEach(field => field.setColor(color));
