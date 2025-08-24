import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './CatalogPage.module.css';
import Container from '../../components/Container/Container';
import CatalogFilters from '../../components/CatalogFilters/CatalogFilters';
import CatalogList from '../../components/CatalogList/CatalogList';
import { fetchCampers } from '../../redux/campers/operations';
import { setPage } from '../../redux/filters/slice';
import { selectAllFilters, selectPage } from '../../redux/filters/selectors';
import { selectHasMoreCampers, selectCampersLoading } from '../../redux/campers/selectors';

const CatalogPage = () => {
    const dispatch = useDispatch();
    const filters = useSelector(selectAllFilters);
    const currentPage = useSelector(selectPage);
    const hasMore = useSelector(selectHasMoreCampers);
    const loading = useSelector(selectCampersLoading);

    const equipmentString = useMemo(() => filters.equipment.join(), [filters.equipment]);

    useEffect(() => {
        dispatch(fetchCampers(filters));
    }, [dispatch, filters.location, filters.vehicleType, equipmentString]);

    const handleLoadMore = (e) => {
        e.preventDefault();
        const nextPage = currentPage + 1;
        dispatch(setPage(nextPage));
        dispatch(fetchCampers({ ...filters, page: nextPage }));
    };

    return (
        <div className={styles.catalog}>
            <Container>
                <div className={styles.wrapper}>
                    <aside className={styles.sidebar}>
                        <CatalogFilters />
                    </aside>
                    <section className={styles.content}>
                        <CatalogList />
                        {hasMore && !loading && (
                            <button 
                                className={styles.loadMore} 
                                onClick={handleLoadMore}
                                disabled={loading}
                            >
                                Load More
                            </button>
                        )}
                        {loading && <div className={styles.loading}>Loading more campers...</div>}
                    </section>
                </div>
            </Container>
        </div>
    );
};

export default CatalogPage;