import axios from 'axios';
import { 
  setCampers, 
  addCampers, 
  setCurrentCamper, 
  setLoading, 
  setError, 
  clearError, 
  setHasMore 
} from './slice';

const API_URL = 'https://66b1f8e71ca8ad33d4f5f63e.mockapi.io/campers';

export const fetchCampers = (filters = {}) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    dispatch(clearError());

    console.log('Fetching campers with filters:', filters);

    const response = await axios.get(API_URL);
    console.log('Full API response:', response.data);

    let allCampers = [];
    if (response.data && Array.isArray(response.data.items)) {
      allCampers = response.data.items;
    } else if (Array.isArray(response.data)) {
      allCampers = response.data;
    }

    console.log('All campers from API:', allCampers);

    let filteredCampers = [...allCampers];

    if (filters.location && filters.location.trim()) {
      filteredCampers = filteredCampers.filter(c =>
        c.location?.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    if (filters.vehicleType && filters.vehicleType.trim()) {
      filteredCampers = filteredCampers.filter(c =>
        c.form?.toLowerCase() === filters.vehicleType.toLowerCase()
      );
    }

    if (filters.equipment && filters.equipment.length > 0) {
      filteredCampers = filteredCampers.filter(c =>
        filters.equipment.every(equip => {
          const key = equip.toLowerCase();
          return (
            (key === 'ac' && c.AC) ||
            (key === 'automatic' && c.transmission === 'automatic') ||
            (key === 'kitchen' && c.kitchen) ||
            (key === 'tv' && c.TV) ||
            (key === 'bathroom' && c.bathroom) ||
            (key === 'refrigerator' && c.refrigerator) ||
            (key === 'microwave' && c.microwave) ||
            (key === 'gas' && c.gas) ||
            (key === 'water' && c.water)
          );
        })
      );
    }

    console.log('Filtered campers:', filteredCampers);

    const page = filters.page || 1;
    const limit = filters.limit || 4;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedCampers = filteredCampers.slice(startIndex, endIndex);

    console.log('Paginated campers:', paginatedCampers);

    if (page > 1) {
      const existingIds = new Set(filteredCampers.slice(0, startIndex).map(c => c.id));
      const newCampers = paginatedCampers.filter(c => !existingIds.has(c.id));
      dispatch(addCampers(newCampers));
    } else {
      dispatch(setCampers(paginatedCampers));
    }

    dispatch(setHasMore(endIndex < filteredCampers.length));
  } catch (error) {
    console.error('API Error:', error);
    dispatch(setError('Failed to load campers. Please try again later.'));
    dispatch(setCampers([]));
    dispatch(setHasMore(false));
  } finally {
    dispatch(setLoading(false));
  }
};

export const fetchCamperById = (id) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    dispatch(clearError());

    const response = await axios.get(`${API_URL}/${id}`);
    console.log('Camper by ID response:', response.data);

    const camperData = response.data.items || response.data;
    dispatch(setCurrentCamper(camperData));
  } catch (error) {
    console.error('API Error:', error);
    dispatch(setError('Failed to load camper details. Please try again later.'));
  } finally {
    dispatch(setLoading(false));
  }
};
