import styles from './Navigation.module.css';
import { NavLink } from "react-router-dom";

const Navigation = () => {
    return (
        <nav className={styles.nav}>
            <NavLink className={({ isActive }) => isActive ? `${styles.navlink} ${styles.active}` : styles.navlink} to="/">Home</NavLink>
            <NavLink className={({ isActive }) => isActive ? `${styles.navlink} ${styles.active}` : styles.navlink} to="/campers">Catalog</NavLink>
        </nav>
    )
}

export default Navigation;