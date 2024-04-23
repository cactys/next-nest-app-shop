import { $mode } from '@/context/mode';
import { useUnit } from 'effector-react';
import { motion } from 'framer-motion';
import styles from '@/styles/catalog/index.module.scss';
import { IManufacturersBlockProps } from '@/types/catalog';

const ManufacturersBlock = ({ title }: IManufacturersBlockProps) => {
  const mode = useUnit($mode);
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : '';

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`${styles.dashboard__alert} ${darkModeClass}`}>
      <h3 className={`${styles.manufacturers__title} ${darkModeClass}`}>
        {title}
      </h3>
      <ul className={styles.manufacturers__list}>
        {[].map((item) => (
          <li key={item}>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}>
              {item}
            </motion.p>
          </li>
        ))}
      </ul>
    </motion.div>
  );
};

export default ManufacturersBlock;
