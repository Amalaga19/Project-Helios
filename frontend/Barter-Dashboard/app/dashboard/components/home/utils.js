// utils.js
export const categoryColors = {
  catering: 'Coral',
  commercial: 'MediumAquamarine',
  production: 'RoyalBlue',
  office: 'DeepPink',
  service: 'indigo',
  multiple: 'orange', // For businesses with multiple categories
};

export const getColorForCategory = (categories) => {
  if (categories.length > 1) {
    return categoryColors.multiple;
  }
  return categoryColors[categories[0]] || 'grey';
};
