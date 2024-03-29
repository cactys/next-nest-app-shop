import { createEffect } from 'effector-next';
import api from '../axsiosClient';

export const getBestsellersOrNewPartsFx = createEffect(async (url: string) => {
  const { data } = await api.get(url);

  return data;
});
