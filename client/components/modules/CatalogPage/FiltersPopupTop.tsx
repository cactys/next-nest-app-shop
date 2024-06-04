import { $mode } from '@/context/mode';
import { useUnit } from 'effector-react';
import styles from '@/styles/catalog/index.module.scss';
import { IFiltersPopupTo } from '@/types/catalog';

const FiltersPopupTop = ({
  title,
  resetBtnText,
  resetFilters,
  resetFilterBtnDisabled,
  closePopup,
}: IFiltersPopupTo) => {
  const mode = useUnit($mode);
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : '';
  return (
    <div className={`${styles.catalog__bottom__filters__top} ${darkModeClass}`}>
      <button
        onClick={closePopup}
        className={styles.catalog__bottom__filters__title}>
        {title}
      </button>
      <button
        onClick={resetFilters}
        disabled={resetFilterBtnDisabled}
        className={styles.catalog__bottom__filters__reset}>
        {resetBtnText}
      </button>
    </div>
  );
};

export default FiltersPopupTop;
