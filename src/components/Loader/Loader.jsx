import { ClipLoader } from 'react-spinners';
import styles from './Loader.module.css';

const Loader = () => {
  return (
    <div
      className={styles.overlay}
      role="status"
      aria-live="polite"
      aria-label="Loading content..."
    >
      <ClipLoader
        size={100}
        color="rgba(228, 72, 72, 1)"
        aria-hidden="true"
        cssOverride={{
          borderWidth: '8px',
          borderStyle: 'solid',
        }}
      />
    </div>
  );
};

export default Loader;
