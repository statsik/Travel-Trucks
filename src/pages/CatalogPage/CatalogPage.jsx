import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './CatalogPage.module.css';
import Container from '../../components/Container/Container';
import CatalogFilters from '../../components/CatalogFilters/CatalogFilters';
import CatalogList from '../../components/CatalogList/CatalogList';
import { fetchCampers } from '../../redux/campers/operations';
import { selectAllFilters} from '../../redux/filters/selectors';

const CatalogPage = () => {
    const dispatch = useDispatch();
    const filters = useSelector(selectAllFilters);

    const equipmentString = useMemo(() => filters.equipment.join(), [filters.equipment]);

    useEffect(() => {
        dispatch(fetchCampers(filters));
    }, [dispatch, filters.location, filters.vehicleType, equipmentString]);

    return (
        <div className={styles.catalog}>
            <Container>
                <div className={styles.wrapper}>
                    <aside className={styles.sidebar}>
                        <CatalogFilters />
                    </aside>
                    <section className={styles.content}>
                        <CatalogList />
                    </section>
                </div>
            </Container>
        </div>
    );
};

export default CatalogPage;