import { $mode } from '@/context/mode';
import { useUnit } from 'effector-react';
import {
  $partsManufacturers,
  $productManufacturers,
  setPartsManufacturers,
  setProductManufacturers,
  updatePartsManufacturers,
  updateProductManufacturers,
} from '@/context/productParts';
import FilterManufacturerAccordion from './FilterManufacturerAccordion';
import Accordion from '@/components/elements/Accordion/Accordion';
import PriceRange from './PriceRange';
import { ICatalogFilterDesktopProps } from '@/types/catalog';
import styles from '@/styles/catalog/index.module.scss';
import spinnerStyles from '@/styles/spinner/index.module.scss';

const CatalogFiltersDesktop = ({
  priceRange,
  setPriceRange,
  setIsPriceRangeChange,
  resetFilterBtnDisabled,
  spinner,
  resetFilters,
  applyFilters,
}: ICatalogFilterDesktopProps) => {
  const mode = useUnit($mode);
  const productManufacturers = useUnit($productManufacturers);
  const partsManufacturers = useUnit($partsManufacturers);
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
      <div className={styles.filters__price}>
        <Accordion
          title="Цена"
          titleClass={`${styles.filters__manufacturer__btn} ${darkModeClass}`}
          arrowOpenClass={styles.open}>
          <div className={styles.filters__manufacturer__inner}>
            <PriceRange
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              setIsPriceRangeChange={setIsPriceRangeChange}
            />
          </div>
        </Accordion>
      </div>
      <div className={styles.filters__product_manufacturers}>
        <FilterManufacturerAccordion
          manufacturersList={partsManufacturers}
          title="Производитель запчастей"
          updateManufacturer={updatePartsManufacturers}
          setManufacturer={setPartsManufacturers}
        />
      </div>
      <div className={styles.filters__actions}>
        <button
          className={styles.filters__actions__show}
          disabled={spinner || resetFilterBtnDisabled}
          onClick={applyFilters}>
          {spinner ? (
            <span
              className={spinnerStyles.spinner}
              style={{ top: 6, left: '47%' }}
            />
          ) : (
            'Показать'
          )}
        </button>
        <button
          className={styles.filters__actions__reset}
          disabled={resetFilterBtnDisabled}
          onClick={resetFilters}>
          Сбросить
        </button>
      </div>
    </div>
  );
};

export default CatalogFiltersDesktop;
