import styles from '@/styles/footer/index.module.scss';
import Link from 'next/link';
import logo from '@/public/img/logo-footer.svg';
import Image from 'next/image';

const FooterLogo = () => (
  <div className={styles.footer__top__item}>
    <Link href="/dashboard" legacyBehavior>
      <a className={styles.footer__top__item_logo}>
        <Image src={logo} alt="Logo" />
        <span className={styles.footer__top__item__logo__text}>
          Магазин всякого
        </span>
      </a>
    </Link>
  </div>
);
export default FooterLogo;
