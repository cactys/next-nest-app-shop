import { getBestsellersOrNewPartsFx } from '@/app/api/productParts';
import BrandsSlider from '@/components/modules/DashboardPage/BrandsSlider';
import { $mode } from '@/context/mode';
import styles from '@/styles/dashboard/index.module.scss';
import { IProductPart } from '@/types/product-parts';
import { useUnit } from 'effector-react';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const DashboardPage = () => {
  const [newParts, setNewParts] = useState<IProductPart[]>([]);
  const [bestsellers, setBestsellers] = useState<IProductPart[]>([]);

  const mode = useUnit($mode);
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : '';

  useEffect(() => {
    loadProductParts();
  }, []);

  const loadProductParts = async () => {
    try {
      const bestsellers = await getBestsellersOrNewPartsFx(
        '/product-parts/bestsellers'
      );
      const newParts = await getBestsellersOrNewPartsFx('/product-parts/new');

      setBestsellers(bestsellers);
      setNewParts(newParts);
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  return (
    <section className={styles.dashboard}>
      <div className={`container ${styles.dashboard__container}`}>
        <div className={styles.dashboard__brands}>
          <BrandsSlider />
        </div>
        <h2 className={`${styles.dashboard__title} ${darkModeClass}`}>
          Какие-то товары
        </h2>
        <div className={styles.dashboard__parts}>
          <h3 className={`${styles.dashboard__parts__title} ${darkModeClass}`}>
            Хиты продаж
          </h3>
        </div>
      </div>
    </section>
  );
};

export default DashboardPage;
