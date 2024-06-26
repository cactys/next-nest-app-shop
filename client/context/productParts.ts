import { IFilterCheckboxItem } from '@/types/catalog';
import { IProductPart, IProductParts } from '@/types/product-parts';
import { partsManufacturers, productManufacturers } from '@/utils/catalog';
import { createDomain } from 'effector-next';

const productParts = createDomain();

export const setProductParts = productParts.createEvent<IProductParts>();

export const setProductPartsCheapFirst = productParts.createEvent();
export const setProductPartsExpensiveFirst = productParts.createEvent();
export const setProductPartsByPopularity = productParts.createEvent();
export const setFilteredProductParts = productParts.createEvent();
export const setProductManufacturers =
  productParts.createEvent<IFilterCheckboxItem[]>();
export const updateProductManufacturers =
  productParts.createEvent<IFilterCheckboxItem>();
export const setPartsManufacturers =
  productParts.createEvent<IFilterCheckboxItem[]>();
export const updatePartsManufacturers =
  productParts.createEvent<IFilterCheckboxItem>();
export const setProductManufacturersFromQuery =
  productParts.createEvent<string[]>();
export const setPartsManufacturersFromQuery =
  productParts.createEvent<string[]>();

const updateManufacturer = (
  manufacturers: IFilterCheckboxItem[],
  id: string,
  payload: Partial<IFilterCheckboxItem>
) =>
  manufacturers.map((item) => {
    if (item.id === id) {
      return {
        ...item,
        ...payload,
      };
    }

    return item;
  });

const updateManufacturerFromQuery = (
  manufacturers: IFilterCheckboxItem[],
  manufacturersFromQuery: string[]
) =>
  manufacturers.map((item) => {
    if (manufacturersFromQuery.find((title) => title === item.title)) {
      return {
        ...item,
        checked: true,
      };
    }

    return item;
  });

export const $productParts = productParts
  .createStore<IProductParts>({} as IProductParts)
  .on(setProductParts, (_, parts) => parts)
  .on(setProductPartsCheapFirst, (state) => ({
    ...state,
    rows: state.rows.sort((a, b) => a.price - b.price),
  }))
  .on(setProductPartsExpensiveFirst, (state) => ({
    ...state,
    rows: state.rows.sort((a, b) => b.price - a.price),
  }))
  .on(setProductPartsByPopularity, (state) => ({
    ...state,
    rows: state.rows.sort((a, b) => a.popularity - b.popularity),
  }));

export const $productManufacturers = productParts
  .createStore<IFilterCheckboxItem[]>(
    productManufacturers as IFilterCheckboxItem[]
  )
  .on(setProductManufacturers, (_, parts) => parts)
  .on(updateProductManufacturers, (state, payload) => [
    ...updateManufacturer(state, payload.id as string, {
      checked: payload.checked,
    }),
  ])
  .on(setProductManufacturersFromQuery, (state, manufacturersFromQuery) => [
    ...updateManufacturerFromQuery(state, manufacturersFromQuery),
  ]);

export const $partsManufacturers = productParts
  .createStore<IFilterCheckboxItem[]>(
    partsManufacturers as IFilterCheckboxItem[]
  )
  .on(setPartsManufacturers, (_, parts) => parts)
  .on(updatePartsManufacturers, (state, payload) => [
    ...updateManufacturer(state, payload.id as string, {
      checked: payload.checked,
    }),
  ])
  .on(setPartsManufacturersFromQuery, (state, manufacturersFromQuery) => [
    ...updateManufacturerFromQuery(state, manufacturersFromQuery),
  ]);

export const $filteredProductParts = productParts
  .createStore<IProductParts>({} as IProductParts)
  .on(setFilteredProductParts, (_, parts) => parts);
