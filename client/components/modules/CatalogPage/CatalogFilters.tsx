import { useMediaQuery } from '@/hooks/useMediaQuery';
import CatalogFiltersDesktop from './CatalogFiltersDesktop';
import { ICatalogFiltersProps } from '@/types/catalog';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import {
  $productManufacturers,
  $partsManufacturers,
  setFilteredProductParts,
  setProductManufacturersFromQuery,
  setPartsManufacturersFromQuery,
} from '@/context/productParts';
import { useUnit } from 'effector-react';
import { useRouter } from 'next/router';
import { getProductPartsFx } from '@/app/api/productParts';
import { getQueryParamOnFirstRender } from '@/utils/common';

const CatalogFilters = ({
  priceRange,
  setPriceRange,
  setIsPriceRangeChange,
  resetFilterBtnDisabled,
  resetFilters,
  isPriceRangeChange,
  currentPage,
  setIsFilterInQuery,
}: ICatalogFiltersProps) => {
  const isMobile = useMediaQuery(820);
  const [spinner, setSpinner] = useState(false);
  const productManufacturers = useUnit($productManufacturers);
  const partsManufacturers = useUnit($partsManufacturers);
  const router = useRouter();

  useEffect(() => {
    applyFiltersFromQuery();
  }, []);

  const applyFiltersFromQuery = async () => {
    try {
      const priceFromQueryValue = getQueryParamOnFirstRender(
        'priceFrom',
        router
      ) as unknown as string;
      const priceToQueryValue = getQueryParamOnFirstRender(
        'priceTo',
        router
      ) as unknown as string;
      const productQueryValue = JSON.parse(
        decodeURIComponent(
          getQueryParamOnFirstRender('product', router) as unknown as string
        )
      );
      const partsQueryValue = JSON.parse(
        decodeURIComponent(
          getQueryParamOnFirstRender('parts', router) as unknown as string
        )
      );
      const isValidProductQuery =
        Array.isArray(productQueryValue) && !!productQueryValue?.length;
      const isValidPartsQuery =
        Array.isArray(partsQueryValue) && !!partsQueryValue?.length;

      const productQuery = `&product=${getQueryParamOnFirstRender('product', router)}`;
      const partsQuery = `&parts=${getQueryParamOnFirstRender('parts', router)}`;
      const priceQuery = `&priceFrom=${priceFromQueryValue}&priceTo=${priceToQueryValue}`;

      if (
        isValidProductQuery &&
        isValidPartsQuery &&
        priceFromQueryValue &&
        priceToQueryValue
      ) {
        updateParamsAndFiltersFromQuery(() => {
          updatePriceFromQuery(+priceFromQueryValue, +priceToQueryValue);
          setProductManufacturersFromQuery(productQueryValue);
          setPartsManufacturersFromQuery(partsQueryValue);
        }, `${currentPage}${priceQuery}${productQuery}${partsQuery}`);
        return;
      }

      if (priceFromQueryValue && priceToQueryValue) {
        updateParamsAndFiltersFromQuery(() => {
          updatePriceFromQuery(+priceFromQueryValue, +priceToQueryValue);
        }, `${currentPage}${priceQuery}`);
      }

      if (isValidProductQuery && isValidPartsQuery) {
        updateParamsAndFiltersFromQuery(() => {
          setIsFilterInQuery(true);
          setProductManufacturersFromQuery(productQueryValue);
          setPartsManufacturersFromQuery(partsQueryValue);
        }, `${currentPage}${productQuery}${partsQuery}`);
        return;
      }

      if (isValidProductQuery) {
        updateParamsAndFiltersFromQuery(() => {
          setIsFilterInQuery(true);
          setProductManufacturersFromQuery(productQueryValue);
        }, `${currentPage}${productQuery}`);
      }

      if (isValidPartsQuery) {
        updateParamsAndFiltersFromQuery(() => {
          setIsFilterInQuery(true);
          setPartsManufacturersFromQuery(partsQueryValue);
        }, `${currentPage}${partsQuery}`);
      }

      if (isValidPartsQuery && priceFromQueryValue && priceToQueryValue) {
        updateParamsAndFiltersFromQuery(() => {
          updatePriceFromQuery(+priceFromQueryValue, +priceToQueryValue);
          setPartsManufacturersFromQuery(partsQueryValue);
        }, `${currentPage}${priceQuery}${partsQuery}`);
      }

      if (isValidProductQuery && priceFromQueryValue && priceToQueryValue) {
        updateParamsAndFiltersFromQuery(() => {
          updatePriceFromQuery(+priceFromQueryValue, +priceToQueryValue);
          setProductManufacturersFromQuery(productQueryValue);
        }, `${currentPage}${priceQuery}${productQuery}`);
        return;
      }
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  const updatePriceFromQuery = (priceFrom: number, priceTo: number) => {
    setIsFilterInQuery(true);
    setPriceRange([+priceFrom, +priceTo]);
    setIsPriceRangeChange(true);
  };

  const updateParamsAndFiltersFromQuery = async (
    callback: VoidFunction,
    path: string
  ) => {
    callback();

    const data = await getProductPartsFx(
      `/product-parts?limit=20&offset=${path}`
    );
    setFilteredProductParts(data);
  };

  async function updateParamsAndFilters<T>(updatedParams: T, path: string) {
    const params = router.query;

    delete params.product;
    delete params.parts;
    delete params.priceFrom;
    delete params.priceTo;

    console.log(updatedParams);

    router.push(
      {
        query: {
          ...params,
          ...updatedParams,
        },
      },
      undefined,
      { shallow: true }
    );
    const data = await getProductPartsFx(
      `/product-parts?limit=20&offset=${path}`
    );
    setFilteredProductParts(data);
  }

  const applyFilters = async () => {
    setIsFilterInQuery(true);
    try {
      setSpinner(true);
      const priceFrom = Math.ceil(priceRange[0]);
      const priceTo = Math.ceil(priceRange[1]);

      const priceQuery = isPriceRangeChange
        ? `&priceFrom=${priceFrom}&priceTo=${priceTo}`
        : '';

      const product = productManufacturers
        .filter((item) => item.checked)
        .map((item) => item.title);
      const parts = partsManufacturers
        .filter((item) => item.checked)
        .map((item) => item.title);

      const encodedProductQuery = encodeURIComponent(JSON.stringify(product));
      const encodedPartsQuery = encodeURIComponent(JSON.stringify(parts));

      const productQuery = `&product=${encodedProductQuery}`;
      const partsQuery = `&parts=${encodedPartsQuery}`;
      const initialPage = currentPage > 0 ? 0 : currentPage;

      if (product.length && parts.length && isPriceRangeChange) {
        updateParamsAndFilters(
          {
            product: encodedProductQuery,
            parts: encodedPartsQuery,
            priceFrom,
            priceTo,
            offset: initialPage + 1,
          },
          `${initialPage}${priceQuery}${productQuery}${partsQuery}`
        );
        const data = await getProductPartsFx(
          `/product-parts?limit=20&offset=${initialPage}${priceQuery}${productQuery}${partsQuery}`
        );
        setFilteredProductParts(data);
        return;
      }

      if (isPriceRangeChange) {
        updateParamsAndFilters(
          {
            priceFrom,
            priceTo,
            offset: initialPage + 1,
          },
          `${initialPage}${priceQuery}`
        );
        const data = await getProductPartsFx(
          `/product-parts?limit=20&offset=${initialPage}${priceQuery}`
        );
        setFilteredProductParts(data);
      }

      if (product.length && parts.length) {
        updateParamsAndFilters(
          {
            product: encodedProductQuery,
            parts: encodedPartsQuery,
            offset: initialPage + 1,
          },
          `${initialPage}${productQuery}${partsQuery}`
        );
        const data = await getProductPartsFx(
          `/product-parts?limit=20&offset=${initialPage}${productQuery}${partsQuery}`
        );
        setFilteredProductParts(data);
        return;
      }

      if (product.length) {
        updateParamsAndFilters(
          {
            product: encodedProductQuery,
            offset: initialPage + 1,
          },
          `${initialPage}${productQuery}`
        );
        const data = await getProductPartsFx(
          `/product-parts?limit=20&offset=${initialPage}${productQuery}`
        );
        setFilteredProductParts(data);
      }

      if (parts.length) {
        updateParamsAndFilters(
          {
            parts: encodedPartsQuery,
            offset: initialPage + 1,
          },
          `${initialPage}${partsQuery}`
        );
        const data = await getProductPartsFx(
          `/product-parts?limit=20&offset=${initialPage}${partsQuery}`
        );
        setFilteredProductParts(data);
      }

      if (product.length && isPriceRangeChange) {
        updateParamsAndFilters(
          {
            product: encodedProductQuery,
            priceFrom,
            priceTo,
            offset: initialPage + 1,
          },
          `${initialPage}${productQuery}${priceQuery}`
        );
        const data = await getProductPartsFx(
          `/product-parts?limit=20&offset=${initialPage}${productQuery}${priceQuery}`
        );
        setFilteredProductParts(data);
      }

      if (parts.length && isPriceRangeChange) {
        updateParamsAndFilters(
          {
            parts: encodedPartsQuery,
            priceFrom,
            priceTo,
            offset: initialPage + 1,
          },
          `${initialPage}${partsQuery}${priceQuery}`
        );
        const data = await getProductPartsFx(
          `/product-parts?limit=20&offset=${initialPage}${partsQuery}${priceQuery}`
        );
        setFilteredProductParts(data);
      }
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
      setSpinner(false);
    }
  };

  return (
    <>
      {isMobile ? (
        <div />
      ) : (
        <CatalogFiltersDesktop
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          setIsPriceRangeChange={setIsPriceRangeChange}
          resetFilterBtnDisabled={resetFilterBtnDisabled}
          spinner={spinner}
          resetFilters={resetFilters}
          applyFilters={applyFilters}
        />
      )}
    </>
  );
};

export default CatalogFilters;
