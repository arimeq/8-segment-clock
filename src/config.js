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

export const reload = color => {
  let hash = `#${color}`;
  if (!color) {
    const cachedColor = localStorage.getItem('color');
    const defaultColor = cachedColor ? cachedColor : colors[0];
    hash = `#${defaultColor}`;
  } else {
    localStorage.setItem('color', color);
  }
  location.replace(hash);
};
