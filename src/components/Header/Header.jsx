import Container from '../Container/Container';
import Navigation from '../Navigation/Navigation';
import styles from './Header.module.css';
import { useLocation } from "react-router-dom";

const Header = () => {
    const location = useLocation();

    const isCatalog = location.pathname.startsWith("/campers");

    return (
        <header className={`${styles.header} ${isCatalog ? styles.catalog : ""}`}>
            <Container className={styles.container}>
                <img className={styles.image} src="/images/TravelTrucksLogo.png" alt="Header-Logo" />
                <Navigation />
            </Container>
        </header>
    )
}

export default Header;