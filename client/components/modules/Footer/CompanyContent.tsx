import Link from 'next/link';
import styles from '@/styles/footer/index.module.scss';

const CompanyContent = () => (
  <ul className={styles.footer__top__item__list}>
    <li className={styles.footer__top__item__list__item}>
      <Link href="/about" legacyBehavior>
        <a className={styles.footer__top__item__list__item__link}>О компании</a>
      </Link>
    </li>
    <li className={styles.footer__top__item__list__item}>
      <Link href="/contacts" legacyBehavior>
        <a className={styles.footer__top__item__list__item__link}>
          Обратная связь
        </a>
      </Link>
    </li>
    <li className={styles.footer__top__item__list__item}>
      <Link
        href="/wholesale-buyers"
        className={styles.footer__top__item__list__item__link}
        legacyBehavior>
        <a className={styles.footer__top__item__list__item__link}>
          Оптовым покупателям
        </a>
      </Link>
    </li>
    <li className={styles.footer__top__item__list__item}>
      <Link
        href="/contacts"
        className={styles.footer__top__item__list__item__link}
        legacyBehavior>
        <a className={styles.footer__top__item__list__item__link}>Контакты</a>
      </Link>
    </li>
  </ul>
);

export default CompanyContent;
