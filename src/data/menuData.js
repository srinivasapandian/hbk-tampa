import menuData from '../utils/menu_items_final_enhanced.json';

export const allCategories = ['ALL', ...new Set(menuData.map(item => item.category))];

export const menuGrouped = allCategories.filter(cat => cat !== 'ALL').map(category => ({
  category,
  items: menuData.filter(item => item.category === category).map(item => {
    const baseVariant = item.variants.find(v => v.type === 'base') || item.variants[0];
    const familyVariant = item.variants.find(v => v.type === 'family');
    
    return {
      id: item.id,
      name: item.name,
      description: item.description,
      price: baseVariant?.price ? `$${baseVariant.price}` : 'N/A',
      familyPrice: familyVariant?.price ? `$${familyVariant.price}` : null,
      category: item.category
    };
  })
}));
