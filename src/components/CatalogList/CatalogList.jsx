import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import styles from './CatalogList.module.css';
import { addToFavorites, removeFromFavorites } from '../../redux/favorites/slice';
import { selectAllCampers, selectCampersLoading } from '../../redux/campers/selectors';
import { selectAllFavorites } from '../../redux/favorites/selectors';

const CatalogList = () => {
  const dispatch = useDispatch();
  const campers = useSelector(selectAllCampers);
  const favorites = useSelector(selectAllFavorites);
  const loading = useSelector(selectCampersLoading);

  const isFavorite = (id) => favorites.some(f => f.id === id);

  const handleFavoriteToggle = (camper, e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isFavorite(camper.id)) {
      dispatch(removeFromFavorites(camper.id));
    } else {
      dispatch(addToFavorites(camper));
    }
  };

  const formatPrice = (price) => (typeof price === 'number' ? price.toFixed(2) : '0.00');

  if (loading) return <div className={styles.loading}>Loading campers...</div>;
    if (!campers.length) return <div className={styles.empty}>No campers found.</div>;
    
  return (
    <div className={styles.list}>
      {campers.map(camper => (
        <div key={camper.id} className={styles.card}>
            <img
              src={camper.gallery?.[0]?.original || ''}
              alt={camper.name}
              className={styles.image}
            />

          <div className={styles.content}>
            <div className={styles.header}>
                <h3 className={styles.name}>{camper.name}</h3>
                <div className={styles.priceButtonWrapper}>
                    <p className={styles.price}>${formatPrice(camper.price)}/day</p>
                    <button onClick={(e) => handleFavoriteToggle(camper, e)} className={`${styles.favoriteBtn} ${isFavorite(camper.id) ? styles.favoriteActive : ''}`} aria-label="Toggle favorite">
                        <svg className={styles.favoriteIcon} viewBox="0 0 37 32" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M18.286 11.968l-2.043-4.089c-0.507-1.013-1.387-2.469-2.633-3.646-1.225-1.159-2.693-1.947-4.466-1.947-3.831 0-6.857 3.031-6.857 6.674 0 2.768 1.266 4.722 4.27 7.703 0.77 0.763 1.648 1.589 2.619 2.498 2.533 2.377 5.682 5.335 9.111 9.289 3.429-3.954 6.578-6.912 9.111-9.289 0.971-0.91 1.851-1.737 2.619-2.498 3.003-2.981 4.27-4.935 4.27-7.703 0-3.643-3.026-6.674-6.857-6.674-1.776 0-3.241 0.789-4.466 1.947-1.246 1.177-2.126 2.633-2.633 3.646l-2.043 4.089zM19.182 30.921c-0.11 0.13-0.247 0.235-0.402 0.307s-0.323 0.109-0.494 0.109-0.339-0.037-0.494-0.109c-0.155-0.072-0.292-0.177-0.402-0.307-3.659-4.347-6.971-7.456-9.698-10.014-4.72-4.432-7.691-7.218-7.691-11.947 0-4.949 4.091-8.96 9.143-8.96 3.657 0 6.215 2.4 7.781 4.59 0.594 0.834 1.047 1.637 1.362 2.267 0.396-0.789 0.851-1.547 1.362-2.267 1.566-2.192 4.123-4.59 7.781-4.59 5.051 0 9.143 4.011 9.143 8.96 0 4.729-2.971 7.515-7.691 11.947-2.727 2.56-6.039 5.671-9.698 10.014z"
                                fill={isFavorite(camper.id) ? "red" : "black"}
                                strokeWidth="1"
                            />
                        </svg>
                    </button>     
                </div>
            </div>
            <div className={styles.locationWrapper}>
                <svg className={styles.favoriteIcon}>
                    <use href={`/public/images/icons/LocationIcon.svg`} />
                </svg>
                <p className={styles.location}>{camper.location}</p>
            </div>
            <p className={styles.imageCaption}>{camper.description}</p>
            <div className={styles.features}>
                {[
                    { key: 'AC', label: 'AC', icon: 'icon-wind' },
                    { key: 'kitchen', label: 'Kitchen', icon: 'icon-cup-hot' },
                    { key: 'TV', label: 'TV', icon: 'icon-tv' },
                    { key: 'bathroom', label: 'Bathroom', icon: 'icon-ph_shower' },
                    { key: 'refrigerator', label: 'Refrigerator', icon: 'icon-solar_fridge-outline' },
                    { key: 'microwave', label: 'Microwave', icon: 'icon-lucide_microwave' },
                    { key: 'gas', label: 'Gas', icon: 'icon-hugeicons_gas-stove' },
                    { key: 'water', label: 'Water', icon: 'icon-ion_water-outline' },
                ]
                .filter(feature => camper[feature.key]) 
                .map(feature => (
                    <div key={feature.key} className={styles.featureType}>
                        <svg className={styles.featureIcon}>
                            <use href={`/icons.svg#${feature.icon}`} />
                        </svg>
                        <span className={styles.featureLabel}>{feature.label}</span>
                    </div>
                ))}
            </div>

            <Link to={`/campers/${camper.id}`} className={styles.detailsBtn}>
              Show more
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CatalogList;
