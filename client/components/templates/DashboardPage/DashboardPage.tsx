import { getBestsellersOrNewPartsFx } from '@/app/api/productParts';
import BrandsSlider from '@/components/modules/DashboardPage/BrandsSlider';
import DashboardSlider from '@/components/modules/DashboardPage/DashboardSlider';
import { $mode } from '@/context/mode';
import styles from '@/styles/dashboard/index.module.scss';
import { IProductParts } from '@/types/product-parts';
import { useUnit } from 'effector-react';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const DashboardPage = () => {
  const [newParts, setNewParts] = useState<IProductParts>({} as IProductParts);
  const [bestsellers, setBestsellers] = useState<IProductParts>(
    {} as IProductParts
  );
  const [spinner, setSpinner] = useState(false);

  const mode = useUnit($mode);
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : '';

  useEffect(() => {
    loadProductParts();
  }, []);

  const loadProductParts = async () => {
    try {
      setSpinner(true);
      const bestsellers = await getBestsellersOrNewPartsFx(
        '/product-parts/bestsellers'
      );
      const newParts = await getBestsellersOrNewPartsFx('/product-parts/new');

      setBestsellers(bestsellers);
      setNewParts(newParts);
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
      setSpinner(false);
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
          <DashboardSlider items={bestsellers.rows || []} spinner={true} />
        </div>
      </div>
    </section>
  );
};

export default DashboardPage;
