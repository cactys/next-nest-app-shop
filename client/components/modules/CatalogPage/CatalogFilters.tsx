import { useMediaQuery } from '@/hooks/useMediaQuery';
import CatalogFiltersDesktop from './CatalogFiltersDesktop';
import { ICatalogFiltersProps } from '@/types/catalog';
import { useState } from 'react';
import { toast } from 'react-toastify';
import {
  $productManufacturers,
  $partsManufacturers,
  setFilteredProductParts,
} from '@/context/productParts';
import { useUnit } from 'effector-react';
import { useRouter } from 'next/router';
import { getProductPartsFx } from '@/app/api/productParts';

const CatalogFilters = ({
  priceRange,
  setPriceRange,
  setIsPriceChanged,
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
        router.push(
          {
            query: {
              ...router.query,
              product: encodedProductQuery,
              parts: encodedPartsQuery,
              priceFrom,
              priceTo,
              offset: initialPage + 1,
            },
          },
          undefined,
          { shallow: true }
        );
        const data = await getProductPartsFx(
          `/product-parts?limit=20&offset=${initialPage}${priceQuery}${productQuery}${partsQuery}`
        );
        setFilteredProductParts(data);
        return;
      }

      if (isPriceRangeChange) {
        router.push(
          {
            query: {
              ...router.query,
              priceFrom,
              priceTo,
              offset: initialPage + 1,
            },
          },
          undefined,
          { shallow: true }
        );
        const data = await getProductPartsFx(
          `/product-parts?limit=20&offset=${initialPage}${priceQuery}`
        );
        setFilteredProductParts(data);
      }

      if (product.length && parts.length) {
        router.push(
          {
            query: {
              ...router.query,
              product: encodedProductQuery,
              parts: encodedPartsQuery,
              offset: initialPage + 1,
            },
          },
          undefined,
          { shallow: true }
        );
        const data = await getProductPartsFx(
          `/product-parts?limit=20&offset=${initialPage}${productQuery}${partsQuery}`
        );
        setFilteredProductParts(data);
        return;
      }

      if (product.length) {
        router.push(
          {
            query: {
              ...router.query,
              product: encodedProductQuery,
              offset: initialPage + 1,
            },
          },
          undefined,
          { shallow: true }
        );
        const data = await getProductPartsFx(
          `/product-parts?limit=20&offset=${initialPage}${productQuery}`
        );
        setFilteredProductParts(data);
      }

      if (parts.length) {
        router.push(
          {
            query: {
              ...router.query,
              parts: encodedPartsQuery,
              offset: initialPage + 1,
            },
          },
          undefined,
          { shallow: true }
        );
        const data = await getProductPartsFx(
          `/product-parts?limit=20&offset=${initialPage}${partsQuery}`
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
          setIsPriceChanged={setIsPriceChanged}
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
