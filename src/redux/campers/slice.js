import { createSlice } from '@reduxjs/toolkit';

const campersSlice = createSlice({
  name: 'campers',
  initialState: {
    items: [],
    currentCamper: null,
    isLoading: false,
    error: null,
    hasMore: true,
  },
  reducers: {
    setCampers: (state, action) => {
      state.items = action.payload;
    },
    addCampers: (state, action) => {
      state.items = [...state.items, ...action.payload];
    },
    setCurrentCamper: (state, action) => {
      state.currentCamper = action.payload;
    },
    clearCampers: (state) => {
      state.items = [];
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    setHasMore: (state, action) => {
      state.hasMore = action.payload;
    },
  },
});

export const { 
  setCampers, 
  addCampers, 
  setCurrentCamper, 
  clearCampers, 
  setLoading, 
  setError, 
  clearError, 
  setHasMore 
} = campersSlice.actions;
export default campersSlice.reducer;