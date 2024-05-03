import { $mode } from '@/context/mode';
import { useUnit } from 'effector-react';
import styles from '@/styles/catalog/index.module.scss';
import { useMediaQuery } from '@/hooks/useMediaQuery';

const FilterManufacturerAccordion = () => {
  const mode = useUnit($mode);
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : '';
  const isMobile = useMediaQuery(820);

  return (
    <div className={`${styles.catalog__bottom__filters} ${darkModeClass}`}>
      <h3
        className={`${styles.catalog__bottom__filters__title} ${darkModeClass}`}>
        Фильтры
      </h3>
      <div className={styles.filters__product_manufacturers}></div>
    </div>
  );
};

export default FilterManufacturerAccordion;
