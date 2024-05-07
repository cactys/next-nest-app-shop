import { useMediaQuery } from '@/hooks/useMediaQuery';
import CatalogFiltersDesktop from './CatalogFiltersDesktop';
import { ICatalogFiltersProps } from '@/types/catalog';
import { useState } from 'react';

const CatalogFilters = ({
  priceRange,
  setPriceRange,
  setIsPriceChanged,
  resetFilterBtnDisabled,
}: ICatalogFiltersProps) => {
  const isMobile = useMediaQuery(820);
  const [spinner, setSpinner] = useState(false);

  return (
    <>
      {isMobile ? (
        <div />
      ) : (
        <CatalogFiltersDesktop
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          setIsPriceChanged={setIsPriceChanged}
          resetFilterBtnDisabled={resetFilterBtnDisabled}
          spinner={spinner}
        />
      )}
    </>
  );
};

export default CatalogFilters;
