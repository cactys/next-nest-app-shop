/* eslint-disable @next/next/no-img-element */
import { $mode } from '@/context/mode';
import { useUnit } from 'effector-react';
import styles from '@/styles/header/index.module.scss';
import Link from 'next/link';

const HeaderBottom = () => {
  const mode = useUnit($mode);
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : '';

  return (
    <div className={styles.header__bottom}>
      <div className={`container ${styles.header__bottom__container}`}>
        <h1 className={styles.header__logo}>
          <Link href="/dashboard">
            <a className={styles.header__logo__link}>
              <img src="/img/logo.svg" alt="logo" />
              <span
                className={`${styles.header__logo__link__text} ${darkModeClass}`}>
                Детали для газовых котлов
              </span>
            </a>
          </Link>
        </h1>
      </div>
    </div>
  );
};

export default HeaderBottom;
