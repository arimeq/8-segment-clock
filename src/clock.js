import { generateField } from './field.js';
import { generateDots } from './dots.js';

const timeFormatRe = /(\d)(?=(\d{2})+(?!\d))/g;
const formatTime = time => time.replace(timeFormatRe, '$1:');

/**
 * The display: pairs of digit fields separated by dots,
 * HH:MM:SS or HH:MM when seconds are hidden.
 */
export class Clock {
  constructor(anchor, color, { showSeconds = true } = {}) {
    this.anchor = anchor;
    this.color = color;
    this.showSeconds = showSeconds;
    this.build();
  }

  get digits() {
    return this.showSeconds ? 6 : 4;
  }

  build() {
    this.numberFields = [];
    this.dots = [];
    this.lastTime = null;
    this.formattedTime = '';
    this.anchor.replaceChildren();
    for (let i = 1; i <= this.digits; i++) {
      const field = generateField(this.color);
      this.numberFields.push(field);
      this.anchor.appendChild(field.render());
      if (i % 2 === 0 && i < this.digits) {
        const dots = generateDots(this.color);
        this.dots.push(dots);
        this.anchor.appendChild(dots.render());
      }
    }
  }

  setShowSeconds(showSeconds) {
    if (showSeconds !== this.showSeconds) {
      this.showSeconds = showSeconds;
      this.build();
    }
  }

  setColor(color) {
    [...this.numberFields, ...this.dots].forEach(field => field.setColor(color));
    this.color = color;
  }

  setDotsLit(lit) {
    this.dots.forEach(dots => dots.setLit(lit));
  }

  /**
   * Shows a string of digits, right-aligned; a leading zero is left blank.
   * Returns the time formatted with colons.
   */
  write(tStr) {
    if (tStr === this.lastTime) {
      return this.formattedTime;
    }
    this.lastTime = tStr;
    this.formattedTime = formatTime(tStr);
    const tArr = tStr.split('');
    if (tArr[0] === '0') {
      tArr.shift();
      tArr.unshift(undefined);
    }
    while (tArr.length < this.digits) {
      tArr.unshift(undefined);
    }
    tArr.forEach((num, idx) => {
      const field = this.numberFields[idx];
      if (field) {
        field.display(Number(num));
      }
    });
    return this.formattedTime;
  }
}
