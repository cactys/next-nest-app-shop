/* eslint-disable @next/next/no-img-element */
import Slider from 'react-slick';
import { useEffect } from 'react';
import { useUnit } from 'effector-react';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { $mode } from '@/context/mode';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { IDashboardSlider } from '@/types/dashboard';
import styles from '@/styles/dashboard/index.module.scss';
import skeletonStyles from '@/styles/dashboard/index.module.scss';
import Link from 'next/link';
import { formatPrice } from '@/utils/common';

const DashboardSlider = ({
  items,
  spinner,
  goToPartPage,
}: IDashboardSlider) => {
  const isMedia560 = useMediaQuery(560);
  const isMedia768 = useMediaQuery(768);
  const isMedia800 = useMediaQuery(800);
  const isMedia1030 = useMediaQuery(1030);
  const isMedia1366 = useMediaQuery(1366);
  const mode = useUnit($mode);
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : '';

  useEffect(() => {
    const slider = document.querySelector(
      `.${styles.dashboard__brands__slider}`
    );

    const list = slider?.querySelector('.slick-list') as HTMLElement;

    list.style.height = isMedia768 ? '48px' : '68px';
  }, [isMedia768]);

  const settings = {
    dots: false,
    infinite: true,
    variableWidth: true,
    autoplay: true,
    speed: 500,
    arrows: false,
    slidesToShow: items.length >= 4 ? (isMedia1030 ? 3 : 4) : items.length - 1,
    slidesToScroll: isMedia768 ? 1 : 2,
  };

  const width = {
    width: isMedia1366 ? (isMedia800 ? (isMedia560 ? 160 : 252) : 317) : 344,
  };

  return (
    <Slider {...settings} className={styles.dashboard__brands__slider}>
      {spinner ? (
        [...Array(8)].map((item) => (
          <div
            className={`${skeletonStyles.skeleton__item} ${
              mode === 'dark' ? `${skeletonStyles.dark_mode}` : ''
            }`}
            key={item}
            style={width}>
            <div className={skeletonStyles.skeleton__item__light} />
          </div>
        ))
      ) : items.length ? (
        items.map((item) => (
          <div
            className={`${styles.dashboard__slide} ${darkModeClass}`}
            key={item.id}
            style={width}>
            <img src={JSON.parse(item.images)[0]} alt={item.name} />
            <div className={styles.dashboard__slide__inner}>
              <Link
                href={goToPartPage ? `/catalog/${item.id}` : '/catalog'}
                legacyBehavior>
                <a>
                  <h3 className={styles.dashboard__slide__title}>
                    {item.name}
                  </h3>
                </a>
              </Link>
              <span className={styles.dashboard__slide__code}>
                Артикул: {item.vendor_code}
              </span>
              <span className={styles.dashboard__slide__price}>
                {formatPrice(item.price)} ₽
              </span>
            </div>
          </div>
        ))
      ) : (
        <span>Список товаров пуст...</span>
      )}
    </Slider>
  );
};

export default DashboardSlider;
