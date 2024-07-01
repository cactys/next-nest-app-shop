import { IProductPart } from '@/types/product-parts';
import { createDomain } from 'effector-next';

const productPart = createDomain();

export const setProductPart = productPart.createEvent<IProductPart>();

export const $productPart = productPart
  .createStore<IProductPart>({} as IProductPart)
  .on(setProductPart, (_, part) => part);
