import styles from '@/styles/part/index.module.scss';
import { useUnit } from 'effector-react';
import { $mode } from '@/context/mode';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { $productPart } from '@/context/productPart';

const PartTabs = () => {
  const mode = useUnit($mode);
  const productPart = useUnit($productPart);
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : '';
  const [showDescription, setShowDescription] = useState(true);
  const [showCompatibility, setShowCompatibility] = useState(false);

  const handleShowDescription = () => {
    setShowDescription(true);
    setShowCompatibility(false);
  };

  const handleShowCompatibility = () => {
    setShowDescription(false);
    setShowCompatibility(true);
  };

  return (
    <div className={styles.part__tabs}>
      <div className={`${styles.part__tabs__controls} ${darkModeClass}`}>
        <button
          className={showDescription ? styles.active : ''}
          onClick={handleShowDescription}>
          Описание
        </button>
        <button
          className={showCompatibility ? styles.active : ''}
          onClick={handleShowCompatibility}>
          Совместимость
        </button>
      </div>
      {showDescription && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={styles.part__tabs__content}>
          <h3
            className={`${styles.part__tabs__content__title} ${darkModeClass}`}>
            {productPart.name}
          </h3>
          <p
            className={`${styles.part__tabs__content__title} ${darkModeClass}`}>
            {productPart.description}
          </p>
        </motion.div>
      )}
      {showCompatibility && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={styles.part__tabs__content}>
          <p
            className={`${styles.part__tabs__content__title} ${darkModeClass}`}>
            {productPart.compatibility}
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default PartTabs;
