import { getBestsellersOrNewPartsFx } from '@/app/api/productParts';
import BrandsSlider from '@/components/modules/DashboardPage/BrandsSlider';
import CartAlert from '@/components/modules/DashboardPage/CartAlert';
import DashboardSlider from '@/components/modules/DashboardPage/DashboardSlider';
import { $mode } from '@/context/mode';
import { $shoppingCart } from '@/context/shopping-cart';
import styles from '@/styles/dashboard/index.module.scss';
import { IProductParts } from '@/types/product-parts';
import { useUnit } from 'effector-react';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const DashboardPage = () => {
  const mode = useUnit($mode);
  const shoppingCart = useUnit($shoppingCart);
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : '';

  const [newParts, setNewParts] = useState<IProductParts>({} as IProductParts);
  const [bestsellers, setBestsellers] = useState<IProductParts>(
    {} as IProductParts
  );
  const [spinner, setSpinner] = useState(false);
  const [showAlert, setShowAlert] = useState(!!shoppingCart.length);

  useEffect(() => {
    loadProductParts();
  }, []);

  useEffect(() => {
    if (shoppingCart.length) {
      setShowAlert(true);
      return;
    }

    setShowAlert(false);
  }, [shoppingCart.length]);

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

  const closeAlert = () => setShowAlert(false);

  return (
    <section className={styles.dashboard}>
      <div className={`container ${styles.dashboard__container}`}>
        <AnimatePresence>
          {showAlert && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={`${styles.dashboard__alert} ${darkModeClass}`}>
              <CartAlert
                count={shoppingCart.reduce(
                  (defaultCount, item) => defaultCount + item.count,
                  0
                )}
                closeAlert={closeAlert}
              />
            </motion.div>
          )}
        </AnimatePresence>
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
          <DashboardSlider items={bestsellers.rows || []} spinner={spinner} />
        </div>
        <div className={styles.dashboard__parts}>
          <h3 className={`${styles.dashboard__parts__title} ${darkModeClass}`}>
            Новинки
          </h3>
          <DashboardSlider items={newParts.rows || []} spinner={spinner} />
        </div>
        <div className={styles.dashboard__parts}>
          <h3
            className={`${styles.dashboard__parts__title} ${styles.dashboard__about__title} ${darkModeClass}`}>
            О компании
          </h3>
          <p className={`${styles.dashboard__about__text} ${darkModeClass}`}>
            Инструкции и схемы помогут разобраться в эксплуатации, определить
            неисправность и правильно выбрать запчасть для ремонта Вашего
            газового оборудования. Купить запчасть, деталь для ремонта газового
            котла возможно в любом населенном пункте Российской Федерации:
            Осуществляем доставку запчасти к газовым котлам в следующие города:
            Москва, Сан
          </p>
        </div>
      </div>
    </section>
  );
};

export default DashboardPage;
