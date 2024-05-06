import { $mode } from '@/context/mode';
import { useUnit } from 'effector-react';
import styles from '@/styles/catalog/index.module.scss';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { IFilterManufacturerAccordionProps } from '@/types/catalog';
import Accordion from '@/components/elements/Accordion/Accordion';
import FilterCheckboxItem from './FilterCheckboxItem';

const FilterManufacturerAccordion = ({
  manufacturersList,
  title,
  updateManufacturer,
  setManufacturer,
}: IFilterManufacturerAccordionProps) => {
  const mode = useUnit($mode);
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : '';
  const isMobile = useMediaQuery(820);

  const chooseAllManufacturers = () =>
    setManufacturer(
      manufacturersList.map((item) => ({ ...item, checkbox: true }))
    );

  return (
    <Accordion
      title={title}
      titleClass={`${styles.filters__manufacturer__btn} ${darkModeClass}`}
      arrowOpenClass={styles.open}
      isMobileForFilter={isMobile}
      hideArrowClass={isMobile ? styles.hide_arrow : ''}>
      <div className={styles.filters__manufacturer__inner}>
        <button
          className={styles.filters__manufacturer__select_all}
          onClick={chooseAllManufacturers}>
          Выбрать все
        </button>
        <ul className={styles.filters__manufacturer__list}>
          {manufacturersList.map((item) => (
            <FilterCheckboxItem
              title={item.title}
              key={item.id}
              checked={item.checked}
              event={updateManufacturer}
            />
          ))}
        </ul>
        <div style={{ height: 24 }} />
      </div>
    </Accordion>
  );
};

export default FilterManufacturerAccordion;
