/* eslint-disable @next/next/no-img-element */
import { $mode } from '@/context/mode';
import { useStore, useUnit } from 'effector-react';
import { $shoppingCart } from '@/context/shopping-cart';
import { IProductPart } from '@/types/product-parts';
import Link from 'next/link';
import { formatPrice } from '@/utils/common';
import CartHoverCheckedSvg from '@/components/elements/CartHoverCheckedSvg/CartHoverCheckedSvg';
import CartHoverSvg from '@/components/elements/CartHoverSvg/CartHoverSvg';
import styles from '@/styles/catalog/index.module.scss';
import spinnerStyles from '@/styles/spinner/index.module.scss';
import { $user } from '@/context/user';
import { toggleCartItem } from '@/utils/shopping-cart';
import { removeFromCartElementsFx } from '@/app/api/shopping-cart';
import { $productPart } from '@/context/productPart';

const CatalogItem = ({ item }: { item: IProductPart }) => {
  const mode = useUnit($mode);
  const user = useUnit($user);
  const shoppingCart = useUnit($shoppingCart);
  const isInCart = shoppingCart.some((cartItem) => cartItem.partId === item.id);
  const spinner = useStore(removeFromCartElementsFx.pending);
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : '';

  const toggleToCart = () => toggleCartItem(user.username, item.id, isInCart);

  return (
    <li className={`${styles.catalog__list__item} ${darkModeClass}`}>
      <Link href={`/catalog/${item.id}`} passHref legacyBehavior>
        <img src={JSON.parse(item.images)} alt={item.name} />
      </Link>
      <div className={styles.catalog__list__item__inner}>
        <Link href={`/catalog/${item.id}`} passHref legacyBehavior>
          <h3 className={styles.catalog__list__item__title}>{item.name}</h3>
        </Link>
        <span className={styles.catalog__list__item__code}>
          Артикул: {item.vendor_code}
        </span>
        <span className={styles.catalog__list__item__price}>
          {formatPrice(item.price)} ₽
        </span>
      </div>
      <button
        className={`${styles.catalog__list__item__cart} ${isInCart ? styles.added : ''}`}
        disabled={spinner}
        onClick={toggleToCart}>
        {spinner ? (
          <div className={spinnerStyles.spinner} style={{ top: 6, left: 6 }} />
        ) : (
          <span>{isInCart ? <CartHoverCheckedSvg /> : <CartHoverSvg />}</span>
        )}
      </button>
    </li>
  );
};

export default CatalogItem;
