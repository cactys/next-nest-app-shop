import { $mode } from '@/context/mode';
import { useUnit } from 'effector-react';
import styles from '@/styles/catalog/index.module.scss';
import { AnimatePresence } from 'framer-motion';
import ManufacturersBlock from '@/components/modules/CatalogPage/ManufacturersBlock';
import FilterSelect from '@/components/modules/CatalogPage/FilterSelect';
import { getProductPartsFx } from '@/app/api/productParts';
import {
  $filteredProductParts,
  $partsManufacturers,
  $productManufacturers,
  $productParts,
  setPartsManufacturers,
  setProductManufacturers,
  setProductParts,
  updatePartsManufacturers,
  updateProductManufacturers,
} from '@/context/productParts';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import skeletonStyles from '@/styles/skeleton/index.module.scss';
import CatalogItem from '@/components/modules/CatalogPage/CatalogItem';
import ReactPaginate from 'react-paginate';
import { IQueryParams } from '@/types/catalog';
import { useRouter } from 'next/router';
import { IProductParts } from '@/types/product-parts';
import CatalogFilters from '@/components/modules/CatalogPage/CatalogFilters';

const CatalogPage = ({ query }: { query: IQueryParams }) => {
  const mode = useUnit($mode);
  const productManufacturers = useUnit($productManufacturers);
  const partsManufacturers = useUnit($partsManufacturers);
  const filteredProductParts = useUnit($filteredProductParts);
  const productParts = useUnit($productParts);
  const pagesCount = Math.ceil(productParts.count / 20);
  const isValidOffset =
    query.offset && !isNaN(+query.offset) && +query.offset > 0;
  const [currentPage, setCurrentPage] = useState(
    isValidOffset ? +query.offset - 1 : 0
  );
  const [spinner, setSpinner] = useState(false);
  const [priceRange, setPriceRange] = useState([1000, 9000]);
  const [isFilterInQuery, setIsFilterInQuery] = useState(false);
  const [isPriceRangeChange, setIsPriceRangeChange] = useState(false);
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : '';
  const router = useRouter();
  const isAnyProductManufacturerChecked = productManufacturers.some(
    (item) => item.checked
  );
  const isAnyPartsManufacturerChecked = partsManufacturers.some(
    (item) => item.checked
  );
  const resetFilterBtnDisabled = !(
    isPriceRangeChange ||
    isAnyProductManufacturerChecked ||
    isAnyPartsManufacturerChecked
  );

  useEffect(() => {
    loadProductParts();
  }, [filteredProductParts, isFilterInQuery]);

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

          setCurrentPage(0);
          resetPagination(isFilterInQuery ? filteredProductParts : data);
          return;
        }

        const offset = +query.offset - 1;
        const result = await getProductPartsFx(
          `/product-parts?limit=20&offset=${offset}`
        );

        setCurrentPage(offset);
        setProductParts(isFilterInQuery ? filteredProductParts : result);
        return;
      }

      setCurrentPage(0);
      resetPagination(isFilterInQuery ? filteredProductParts : data);
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
      setTimeout(() => setSpinner(false), 1000);
    }
  };

  const handlePageChange = async ({ selected }: { selected: number }) => {
    try {
      setSpinner(true);
      const data = await getProductPartsFx('/product-parts?limit=20&offset=0');

      if (selected > pagesCount) {
        resetPagination(isFilterInQuery ? filteredProductParts : data);
        return;
      }

      if (isValidOffset && +query.offset > Math.ceil(data.count / 2)) {
        resetPagination(isFilterInQuery ? filteredProductParts : data);
        return;
      }

      const result = await getProductPartsFx(
        `/product-parts?limit=20&offset=${selected}${
          isFilterInQuery && router.query.product
            ? `&product=${router.query.product}`
            : ''
        }${
          isFilterInQuery && router.query.parts
            ? `&parts=${router.query.parts}`
            : ''
        }${
          isFilterInQuery && router.query.priceFrom && router.query.priceTo
            ? `&priceFrom=${router.query.priceFrom}&priceTo=${router.query.priceTo}`
            : ''
        }`
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
    } finally {
      setTimeout(() => setSpinner(false), 1000);
    }
  };

  const resetFilters = async () => {
    try {
      const data = await getProductPartsFx('/product-parts?limit=20&offset=0');
      const params = router.query;

      delete params.product;
      delete params.parts;
      delete params.priceFrom;
      delete params.priceTo;
      params.first = 'cheap';

      router.push({ query: { ...params } }, undefined, { shallow: true });

      setProductManufacturers(
        productManufacturers.map((item) => ({ ...item, checked: false }))
      );

      setPartsManufacturers(
        partsManufacturers.map((item) => ({ ...item, checked: false }))
      );

      setProductParts(data);
      setPriceRange([1000, 9000]);
      setIsPriceRangeChange(false);
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  console.log(productParts.rows);

  return (
    <section className={styles.catalog}>
      <div className={`container ${styles.catalog__container}`}>
        https://youtu.be/qK1ENlEucpc?t=36170
        <h2 className={`${styles.catalog__title} ${darkModeClass}`}>
          Каталог товаров
        </h2>
        <div className={`${styles.catalog__top} ${darkModeClass}`}>
          <AnimatePresence>
            {isAnyProductManufacturerChecked && (
              <ManufacturersBlock
                title="Производитель товара:"
                event={updateProductManufacturers}
                manufacturersList={productManufacturers}
              />
            )}
          </AnimatePresence>
          <AnimatePresence>
            {isAnyPartsManufacturerChecked && (
              <ManufacturersBlock
                title="Производитель запчастей:"
                event={updatePartsManufacturers}
                manufacturersList={partsManufacturers}
              />
            )}
          </AnimatePresence>
          <div className={styles.catalog__top__inner}>
            <button
              className={`${styles.catalog__top__reset} ${darkModeClass}`}
              disabled={resetFilterBtnDisabled}
              onClick={resetFilters}>
              Сбросить фильтр
            </button>
            <FilterSelect setSpinner={setSpinner} />
          </div>
        </div>
        <div className={`${styles.catalog__bottom} ${darkModeClass}`}>
          <div className={styles.catalog__bottom__inner}>
            <CatalogFilters
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              setIsPriceChanged={setIsPriceRangeChange}
              resetFilterBtnDisabled={resetFilterBtnDisabled}
              resetFilters={resetFilters}
              isPriceRangeChange={isPriceRangeChange}
              currentPage={currentPage}
              setIsFilterInQuery={setIsFilterInQuery}
            />
            {spinner ? (
              <ul className={skeletonStyles.skeleton}>
                {Array.from(new Array(20)).map((_, i) => (
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
      </div>
    </section>
  );
};

export default CatalogPage;
