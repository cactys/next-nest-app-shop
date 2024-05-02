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
import ReactPaginate from 'react-paginate';
import { IQueryParams } from '@/types/catalog';
import { useRouter } from 'next/router';
import { IProductParts } from '@/types/product-parts';
import { idGenerator } from '@/utils/common';

const CatalogPage = ({ query }: { query: IQueryParams }) => {
  const mode = useUnit($mode);
  const productParts = useUnit($productParts);
  const pagesCount = Math.ceil(productParts.count / 20);
  const isValidOffset =
    query.offset && !isNaN(+query.offset) && +query.offset > 0;
  const [currentPage, setCurrentPage] = useState(
    isValidOffset ? +query.offset - 1 : 0
  );
  const [spinner, setSpinner] = useState(false);
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : '';
  const router = useRouter();

  useEffect(() => {
    loadProductParts();
  }, []);

  const resetPagination = (data: IProductParts) => {
    setCurrentPage(0);
    setProductParts(data);
  };

  const loadProductParts = async () => {
    try {
      setSpinner(true);
      const data = await getProductPartsFx('/product-parts?limit=20&offset=0');

      if (!isValidOffset) {
        router.replace({
          query: {
            offset: 1,
          },
        });

        resetPagination(data);
        return;
      }

      if (isValidOffset) {
        if (+query.offset > Math.ceil(data.count / 20)) {
          router.push(
            {
              query: {
                ...query,
                offset: 1,
              },
            },
            undefined,
            { shallow: true }
          );

          resetPagination(data);
          return;
        }
      }

      const offset = +query.offset - 1;
      const result = await getProductPartsFx(
        `/product-parts?limit=20&offset=${offset}`
      );

      setCurrentPage(offset);
      setProductParts(result);
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
      setSpinner(false);
    }
  };

  const handlePageChange = async ({ selected }: { selected: number }) => {
    try {
      const data = await getProductPartsFx('/product-parts?limit=20&offset=0');

      if (selected > pagesCount) {
        resetPagination(data);
        return;
      }

      if (isValidOffset && +query.offset > Math.ceil(data.count / 2)) {
        resetPagination(data);
        return;
      }

      const result = await getProductPartsFx(
        `/product-parts?limit=20&offset=${selected}`
      );

      router.push(
        {
          query: {
            ...router.query,
            offset: selected + 1,
          },
        },
        undefined,
        { shallow: true }
      );

      setCurrentPage(selected);
      setProductParts(result);
    } catch (error) {
      toast.error((error as Error).message);
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
        <ReactPaginate
          containerClassName={styles.catalog__bottom__list}
          pageClassName={styles.catalog__bottom__list__item}
          pageLinkClassName={styles.catalog__bottom__list__item__link}
          previousClassName={styles.catalog__bottom__list__prev}
          nextClassName={styles.catalog__bottom__list__next}
          breakClassName={styles.catalog__bottom__list__break}
          breakLinkClassName={`${styles.catalog__bottom__list__break__link} ${darkModeClass}`}
          breakLabel="..."
          pageCount={pagesCount}
          forcePage={currentPage}
          onPageChange={handlePageChange}
        />
        {/* https://youtu.be/qK1ENlEucpc?t=31147 */}
      </div>
    </section>
  );
};

export default CatalogPage;
