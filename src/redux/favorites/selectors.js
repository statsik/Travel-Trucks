export const selectAllFavorites = (state) => state.favorites.items;
export const selectIsFavorite = (state, camperId) => 
state.favorites.items.some(item => item.id === camperId);
export const selectFavoritesCount = (state) => state.favorites.items.length;