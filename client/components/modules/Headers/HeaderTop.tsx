import CityButton from '@/components/elements/CityButton/CityButton';
import styles from '@/styles/header/index.module.scss';
import Link from 'next/link';
import ProfileDropdown from './ProfileDropdown';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import ModeToggler from '@/components/elements/ModeToggler/ModeToggler';
import { useUnit } from 'effector-react';
import { $mode } from '@/context/mode';
import { usePopup } from '@/hooks/usePopup';

const HeaderTop = () => {
  const isMedia950 = useMediaQuery(950);
  const { toggleOpen, closePopup, open } = usePopup();
  const mode = useUnit($mode);
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : '';

  return (
    <div className={styles.header__top}>
      https://youtu.be/mu1abT7LR1g?t=1597
      <div className={`container ${styles.header__top__container}`}>
        {!isMedia950 && <CityButton />}
        {isMedia950 && (
          <button
            onClick={toggleOpen}
            className={`${styles.burger_menu} ${
              open ? styles.open : ''
            } ${darkModeClass}`}>
            <span />
            <span />
            <span />
          </button>
        )}
        <nav
          className={`${styles.header__nav} ${
            open ? styles.open : ''
          } ${darkModeClass}`}>
          <ul className={styles.header__nav__list}>
            <li className={styles.header__nav__list__item}>
              <Link href="/shipping-payment" legacyBehavior>
                <a
                  onClick={closePopup}
                  className={`${styles.header__nav__list__item__link} ${darkModeClass}`}>
                  Доставка и оплата
                </a>
              </Link>
            </li>
            <li className={styles.header__nav__list__item}>
              <Link href="/about" passHref legacyBehavior>
                <a
                  onClick={closePopup}
                  className={`${styles.header__nav__list__item__link} ${darkModeClass}`}>
                  О компании
                </a>
              </Link>
            </li>
            <li className={styles.header__nav__list__item}>
              <Link href="/catalog" passHref legacyBehavior>
                <a
                  onClick={closePopup}
                  className={`${styles.header__nav__list__item__link} ${darkModeClass}`}>
                  Каталог
                </a>
              </Link>
            </li>
            <li className={styles.header__nav__list__item}>
              <Link href="/contacts" passHref legacyBehavior>
                <a
                  onClick={closePopup}
                  className={`${styles.header__nav__list__item__link} ${darkModeClass}`}>
                  Контакты
                </a>
              </Link>
            </li>
            <li className={styles.header__nav__list__item}>
              <Link href="/wholesale-buyers" passHref legacyBehavior>
                <a
                  onClick={closePopup}
                  className={`${styles.header__nav__list__item__link} ${darkModeClass}`}>
                  Оптовым покупателям
                </a>
              </Link>
            </li>
            {isMedia950 && (
              <li className={styles.header__nav__list__item}>
                <CityButton />
              </li>
            )}
            {isMedia950 && (
              <li className={styles.header__nav__list__item}>
                <ModeToggler />
              </li>
            )}
          </ul>
        </nav>
        <ProfileDropdown />
      </div>
    </div>
  );
};

export default HeaderTop;
