import { IFilterCheckboxItem } from '@/types/catalog';
import { IProductParts } from '@/types/product-parts';
import { partsManufacturers, productManufacturers } from '@/utils/catalog';
import { createDomain } from 'effector-next';

const productParts = createDomain();

export const setProductParts = productParts.createEvent<IProductParts>();

export const setProductPartsCheapFirst = productParts.createEvent();
export const setProductPartsExpensiveFirst = productParts.createEvent();
export const setProductPartsByPopularity = productParts.createEvent();
export const setProductManufacturers =
  productParts.createEvent<IFilterCheckboxItem[]>();
export const updateProductManufacturers =
  productParts.createEvent<IFilterCheckboxItem>();
export const setPartsManufacturers =
  productParts.createEvent<IFilterCheckboxItem[]>();
export const updatePartsManufacturers =
  productParts.createEvent<IFilterCheckboxItem>();

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
  ]);
