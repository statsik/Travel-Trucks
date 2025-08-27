import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styles from './CamperDetailsPage.module.css';
import Container from '../../components/Container/Container';
import { fetchCamperById } from '../../redux/campers/operations';
import { selectCurrentCamper, selectCampersLoading, selectCampersError } from '../../redux/campers/selectors';
import BookingForm from '../../components/BookingForm/BookingForm';

const CamperDetailsPage = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const currentCamper = useSelector(selectCurrentCamper);
    const loading = useSelector(selectCampersLoading);
    const error = useSelector(selectCampersError);
    const [activeTab, setActiveTab] = useState('features');

    useEffect(() => {
        if (id) {
            dispatch(fetchCamperById(id));
        }
    }, [dispatch, id]);

    if (loading) return <div className={styles.loading}>Loading camper details...</div>;
    if (error) return <div className={styles.error}>Error: {error}</div>;
    if (!currentCamper) return <div className={styles.notFound}>Camper not found</div>;

    const formatPrice = (price) => {
        return typeof price === 'number' ? price.toFixed(2) : '0.00';
    };

    const calculateRating = () => {
        if (!currentCamper.reviews || currentCamper.reviews.length === 0) return 0;
        const total = currentCamper.reviews.reduce((sum, review) => sum + review.reviewer_rating, 0);
        return (total / currentCamper.reviews.length).toFixed(1);
    };

    const renderStars = (rating) => {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;
        const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
        
        return (
            <>
                {'★'.repeat(fullStars)}
                {'☆'.repeat(emptyStars)}
            </>
        );
    };

    const averageRating = calculateRating();

    const getFeatureIcon = (featureKey) => {
        const icons = {
            AC: 'icon-wind',
            automatic: 'icon-diagram',
            kitchen: 'icon-cup-hot',
            TV: 'icon-tv',
            bathroom: 'icon-ph_shower',
            radio: 'icon-radio',
            refrigerator: 'icon-solar_fridge-outline',
            microwave: 'icon-lucide_microwave',
            gas: 'icon-hugeicons_gas-stove',
            water: 'icon-ion_water-outline'
        };
        return icons[featureKey] || 'icon-question';
    };

    const getFeaturesWithIcons = () => {
        return [
            { key: 'AC', label: 'AC', value: currentCamper.AC },
            { key: 'automatic', label: 'Automatic', value: currentCamper.transmission === 'automatic' },
            { key: 'kitchen', label: 'Kitchen', value: currentCamper.kitchen },
            { key: 'TV', label: 'TV', value: currentCamper.TV },
            { key: 'bathroom', label: 'Bathroom', value: currentCamper.bathroom },
            { key: 'radio', label: 'Radio', value: currentCamper.radio },
            { key: 'refrigerator', label: 'Refrigerator', value: currentCamper.refrigerator },
            { key: 'microwave', label: 'Microwave', value: currentCamper.microwave },
            { key: 'gas', label: 'Gas', value: currentCamper.gas },
            { key: 'water', label: 'Water', value: currentCamper.water },
        ].filter(feature => feature.value);
    };

    return (
        <main className={styles.details}>
            <Container>
                <div className={styles.wrapper}>
                    <div className={styles.content}>
                        <h2 className={styles.title}>{currentCamper.name}</h2>
                        
                        <div className={styles.ratingLocation}>
                            <div className={styles.rating}>
                                <span className={styles.stars}>
                                    {renderStars(averageRating)}
                                </span>
                                <span className={styles.ratingText}>
                                    {averageRating}({currentCamper.reviews?.length || 0} Reviews)
                                </span>
                            </div>
                            <p className={styles.location}>{currentCamper.location}</p>
                        </div>

                        <p className={styles.price}>${formatPrice(currentCamper.price)}/day</p>

                        <div className={styles.gallery}>
                            {currentCamper.gallery?.map((image, index) => (
                                <img 
                                    key={index} 
                                    src={image.original || image} 
                                    alt={`${currentCamper.name} ${index + 1}`} 
                                    className={styles.galleryImage} 
                                />
                            ))}
                        </div>

                        <div className={styles.description}>
                            <p>{currentCamper.description}</p>
                        </div>

                        <div className={styles.tabs}>
                            <button 
                                className={`${styles.tab} ${activeTab === 'features' ? styles.tabActive : ''}`}
                                onClick={() => setActiveTab('features')}
                            >
                                Features
                            </button>
                            <button 
                                className={`${styles.tab} ${activeTab === 'reviews' ? styles.tabActive : ''}`}
                                onClick={() => setActiveTab('reviews')}
                            >
                                Reviews
                            </button>
                            <hr />
                        </div>

                        <div className={styles.tabContent}>
                            {activeTab === 'features' && (
                                <div className={styles.features}>
                                    <div className={styles.featuresGrid}>
                                        {getFeaturesWithIcons().map(feature => (
                                            <div key={feature.key} className={styles.featureWithIcon}>
                                                <svg className={styles.featureIcon}>
                                                    <use href={`/icons.svg#${getFeatureIcon(feature.key)}`} />
                                                </svg>
                                                <span className={styles.featureLabel}>{feature.label}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <div className={styles.specifications}>
                                        <h3>Vehicle details</h3>
                                        <div className={styles.specsGrid}>
                                            {[
                                                { key: 'form', label: 'Form', value: currentCamper.form },
                                                { key: 'length', label: 'Length', value: currentCamper.length },
                                                { key: 'width', label: 'Width', value: currentCamper.width },
                                                { key: 'height', label: 'Height', value: currentCamper.height },
                                                { key: 'tank', label: 'Tank', value: currentCamper.tank },
                                                { key: 'consumption', label: 'Consumption', value: currentCamper.consumption },
                                            ]
                                            .filter(spec => spec.value)
                                            .map(spec => (
                                                <div key={spec.key} className={styles.spec}>
                                                    <span className={styles.specName}>{spec.label}</span>
                                                    <span className={styles.specValue}>{spec.value}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'reviews' && (
                                <div className={styles.reviews}>
                                    {currentCamper.reviews && currentCamper.reviews.length > 0 ? (
                                        <div className={styles.reviewsList}>
                                            {currentCamper.reviews.map((review, index) => (
                                                <div key={index} className={styles.review}>
                                                    <div className={styles.reviewHeader}>
                                                        <span className={styles.reviewer}>
                                                            {review.reviewer_name.charAt(0).toUpperCase()}
                                                        </span>
                                                        <div className={styles.reviewerInfo}>
                                                            <span className={styles.reviewerName}>
                                                                {review.reviewer_name}
                                                            </span>
                                                            <span className={styles.rating}>
                                                                {renderStars(review.reviewer_rating)}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <p className={styles.comment}>{review.comment}</p>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <p className={styles.noReviews}>No reviews yet.</p>
                                    )}
                                </div>
                            )}
                            <div className={styles.sidebar}>
                                <BookingForm camper={currentCamper} />
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </main>
    );
};

export default CamperDetailsPage;