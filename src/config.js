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

export const reload = (color = colors[0]) => location.replace(`#${color}`);
