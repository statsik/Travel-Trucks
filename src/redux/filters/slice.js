import { createSlice } from '@reduxjs/toolkit';

const filtersSlice = createSlice({
  name: 'filters',
  initialState: {
    location: '',
    vehicleType: '',
    equipment: [],
    page: 1,
    limit: 4,
  },
  reducers: {
    setLocation: (state, action) => {
      state.location = action.payload;
      state.page = 1;
    },
    setVehicleType: (state, action) => {
      state.vehicleType = action.payload;
      state.page = 1;
    },
    setEquipment: (state, action) => {
      state.equipment = action.payload;
      state.page = 1;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
    resetFilters: (state) => {
      state.location = '';
      state.vehicleType = '';
      state.equipment = [];
      state.page = 1;
    },
  },
});

export const { setLocation, setVehicleType, setEquipment, setPage, resetFilters } = filtersSlice.actions;
export default filtersSlice.reducer;