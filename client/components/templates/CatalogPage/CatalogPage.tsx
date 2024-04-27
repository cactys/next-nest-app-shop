import { $mode } from '@/context/mode';
import { useUnit } from 'effector-react';
import styles from '@/styles/catalog/index.module.scss';
import { AnimatePresence } from 'framer-motion';
import ManufacturersBlock from '@/components/modules/CatalogPage/ManufacturersBlock';
import FilterSelect from '@/components/modules/CatalogPage/FilterSelect';
import { getProductPartsFx } from '@/app/api/productParts';
import { $productParts, setProductParts } from '@/context/productParts';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import skeletonStyles from '@/styles/skeleton/index.module.scss';
import CatalogItem from '@/components/modules/CatalogPage/CatalogItem';

const CatalogPage = () => {
  const mode = useUnit($mode);
  const productParts = useUnit($productParts);
  const [spinner, setSpinner] = useState(false);
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : '';

  useEffect(() => {
    loadProductParts();
  }, []);

  const loadProductParts = async () => {
    try {
      setSpinner(true);
      const data = await getProductPartsFx('/product-parts?limit=20&offset=0');

      setProductParts(data);
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
      setSpinner(false);
    }
  };

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
            <button
              className={`${styles.catalog__top__reset} ${darkModeClass}`}
              disabled={true}>
              Сбросить фильтр
            </button>
            <FilterSelect />
          </div>
        </div>
        <div className={`${styles.catalog__bottom} ${darkModeClass}`}>
          <div className={styles.catalog__bottom__inner}>
            <div className="div">Filter</div>
            {spinner ? (
              <ul className={skeletonStyles.skeleton}>
                {Array.from(new Array(8)).map((_, i) => (
                  <li
                    key={i}
                    className={`${skeletonStyles.skeleton__item} ${
                      mode === 'dark' ? `${skeletonStyles.dark_mode}` : ''
                    }`}>
                    <div className={skeletonStyles.skeleton__item__light} />
                  </li>
                ))}
              </ul>
            ) : (
              <ul className={styles.catalog__list}>
                {productParts.rows?.length ? (
                  productParts.rows.map((item) => (
                    <CatalogItem item={item} key={item.id} />
                  ))
                ) : (
                  <span>Список товаров пуст...</span>
                )}
              </ul>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CatalogPage;
