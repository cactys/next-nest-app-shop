import { $mode } from '@/context/mode';
import { useUnit } from 'effector-react';
import styles from '@/styles/catalog/index.module.scss';
import { AnimatePresence } from 'framer-motion';
import ManufacturersBlock from '@/components/modules/CatalogPage/ManufacturersBlock';
import FilterSelect from '@/components/modules/CatalogPage/FilterSelect';

const CatalogPage = () => {
  const mode = useUnit($mode);
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : '';

  return (
    <section className={styles.catalog}>
      <div className={`container ${styles.catalog__container}`}>
        <h2 className={`${styles.catalog__title} ${darkModeClass}`}>
          Каталог товаров
        </h2>
        <div className={`${styles.catalog__top} ${darkModeClass}`}>
          <AnimatePresence>
            <ManufacturersBlock title="Производитель товара:" />
          </AnimatePresence>
          <AnimatePresence>
            <ManufacturersBlock title="Производитель запчастей:" />
          </AnimatePresence>
          <div className={styles.catalog__top__inner}>
            <button>Сбросить фильтр</button>
            <FilterSelect />
          </div>
        </div>
        <div className={`${styles.catalog__bottom} ${darkModeClass}`}>
          <div className={styles.catalog__bottom__inner}>
            <div className="div">Filter</div>
            <ul className={styles.catalog__list}>
              {[].map((item) => (
                <li key={item} />
              ))}
            </ul>
            https://youtu.be/qK1ENlEucpc?t=28316
          </div>
        </div>
      </div>
    </section>
  );
};

export default CatalogPage;
