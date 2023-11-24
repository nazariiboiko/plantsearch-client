export const updateRecentlyViewed = (item) => {
    const MAX_RECENTLY_VIEWED = 15; // Maximum number of items to store
    const recentlyViewed = JSON.parse(localStorage.getItem('recentlyViewed') || '[]');
    const itemIndex = recentlyViewed.findIndex((viewedItem) => viewedItem.id === item.id);
  
    if (itemIndex === -1) {
      recentlyViewed.unshift(item);
  
      if (recentlyViewed.length > MAX_RECENTLY_VIEWED) {
        recentlyViewed.pop();
      }

      localStorage.setItem('recentlyViewed', JSON.stringify(recentlyViewed));
    }
  };

  export const getRecentlyViewed = () => {
    return JSON.parse(localStorage.getItem('recentlyViewed') || '[]');
  }
  