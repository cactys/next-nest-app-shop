import { useMediaQuery } from '@/hooks/useMediaQuery';

const CatalogFilters = () => {
  const isMobile = useMediaQuery(820);

  return <>{isMobile ? <div /> : <div />};</>;
};

export default CatalogFilters;
