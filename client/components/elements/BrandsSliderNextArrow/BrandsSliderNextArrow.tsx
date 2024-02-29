import styles from '@/styles/dashboard/index.module.scss';
import BrandsSliderArrowSvg from '../BrandsSliderArrowSvg/BrandsSliderArrowSvg';
import { IBrandsSliderArrow } from '@/types/elements';

const BrandsSliderNextArrow = (props: IBrandsSliderArrow) => (
  <button
    className={`
      ${styles.dashboard__brands__slider__arrow}
      ${styles.dashboard__brands__slider__arrow_next}
      ${props.modeClass}
    `}
    onClick={props.onClick}>
    <span>
      <BrandsSliderArrowSvg />
    </span>
  </button>
);

export default BrandsSliderNextArrow;
