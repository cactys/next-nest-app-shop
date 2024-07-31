/* eslint-disable @next/next/no-img-element */
import { $mode } from '@/context/mode';
import { useUnit } from 'effector-react';
import styles from '@/styles/header/index.module.scss';
import Link from 'next/link';
import SearchSvg from '@/components/elements/SearchSvg/SearchSvg';
import SearchInput from '@/components/elements/Header/SearchInput';
import ModeToggler from '@/components/elements/ModeToggler/ModeToggler';
import CartPopup from './CartPopup/CartPopup';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { setDisableCart } from '@/context/shopping-cart';

const HeaderBottom = () => {
  const isMedia950 = useMediaQuery(950);
  const mode = useUnit($mode);
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : '';
  const router = useRouter();

  useEffect(() => {
    if (router.pathname === '/order') {
      setDisableCart(true);
      return;
    }

    setDisableCart(false);
  }, [router.pathname]);

  return (
    <div className={styles.header__bottom}>
      <div className={`container ${styles.header__bottom__container}`}>
        <h1 className={styles.header__logo}>
          <Link href="/dashboard" legacyBehavior>
            <a className={styles.header__logo__link}>
              <img src="/img/logo.svg" alt="logo" />
              <span
                className={`${styles.header__logo__link__text} ${darkModeClass}`}>
                Магазин всякого
              </span>
            </a>
          </Link>
        </h1>
        <div className={styles.header__search}>
          <SearchInput />
          <button className={`${styles.header__search__btn} ${darkModeClass}`}>
            <span className={styles.header__search__btn__span}>
              <SearchSvg />
            </span>
          </button>
        </div>
        <div className={styles.header__shopping_cart}>
          {!isMedia950 && <ModeToggler />}
          <CartPopup />
        </div>
      </div>
    </div>
  );
};

export default HeaderBottom;
