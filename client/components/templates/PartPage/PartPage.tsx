import { $mode } from '@/context/mode';
import { useUnit } from 'effector-react';
import styles from '@/styles/part/index.module.scss';
import { $productPart } from '@/context/productPart';

const PartPage = () => {
  const mode = useUnit($mode);
  const productPart = useUnit($productPart);
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : '';

  return <section>
    <div className='container'>
      <div className={`${styles.part__top} ${darkModeClass}`}>
        <h2>{productPart.name}</h2>
        <div className={styles.part__inner}>
        https://youtu.be/mu1abT7LR1g?t=2373
        </div>
      </div>
    </div>
  </section>;
};

export default PartPage;
