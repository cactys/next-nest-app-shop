import { $mode } from '@/context/mode';
import { useStore, useUnit } from 'effector-react';
import styles from '@/styles/part/index.module.scss';
import { $productPart } from '@/context/productPart';
import PartImagesList from '@/components/modules/PartPage/PartImagesList';
import { formatPrice } from '@/utils/common';
import { $shoppingCart } from '@/context/shopping-cart';
import { useEffect, useState } from 'react';
import CartHoverCheckedSvg from '@/components/elements/CartHoverCheckedSvg/CartHoverCheckedSvg';
import CartHoverSvg from '@/components/elements/CartHoverSvg/CartHoverSvg';
import spinnerStyles from '@/styles/spinner/index.module.scss';
import { $user } from '@/context/user';
import { toggleCartItem } from '@/utils/shopping-cart';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import PartTabs from '@/components/modules/PartPage/PartTabs';
import DashboardSlider from '@/components/modules/DashboardPage/DashboardSlider';
import { toast } from 'react-toastify';
import { getProductPartsFx } from '@/app/api/productParts';
import {
  $productParts,
  setProductParts,
  setProductPartsByPopularity,
} from '@/context/productParts';
import PartAccordion from '@/components/modules/PartPage/PartAccordion';
import { removeFromCartElementsFx } from '@/app/api/shopping-cart';

const PartPage = () => {
  const mode = useUnit($mode);
  const user = useUnit($user);
  const productPart = useUnit($productPart);
  const productParts = useUnit($productParts);
  const cartItem = useUnit($shoppingCart);
  const isMobile = useMediaQuery(850);
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : '';
  const isInCart = cartItem.some((item) => item.partId === productPart.id);
  const spinnerToggleCart = useStore(removeFromCartElementsFx.pending);
  const spinnerSlider = useStore(getProductPartsFx.pending);

  useEffect(() => {
    loadProductPart();
  }, []);

  const loadProductPart = async () => {
    try {
      const data = await getProductPartsFx('/product-parts?limit=20&offset=0');

      setProductParts(data);
      setProductPartsByPopularity();
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  const toggleToCart = () =>
    toggleCartItem(user.username, productPart.id, isInCart);

  return (
    <section>
      <div className="container">
        <div className={`${styles.part__top} ${darkModeClass}`}>
          <h2 className={`${styles.part__title} ${darkModeClass}`}>
            {productPart.name}
          </h2>
          <div className={styles.part__inner}>
            <PartImagesList />
            <div className={styles.part__info}>
              <span className={`${styles.part__info__price} ${darkModeClass}`}>
                {formatPrice(productPart.price || 0)} ₽
              </span>
              <span className={styles.part__info__stock}>
                {productPart.in_stock > 0 ? (
                  <span className={styles.part__info__stock__success}>
                    На складе {productPart.in_stock} шт.
                  </span>
                ) : (
                  <span className={styles.part__info__stock__not}>
                    Нет на складе
                  </span>
                )}
              </span>
              <span className={styles.part__info__code}>
                Артикул: {productPart.vendor_code}
              </span>
              <button
                className={`${styles.part__info__btn} ${isInCart ? styles.in_cart : ''}`}
                onClick={toggleToCart}>
                {spinnerToggleCart ? (
                  <span
                    className={spinnerStyles.spinner}
                    style={{ top: 10, left: '45%' }}
                  />
                ) : (
                  <>
                    <span className={styles.part__info__btn__icon}>
                      {isInCart ? <CartHoverCheckedSvg /> : <CartHoverSvg />}
                    </span>
                    {isInCart ? (
                      <span>В корзине</span>
                    ) : (
                      <span>Положить в корзину</span>
                    )}
                  </>
                )}
              </button>
              {!isMobile && <PartTabs />}
            </div>
          </div>
        </div>
        {isMobile && (
          <div className={styles.part__accordion}>
            <div className={styles.part__accordion__inner}>
              <PartAccordion title="Описание">
                <div
                  className={`${styles.part__accordion__content} ${darkModeClass}`}>
                  <h3
                    className={`${styles.part__tabs__content__title} ${darkModeClass}`}>
                    {productPart.name}
                  </h3>
                  <p
                    className={`${styles.part__tabs__content__text} ${darkModeClass}`}>
                    {productPart.description}
                  </p>
                </div>
              </PartAccordion>
            </div>
            <PartAccordion title="Совместимость">
              <div
                className={`${styles.part__accordion__content} ${darkModeClass}`}>
                <p
                  className={`${styles.part__tabs__content__text} ${darkModeClass}`}>
                  {productPart.compatibility}
                </p>
              </div>
            </PartAccordion>
          </div>
        )}
        <div className={`${styles.part__bottom} ${darkModeClass}`}>
          <h2 className={`${styles.part__title} ${darkModeClass}`}>
            Вам понравится
          </h2>
          <DashboardSlider
            goToPartPage
            spinner={spinnerSlider}
            items={productParts.rows || []}
          />
        </div>
      </div>
    </section>
  );
};

export default PartPage;
