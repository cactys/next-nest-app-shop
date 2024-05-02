/* eslint-disable @next/next/no-img-element */
import { $mode } from '@/context/mode';
import { useUnit } from 'effector-react';
import { useState } from 'react';
import { $shoppingCart } from '@/context/shopping-cart';
import { IProductPart } from '@/types/product-parts';
import Link from 'next/link';
import { formatPrice } from '@/utils/common';
import CartHoverCheckedSvg from '@/components/elements/CartHoverCheckedSvg/CartHoverCheckedSvg';
import CartHoverSvg from '@/components/elements/CartHoverSvg/CartHoverSvg';
import styles from '@/styles/catalog/index.module.scss';
import spinnerStyles from '@/styles/spinner/index.module.scss';

const CatalogItem = ({ item }: { item: IProductPart }) => {
  const mode = useUnit($mode);
  const shoppingCart = useUnit($shoppingCart);
  const isInCart = shoppingCart.some((cartItem) => cartItem.partId === item.id);
  const [spinner, setSpinner] = useState(false);
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : '';

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
        disabled={spinner}>
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
