import { IProductParts } from '@/types/product-parts';
import { createDomain } from 'effector-next';

const productParts = createDomain();

export const setProductParts = productParts.createEvent<IProductParts>();

export const setProductPartsCheapFirst = productParts.createEvent();
export const setProductPartsExpensiveFirst = productParts.createEvent();
export const setProductPartsByPopularity = productParts.createEvent();

export const $productParts = productParts
  .createStore<IProductParts>({} as IProductParts)
  .on(setProductParts, (_, parts) => parts)
  .on(setProductPartsCheapFirst, (state) => ({
    ...state,
    rows: state.rows.sort((a, b) => a.price - b.price),
  }));

// https://youtu.be/qK1ENlEucpc?t=29523
