import styles from '@/styles/footer/index.module.scss';
import FooterLogo from './FooterLogo';
import OnlineStoreContent from './OnlineStoreContent';
import CompanyContent from './CompanyContent';
import Link from 'next/link';
import MarkerSvg from '@/components/elements/MarkerSvg/MarkerSvg';
import PhoneSvg from '@/components/elements/PhoneSvg/PhoneSvg';
import MailSvg from '@/components/elements/MailSvg/MailSvg';
import GooglePaySvg from '@/components/elements/GooglePaySvg/GooglePaySvg';
import ApplePaySvg from '@/components/elements/ApplePaySvg/ApplePaySvg';
import MastercardSvg from '@/components/elements/MastercardSvg/MastercardSvg';
import VisaSvg from '@/components/elements/VisaSvg/VisaSvg';
import VkSvg from '@/components/elements/VkSvg/VkSvg';
import InstagramSvg from '@/components/elements/InstagramSvg/InstagramSvg';
import FacebookSvg from '@/components/elements/FacebookSvg/FacebookSvg';
import YoutubeSvg from '@/components/elements/YoutubeSvg/YoutubeSvg';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import Accordion from '@/components/elements/Accordion/Accordion';

const Footer = () => {
  const isMedia750 = useMediaQuery(750);
  const isMedia500 = useMediaQuery(500);

  return (
    <footer className={styles.footer}>
      <div className={styles.footer__container}>
        <div className={styles.footer__top}>
          {!isMedia750 && <FooterLogo />}
          <div className={styles.footer__top__inner}>
            <div className={styles.footer__top__item}>
              {!isMedia500 && (
                <>
                  <h3 className={styles.footer__top__item__title}>
                    Интернет-магазин
                  </h3>
                  <OnlineStoreContent />
                </>
              )}
              {isMedia500 && (
                <Accordion
                  title="Интернет-магазин"
                  titleClass={styles.footer__top__item__title}
                  arrowOpenClass={styles.open}>
                  <OnlineStoreContent />
                  <div style={{ height: 17 }} />
                </Accordion>
              )}
            </div>
            <div className={styles.footer__top__item}>
              {!isMedia500 && (
                <>
                  <h3 className={styles.footer__top__item__title}>Компания</h3>
                  <CompanyContent />
                </>
              )}
              {isMedia500 && (
                <Accordion
                  title="Компания"
                  titleClass={styles.footer__top__item__title}
                  arrowOpenClass={styles.open}>
                  <CompanyContent />
                  <div style={{ height: 17 }} />
                </Accordion>
              )}
            </div>
          </div>
          <div className={styles.footer__top__item}>
            <h3 className={styles.footer__top__item__title}>Контакты</h3>
            <ul
              className={`${styles.footer__top__item__list} ${styles.footer__top__item__contacts}`}>
              <li className={styles.footer__top__item__list__item}>
                <Link href="/contacts" legacyBehavior>
                  <a className={styles.footer__top__item__list__item__link}>
                    <span>Наш адрес:</span>
                    <span>г. Москва, ул. ... д...</span>
                    <span>
                      <MarkerSvg />
                    </span>
                  </a>
                </Link>
              </li>
              <li className={styles.footer__top__item__list__item}>
                <Link href="tel:+780955555555" legacyBehavior>
                  <a className={styles.footer__top__item__list__item__link}>
                    <span>Наш контактный телефон:</span>
                    <span>+7(8095) 555-55-55</span>
                    <span>
                      <PhoneSvg />
                    </span>
                  </a>
                </Link>
              </li>
              <li className={styles.footer__top__item__list__item}>
                <Link href="mailto:info@zapchasti.com.ru" legacyBehavior>
                  <a className={styles.footer__top__item__list__item__link}>
                    <span>E-mail:</span>
                    <span>info@zapchasti.com.ru</span>
                    <span>
                      <MailSvg />
                    </span>
                  </a>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className={styles.footer__bottom}>
          <div className={styles.footer__bottom__block}>
            <div className={styles.footer__bottom__block__left}>
              <h3 className={styles.footer__bottom__block__title}>
                Мы принимаем к оплате:{' '}
              </h3>
              <ul className={styles.footer__bottom__block__pay}>
                <li className={styles.footer__bottom__block__pay__item}>
                  <ApplePaySvg />
                </li>
                <li className={styles.footer__bottom__block__pay__item}>
                  <GooglePaySvg />
                </li>
                <li className={styles.footer__bottom__block__pay__item}>
                  <MastercardSvg />
                </li>
                <li className={styles.footer__bottom__block__pay__item}>
                  <VisaSvg />
                </li>
              </ul>
            </div>
            <div className={styles.footer__bottom__block__right}>
              <h3 className={styles.footer__bottom__block__title}>
                Мы в соцсети:{' '}
              </h3>
              <ul className={styles.footer__bottom__block__social}>
                <li className={styles.footer__bottom__block__social__item}>
                  <Link href="#" legacyBehavior>
                    <a
                      className={
                        styles.footer__bottom__block__social__item_link
                      }>
                      <VkSvg />
                    </a>
                  </Link>
                </li>
                <li className={styles.footer__bottom__block__social__item}>
                  <Link href="#" legacyBehavior>
                    <a
                      className={
                        styles.footer__bottom__block__social__item_link
                      }>
                      <FacebookSvg />
                    </a>
                  </Link>
                </li>
                <li className={styles.footer__bottom__block__social__item}>
                  <Link href="#" legacyBehavior>
                    <a
                      className={
                        styles.footer__bottom__block__social__item_link
                      }>
                      <InstagramSvg />
                    </a>
                  </Link>
                </li>
                <li className={styles.footer__bottom__block__social__item}>
                  <Link href="#" legacyBehavior>
                    <a
                      className={
                        styles.footer__bottom__block__social__item_link
                      }>
                      <YoutubeSvg />
                    </a>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          {isMedia750 && <FooterLogo />}
          <div className={styles.footer__bottom__block}>
            <p className={styles.footer__bottom__block__copyright}>
              &copy; «Учебный магазин» 2024.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
