import { motion } from 'framer-motion';
import { IOrderAccordionProps } from '@/types/order';
import styles from '@/styles/order/index.module.scss';
import { $mode } from '@/context/mode';
import { useUnit } from 'effector-react';
import DoneSvg from '@/components/elements/DoneSvg/DoneSvg';

const OrderAccordion = ({
  setOrderIsReady,
  showDoneIcon,
}: IOrderAccordionProps) => {
  const mode = useUnit($mode);
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : '';

  return (
    <>
      <motion.div
        initial={false}
        className={`${styles.order__cart__title} ${darkModeClass}`}>
        <h3 className={`${styles.order__cart__title__text} ${darkModeClass}`}>
          {showDoneIcon && (
            <span>
              <DoneSvg />
            </span>
          )}
          Корзина
        </h3>
      </motion.div>
    </>
  );
};

export default OrderAccordion;
