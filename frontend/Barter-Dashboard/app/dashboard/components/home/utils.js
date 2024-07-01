// utils.js
export const categoryColors = {
  catering: 'red',
  commercial: 'blue',
  production: 'green',
  office: 'purple',
  service: 'yellow',
  multiple: 'orange',
};


export const getColorForCategory = (categories) => {
  if (categories.length > 1) {
    return categoryColors.multiple;
  }
  return categoryColors[categories[0]] || 'grey';
};
