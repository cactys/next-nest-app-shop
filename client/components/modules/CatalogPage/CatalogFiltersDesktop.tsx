import { $mode } from '@/context/mode';
import { useUnit } from 'effector-react';
import styles from '@/styles/catalog/index.module.scss';
import {
  $partsManufacturer,
  $productManufacturers,
  setPartsManufacturers,
  setProductManufacturers,
  updatePartsManufacturers,
  updateProductManufacturers,
} from '@/context/productParts';
import FilterManufacturerAccordion from './FilterManufacturerAccordion';

const CatalogFiltersDesktop = () => {
  const mode = useUnit($mode);
  const productManufacturers = useUnit($productManufacturers);
  const partsManufacturer = useUnit($partsManufacturer);
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : '';

  return (
    <div className={`${styles.catalog__bottom__filters} ${darkModeClass}`}>
      <h3
        className={`${styles.catalog__bottom__filters__title} ${darkModeClass}`}>
        Фильтры
      </h3>
      <div className={styles.filters__product_manufacturers}>
        <FilterManufacturerAccordion
          manufacturersList={productManufacturers}
          title="Производитель ..."
          updateManufacturer={updateProductManufacturers}
          setManufacturer={setProductManufacturers}
        />
      </div>
      <div className={styles.filters__product_manufacturers}>
        <FilterManufacturerAccordion
          manufacturersList={partsManufacturer}
          title="Производитель запчастей"
          updateManufacturer={updatePartsManufacturers}
          setManufacturer={setPartsManufacturers}
        />
      </div>
    </div>
  );
};

export default CatalogFiltersDesktop;
