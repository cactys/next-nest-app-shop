import { $mode } from '@/context/mode';
import { useUnit } from 'effector-react';
import styles from '@/styles/catalog/index.module.scss';
import spinnerStyles from '@/styles/spinner/index.module.scss';
import { ICatalogFilterMobileProps } from '@/types/catalog';
import FiltersPopupTop from './FiltersPopupTop';
import {
  $partsManufacturers,
  $productManufacturers,
  setPartsManufacturers,
  setProductManufacturers,
  updatePartsManufacturers,
  updateProductManufacturers,
} from '@/context/productParts';
import FiltersPopup from './FiltersPopup';
import { useState } from 'react';
import Accordion from '@/components/elements/Accordion/Accordion';
import PriceRange from './PriceRange';
import { useMediaQuery } from '@/hooks/useMediaQuery';

const CatalogFiltersMobile = ({
  spinner,
  resetFilterBtnDisabled,
  resetFilters,
  closePopup,
  applyFilters,
  filtersMobileOpen,
  setIsPriceRangeChange,
  priceRange,
  setPriceRange,
}: ICatalogFilterMobileProps) => {
  const isMobile = useMediaQuery(820);
  const mode = useUnit($mode);
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : '';
  const productManufacturers = useUnit($productManufacturers);
  const partsManufacturers = useUnit($partsManufacturers);
  const [openProduct, setOpenProduct] = useState(false);
  const [openParts, setOpenParts] = useState(false);
  const handleOpenProduct = () => setOpenProduct(true);
  const handleCloseProduct = () => setOpenProduct(false);
  const handleOpenParts = () => setOpenParts(true);
  const handleCloseParts = () => setOpenParts(false);
  const isAnyProductManufacturerChecked = productManufacturers.some(
    (item) => item.checked
  );
  const isAnyPartsManufacturerChecked = partsManufacturers.some(
    (item) => item.checked
  );

  const resetAllProductManufacturers = () =>
    setProductManufacturers(
      productManufacturers.map((item) => ({ ...item, checked: false }))
    );

  const resetAllPartsManufacturers = () =>
    setPartsManufacturers(
      partsManufacturers.map((item) => ({ ...item, checked: false }))
    );

  const applyFiltersAndClosePopup = () => {
    applyFilters();
    closePopup();
  };

  return (
    <div
      className={`${styles.catalog__bottom__filters} ${darkModeClass} ${filtersMobileOpen ? styles.open : ''}`}>
      <div className={styles.catalog__bottom__filters__inner}>
        <FiltersPopupTop
          resetBtnText="Сбросить все"
          title="Фильтры"
          resetFilters={resetFilters}
          resetFilterBtnDisabled={resetFilterBtnDisabled}
          closePopup={closePopup}
        />
        <div className={styles.filters__product_manufacturers}>
          <button
            className={`${styles.filters__manufacturer__btn} ${darkModeClass}`}
            onClick={handleOpenProduct}>
            Производитель ...
          </button>
          <FiltersPopup
            title="Производитель ..."
            resetFilterBtnDisabled={!isAnyProductManufacturerChecked}
            updateManufacturer={updateProductManufacturers}
            setManufacturer={setProductManufacturers}
            applyFilters={applyFiltersAndClosePopup}
            manufacturersList={productManufacturers}
            resetAllManufacturers={resetAllProductManufacturers}
            handleClosePopup={handleCloseProduct}
            openPopup={openProduct}
          />
        </div>
        <div className={styles.filters__parts_manufacturers}>
          <button
            className={`${styles.filters__manufacturer__btn} ${darkModeClass}`}
            onClick={handleOpenParts}>
            Производитель запчастей
          </button>
          <FiltersPopup
            title="Производитель запчастей"
            resetFilterBtnDisabled={!isAnyPartsManufacturerChecked}
            updateManufacturer={updatePartsManufacturers}
            setManufacturer={setPartsManufacturers}
            applyFilters={applyFiltersAndClosePopup}
            manufacturersList={partsManufacturers}
            resetAllManufacturers={resetAllPartsManufacturers}
            handleClosePopup={handleCloseParts}
            openPopup={openParts}
          />
        </div>
        <div className={styles.filters__price}>
          <Accordion
            title="Цена"
            titleClass={`${styles.filters__manufacturer__btn} ${darkModeClass}`}
            hideArrowClass={styles.hide_arrow}
            isMobileForFilter={isMobile}>
            <div className={styles.filters__manufacturer__inner}>
              <PriceRange
                priceRange={priceRange}
                setPriceRange={setPriceRange}
                setIsPriceRangeChange={setIsPriceRangeChange}
              />
            </div>
          </Accordion>
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
