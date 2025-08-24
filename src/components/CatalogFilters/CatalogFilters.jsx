import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './CatalogFilters.module.css';
import { setLocation, setVehicleType, setEquipment } from '../../redux/filters/slice';
import { fetchCampers } from '../../redux/campers/operations';
import { selectAllFilters } from '../../redux/filters/selectors';

const CatalogFilters = () => {
    const dispatch = useDispatch();
    const filters = useSelector(selectAllFilters);
    const [localFilters, setLocalFilters] = useState({
        location: filters.location,
        vehicleType: filters.vehicleType,
        equipment: filters.equipment
    });

    const equipmentOptions = [
        { name: 'AC', iconId: 'icon-wind' }, 
        { name: 'automatic', iconId: 'icon-diagram'},
        { name: 'Kitchen', iconId: 'icon-cup-hot' }, 
        { name: 'TV', iconId: 'icon-tv' }, 
        { name: 'Bathroom', iconId: 'icon-ph_shower' }
    ];
    const typeOptions = [
        { name: 'Van', iconId: 'icon-bi_grid-1x2' }, 
        { name: 'Fully Integrated', iconId: 'icon-bi_grid' },
        { name: 'Alcove', iconId: 'icon-bi_grid-3x3-gap' },  
    ]
    const handleEquipmentChange = (equipment) => {
        const newEquipment = localFilters.equipment.includes(equipment)
            ? localFilters.equipment.filter(item => item !== equipment)
            : [...localFilters.equipment, equipment];
        
        setLocalFilters(prev => ({ ...prev, equipment: newEquipment }));
    };

    const handleSearch = () => {
        dispatch(setLocation(localFilters.location));
        dispatch(setVehicleType(localFilters.vehicleType));
        dispatch(setEquipment(localFilters.equipment));
        dispatch(fetchCampers({ 
            location: localFilters.location,
            vehicleType: localFilters.vehicleType,
            equipment: localFilters.equipment
        }));
    };

    return (
        <div className={styles.filters}>
            <div className={styles.filterGroupLocation}>
                <p className={styles.title}>Location</p>
                <input
                    type="text"
                    placeholder="Enter location"
                    value={localFilters.location}
                    onChange={(e) => setLocalFilters(prev => ({ ...prev, location: e.target.value }))}
                    className={styles.input}
                />
            </div>

            <div className={styles.filterGroupEquipment}>
                <p className={styles.title}>Filters</p>
                <p className={styles.titleve}>Vehicle equipment</p>
                <hr />
                <div className={styles.equipmentButtons}>
                    {equipmentOptions.map(({ name, iconId }) => (
                        <button
                            key={name}
                            type="button"
                            className={`${styles.equipmentButton} ${
                                localFilters.equipment.includes(name) ? styles.equipmentButtonActive : ''
                            }`}
                            onClick={() => handleEquipmentChange(name)}
                        >
                            <svg className={styles.equipmentIcon}>
                                <use href={`/icons.svg#${iconId}`} />
                            </svg>
                            {name}
                        </button>
                    ))}
                </div>
            </div>

            <div className={styles.filterGroup}>
                <p className={styles.titleve}>Vehicle Type</p>
                <hr />
                <div className={styles.typeButtons}>
                    {typeOptions.map(({ name, iconId }) => (
                        <button
                            key={name}
                            type="button"
                            className={`${styles.typeButton} ${
                                localFilters.vehicleType === name.toLowerCase() ? styles.typeButtonActive : ''
                            }`}
                            onClick={() => setLocalFilters(prev => ({ 
                                ...prev, 
                                vehicleType: name.toLowerCase() 
                            }))}
                        >
                            <svg className={styles.typeIcon}>
                                <use href={`/icons.svg#${iconId}`} />
                            </svg>
                            <span>{name}</span>
                        </button>
                    ))}
                </div>
            </div>
            <button onClick={handleSearch} className={styles.searchBtn}>
                Search
            </button>
        </div>
    );
}

export default CatalogFilters;