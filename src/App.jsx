import styles from './App.module.css'
import { Route, Routes} from "react-router-dom";
import { lazy, Suspense } from 'react';

const HomePage = lazy(() => import('./pages/HomePage/HomePage'));
const CatalogPage = lazy(() => import('./pages/CatalogPage/CatalogPage'));
const CamperDetailsPage = lazy(() => import('./pages/CamperDetailsPage/CamperDetailsPage'));
const Features = lazy(() => import('./components/Features/Features'));
const Reviews = lazy(() => import('./components/Reviews/Reviews'));
const Header = lazy(() => import('./components/Header/Header'));

const App = () => {
  return (
    <div className={ styles.appwrapper}>
      <Header />
      <Suspense fallback={<p>Loading...</p>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/campers" element={<CatalogPage />} />
          <Route path="/campers/:id" element={<CamperDetailsPage />}>
              <Route path="cast" element={<Features />}></Route>
              <Route path="reviews" element={<Reviews />}></Route>
          </Route>
        </Routes>
      </Suspense>
    </div>
  )
}

export default App
