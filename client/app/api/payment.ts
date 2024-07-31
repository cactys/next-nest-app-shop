import { createEffect } from 'effector-next';
import api from '../axsiosClient';
import { ICheckPayFx, IMakePayFx } from '@/types/order';

export const makePaymentFX = createEffect(
  async ({ url, amount }: IMakePayFx) => {
    const { data } = await api.post(url, { amount });

    return data;
  }
);

export const checkPaymentFX = createEffect(
  async ({ url, paymentId }: ICheckPayFx) => {
    const { data } = await api.post(url, { paymentId });

    return data;
  }
);
