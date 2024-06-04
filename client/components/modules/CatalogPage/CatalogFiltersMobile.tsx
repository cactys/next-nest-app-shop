import { $mode } from '@/context/mode';
import { useUnit } from 'effector-react';
import styles from '@/styles/catalog/index.module.scss';
import spinnerStyles from '@/styles/spinner/index.module.scss';
import { ICatalogFilterMobileProps } from '@/types/catalog';
import FiltersPopupTop from './FiltersPopupTop';
import {
  $partsManufacturers,
  $productManufacturers,
  setProductManufacturers,
  updateProductManufacturers,
} from '@/context/productParts';
import FiltersPopup from './FiltersPopup';
import { useState } from 'react';

const CatalogFiltersMobile = ({
  spinner,
  resetFilterBtnDisabled,
  resetFilters,
  closePopup,
  applyFilters,
  filtersMobileOpen,
}: ICatalogFilterMobileProps) => {
  const mode = useUnit($mode);
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : '';
  const productManufacturers = useUnit($productManufacturers);
  const partsManufacturers = useUnit($partsManufacturers);
  const [openProduct, setOpenProduct] = useState(false);
  const [openParts, setOpenParts] = useState(false);
  const handleOpenProduct = () => setOpenProduct(true)
  const handleCloseProduct = () => setOpenProduct(false)
  const handleOpenParts = () => setOpenParts(true)
  const handleCloseParts = () => setOpenParts(false)

  const applyFiltersAndClosePopup = () => {
    applyFilters();
    closePopup();
  };

  return (
    <div
      className={`${styles.catalog__bottom__filters} ${darkModeClass} ${filtersMobileOpen ? styles.open : ''}`}>
      <div className={styles.catalog__bottom__filters__inner}>
      https://youtu.be/qK1ENlEucpc?t=38043
        <FiltersPopupTop
          resetBtnText="Сбросить все"
          title="Фильтры"
          resetFilters={resetFilters}
          resetFilterBtnDisabled={resetFilterBtnDisabled}
          closePopup={closePopup}
        />
        <div className={styles.filters__product_manufacturers}>
          <button>Производитель ...</button>
          <FiltersPopup
            title="Производитель ..."
            resetFilterBtnDisabled={resetFilterBtnDisabled}
            updateManufacturer={updateProductManufacturers}
            setManufacturer={setProductManufacturers}
            applyFilters={applyFiltersAndClosePopup}
            manufacturersList={productManufacturers}
          />
        </div>
      </div>
      <div className={styles.filters__actions}>
        <button
          className={styles.filters__actions__show}
          onClick={applyFiltersAndClosePopup}
          disabled={resetFilterBtnDisabled}>
          {spinner ? (
            <span
              className={spinnerStyles.spinner}
              style={{ top: 6, left: '47%' }}
            />
          ) : (
            'Показать'
          )}
        </button>
      </div>
    </div>
  );
};

export default CatalogFiltersMobile;
