// utils.js
export const categoryColors = {
  catering: '#4b0082', 
  commercial: '#008080',
  production: '#00FFFF',
  office: '#931621',
  service: '#FF1493',
  multiple: '#FFFF00',
};


export const getColorForCategory = (categories) => {
  if (categories.length > 1) {
    return categoryColors.multiple;
  }
  return categoryColors[categories[0]] || 'grey';
};
