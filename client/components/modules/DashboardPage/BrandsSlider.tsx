/* eslint-disable @next/next/no-img-element */
import Slider from 'react-slick';
import Image from 'next/image';
import { useEffect } from 'react';
import { useUnit } from 'effector-react';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { $mode } from '@/context/mode';
import styles from '@/styles/dashboard/index.module.scss';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import Arderia from '@/public/img/brand-1.png';
import BaltGaz from '@/public/img/brand-2.png';
import Buberus from '@/public/img/brand-3.png';
import Bosch from '@/public/img/brand-4.png';
import BrandsSliderNextArrow from '@/components/elements/BrandsSliderNextArrow/BrandsSliderNextArrow';
import BrandsSliderPrevArrow from '@/components/elements/BrandsSliderPrevArrow/BrandsSliderPrevArrow';

const BrandsSlider = () => {
  const isMedia768 = useMediaQuery(768);
  const mode = useUnit($mode);
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : '';

  const brandItems = [
    { id: 1, img: Arderia, alt: 'ARDERIA' },
    { id: 2, img: Buberus, alt: 'Buberus' },
    { id: 3, img: BaltGaz, alt: 'BaltGaz' },
    { id: 4, img: BaltGaz, alt: 'BaltGaz' },
    { id: 5, img: Arderia, alt: 'ARDERIA' },
    { id: 6, img: Arderia, alt: 'ARDERIA' },
    { id: 7, img: Bosch, alt: 'BOSCH' },
    { id: 8, img: Bosch, alt: 'BOSCH' },
    { id: 9, img: Buberus, alt: 'Buberus' },
    { id: 10, img: Buberus, alt: 'Buberus' },
    { id: 11, img: Buberus, alt: 'Buberus' },
    { id: 12, img: Arderia, alt: 'ARDERIA' },
  ];

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
    slidesToScroll: 1,
    variableWidth: true,
    autoplay: true,
    speed: 500,
    nextArrow: <BrandsSliderNextArrow modeClass={darkModeClass} />,
    prevArrow: <BrandsSliderPrevArrow modeClass={darkModeClass} />,
  };

  return (
    <Slider {...settings} className={styles.dashboard__brands__slider}>
      {brandItems.map((item) => (
        <div
          className={`${styles.dashboard__brands__slide} ${darkModeClass}`}
          key={item.id}
          style={{ width: isMedia768 ? 124 : 180 }}>
          <img src={`${item.img}`} alt={item.alt} />
        </div>
      ))}
    </Slider>
  );
};

export default BrandsSlider;
