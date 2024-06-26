import { NextRouter } from 'next/router';
import { getQueryParamOnFirstRender, idGenerator } from './common';
import { getProductPartsFx } from '@/app/api/productParts';
import { setFilteredProductParts } from '@/context/productParts';

const createManufacturerCheckboxObj = (title: string) => ({
  title,
  checked: false,
  id: idGenerator(),
});

export const productManufacturers = [
  'Ariston',
  'Chaffoteaux&Maury',
  'Baxi',
  'Bongioanni',
  'Saunier Duval',
  'Buderus',
  'Strategist',
  'Henry',
  'Northwest',
].map(createManufacturerCheckboxObj);

export const partsManufacturers = [
  'Azure',
  'Gloves',
  'Cambridgeshire',
  'Salmon',
  'Montana',
  'Sensor',
  'Lesly',
  'Radian',
  'Gasoline',
  'Croatia',
].map(createManufacturerCheckboxObj);

const checkPriceFromQuery = (price: number) =>
  price && !isNaN(price) && price >= 0 && price <= 1000;

export const checkQueryParams = (router: NextRouter) => {
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
  const isValidPriceQuery =
    checkPriceFromQuery(+priceFromQueryValue) &&
    checkPriceFromQuery(+priceToQueryValue);

  return {
    isValidProductQuery,
    isValidPartsQuery,
    isValidPriceQuery,
    priceFromQueryValue,
    priceToQueryValue,
    productQueryValue,
    partsQueryValue,
  };
};

export const updateParamsAndFiltersFromQuery = async (
  callback: VoidFunction,
  path: string
) => {
  callback();

  const data = await getProductPartsFx(
    `/product-parts?limit=20&offset=${path}`
  );
  setFilteredProductParts(data);
};

export async function updateParamsAndFilters<T>(
  updatedParams: T,
  path: string,
  router: NextRouter
) {
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
