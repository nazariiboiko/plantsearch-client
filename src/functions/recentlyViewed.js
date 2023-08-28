export const updateRecentlyViewed = (item) => {
    const MAX_RECENTLY_VIEWED = 15; // Maximum number of items to store
    const recentlyViewed = JSON.parse(localStorage.getItem('recentlyViewed') || '[]');
  
    // Check if the item is already in the list
    const itemIndex = recentlyViewed.findIndex((viewedItem) => viewedItem.id === item.id);
  
    if (itemIndex === -1) {
      // Add the item to the beginning of the list
      recentlyViewed.unshift(item);
  
      // Remove the oldest item if the list exceeds the maximum length
      if (recentlyViewed.length > MAX_RECENTLY_VIEWED) {
        recentlyViewed.pop();
      }
  
      // Store the updated list back in local storage
      localStorage.setItem('recentlyViewed', JSON.stringify(recentlyViewed));
    }
  };

  export const getRecentlyViewed = () => {
    return JSON.parse(localStorage.getItem('recentlyViewed') || '[]');
  }
  