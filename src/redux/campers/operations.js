// redux/campers/operations.js
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
    
    // Получаем ВСЕ данные с MockAPI
    const response = await axios.get(API_URL);
    console.log('Full API response:', response.data);
    
    // Извлекаем массив кемперов из response.data.items
    let allCampers = [];
    if (response.data && Array.isArray(response.data.items)) {
      allCampers = response.data.items;
    } else if (Array.isArray(response.data)) {
      allCampers = response.data;
    }
    
    console.log('All campers from API:', allCampers);
    
    // ФИЛЬТРАЦИЯ НА КЛИЕНТЕ
    let filteredCampers = [...allCampers];
    
    // Фильтр по локации
    if (filters.location && filters.location.trim() !== '') {
      filteredCampers = filteredCampers.filter(camper => 
        camper.location && camper.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }
    
    // Фильтр по типу транспортного средства
    if (filters.vehicleType && filters.vehicleType.trim() !== '') {
      filteredCampers = filteredCampers.filter(camper => 
        camper.form && camper.form.toLowerCase() === filters.vehicleType.toLowerCase()
      );
    }
    
    // Фильтр по оборудованию
    if (filters.equipment && filters.equipment.length > 0) {
      filteredCampers = filteredCampers.filter(camper => {
        return filters.equipment.every(equip => {
          const equipmentKey = equip.toLowerCase();
          // Проверяем разные возможные названия полей
          return (
            (equipmentKey === 'ac' && camper.AC === true) ||
            (equipmentKey === 'automatic' && camper.transmission === 'automatic') ||
            (equipmentKey === 'kitchen' && camper.kitchen === true) ||
            (equipmentKey === 'tv' && camper.TV === true) ||
            (equipmentKey === 'bathroom' && camper.bathroom === true) ||
            (equipmentKey === 'refrigerator' && camper.refrigerator === true) ||
            (equipmentKey === 'microwave' && camper.microwave === true) ||
            (equipmentKey === 'gas' && camper.gas === true) ||
            (equipmentKey === 'water' && camper.water === true)
          );
        });
      });
    }
    
    console.log('Filtered campers:', filteredCampers);
    
    // ПАГИНАЦИЯ
    const page = filters.page || 1;
    const limit = filters.limit || 4;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedCampers = filteredCampers.slice(startIndex, endIndex);
    
    console.log('Paginated campers:', paginatedCampers);
    
    if (page > 1) {
      dispatch(addCampers(paginatedCampers));
    } else {
      dispatch(setCampers(paginatedCampers));
    }
    
    // Проверяем, есть ли еще данные для загрузки
    dispatch(setHasMore(endIndex < filteredCampers.length));
    
  } catch (error) {
    console.error('API Error:', error);
    dispatch(setError('Failed to load campers. Please try again later.'));
    dispatch(setCampers([]));
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