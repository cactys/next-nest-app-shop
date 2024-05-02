import { IFilterCheckboxFilter } from '@/types/catalog';
import { IProductParts } from '@/types/product-parts';
import { partsManufacturers, productManufacturers } from '@/utils/catalog';
import { createDomain } from 'effector-next';

const productParts = createDomain();

export const setProductParts = productParts.createEvent<IProductParts>();

export const setProductPartsCheapFirst = productParts.createEvent();
export const setProductPartsExpensiveFirst = productParts.createEvent();
export const setProductPartsByPopularity = productParts.createEvent();
export const setProductManufacturers =
  productParts.createEvent<IFilterCheckboxFilter[]>();
export const setPartsManufacturers =
  productParts.createEvent<IFilterCheckboxFilter[]>();

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
  .createStore<
    IFilterCheckboxFilter[]
  >(productManufacturers as IFilterCheckboxFilter[])
  .on(setProductManufacturers, (_, parts) => parts);

export const $partsManufacturer = productParts
  .createStore<
    IFilterCheckboxFilter[]
  >(partsManufacturers as IFilterCheckboxFilter[])
  .on(setPartsManufacturers, (_, parts) => parts);
