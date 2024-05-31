import { $mode } from '@/context/mode';
import { useUnit } from 'effector-react';
import styles from '@/styles/catalog/index.module.scss';
import { ICatalogFilterMobileProps } from '@/types/catalog';

const CatalogFiltersMobile = ({}: ICatalogFilterMobileProps) => {
  const mode = useUnit($mode);
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : '';
  return <div></div>;
};

export default CatalogFiltersMobile;
