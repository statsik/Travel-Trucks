import styles from './HomePage.module.css';
import Container from '../../components/Container/Container'
import { NavLink } from "react-router-dom";

const HomePage = () => {
    return (
        <main className={styles["home-wrapper"]}>
            <Container>
                    <h2 className={ styles.title }>Campers of your dreams</h2>
                    <p className={ styles.desc }>You can find everything you want in our catalog</p>
                    <NavLink className={ styles.button } to="/campers">View Now</NavLink>
            </Container>
        </main>
    )
}

export default HomePage;