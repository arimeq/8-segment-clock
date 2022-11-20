const colors = [];

export function addColor(color) {
  colors.push(color);
}

export const isColor = color => colors.indexOf(color) >= 0;

export const getColorFromHash = () => {
  const colorLike = location.hash.slice(1);
  if (isColor(colorLike)) {
    return colorLike;
  }
  return 'red';
};

export const reload = (colorName, colorHex) => {
  let hash = `#${colorName}`;
  if (colorHex) {
    document.documentElement.style.setProperty('--custom', colorHex);
  }
  if (!colorName) {
    const cachedColor = localStorage.getItem('color');
    const cachedColorHex = localStorage.getItem('colorHex');
    const defaultColor = cachedColor ? cachedColor : colors[0];
    hash = `#${defaultColor}`;
    if (cachedColorHex) {
      document.documentElement.style.setProperty('--custom', cachedColorHex);
    }
  } else {
    localStorage.setItem('color', colorName);
    localStorage.setItem('colorHex', colorHex);
  }
  location.replace(hash);
};
