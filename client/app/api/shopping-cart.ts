import { createEffect } from 'effector';
import { IAddToCartFx, IUpdateCartItemFx } from '@/types/shopping-cart';
import api from '../axsiosClient';

export const getCartElementsFx = createEffect(async (url: string) => {
  const { data } = await api.get(url);

  return data;
});

export const addToCartElementsFx = createEffect(
  async ({ url, username, partId }: IAddToCartFx) => {
    const { data } = await api.post(url, { username, partId });

    return data;
  }
);

export const removeFromCartElementsFx = createEffect(async (url: string) => {
  await api.delete(url);
});

export const updateCartItemFx = createEffect(
  async ({ url, payload }: IUpdateCartItemFx) => {
    const { data } = await api.patch(url, payload);

    return data;
  }
);
