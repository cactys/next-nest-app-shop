import {
  addToCartElementsFx,
  removeFromCartElementsFx,
} from '@/app/api/shopping-cart';
import {
  removeShoppingCartItem,
  updateShoppingCart,
} from '@/context/shopping-cart';
import { toast } from 'react-toastify';

export const toggleCartItem = async (
  username: string,
  partId: number,
  isInCart: boolean,
  setSpinner: (arg: boolean) => void
) => {
  try {
    setSpinner(true);

    if (isInCart) {
      await removeFromCartElementsFx(`/shopping-cart/one/${partId}`);
      removeShoppingCartItem(partId);
      return;
    }

    const data = await addToCartElementsFx({
      url: '/shopping-cart/add',
      username,
      partId,
    });

    updateShoppingCart(data);
  } catch (error) {
    toast.error((error as Error).message);
  } finally {
    setSpinner(false);
  }
};

export const removeItemFromCart = async (
  partId: number,
  setSpinner: (arg: boolean) => void
) => {
  try {
    setSpinner(true);
    await removeFromCartElementsFx(`/shopping-cart/one/${partId}`);
    removeShoppingCartItem(partId);
  } catch (error) {
    toast.error((error as Error).message);
  } finally {
    setSpinner(false);
  }
};
