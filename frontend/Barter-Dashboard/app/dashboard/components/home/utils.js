// utils.js
export const categoryColors = {
  restaurant: 'red',
  cafe: 'blue',
  store: 'green',
  office: 'yellow',
  service: 'purple',
  multicolored: 'orange', // For businesses with multiple categories
};

export const getColorForCategory = (categories) => {
  if (categories.length === 1) {
    return categoryColors[categories[0]] || 'grey';
  }
  return categoryColors.multicolored;
};
