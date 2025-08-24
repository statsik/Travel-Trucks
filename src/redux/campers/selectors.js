//export const selectAllCampers = (state) => state.campers.items;
export const selectCurrentCamper = (state) => state.campers.currentCamper;
export const selectCampersLoading = (state) => state.campers.isLoading;
export const selectCampersError = (state) => state.campers.error;
export const selectHasMoreCampers = (state) => state.campers.hasMore;
export const selectCamperById = (state, camperId) => 
  state.campers.items.find(camper => camper.id === camperId);
export const selectAllCampers = (state) => {
  const campers = state.campers.items;
  return Array.isArray(campers) ? campers : [];
};