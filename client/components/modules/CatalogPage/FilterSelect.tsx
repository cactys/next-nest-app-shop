import { $mode } from '@/context/mode';
import Select from 'react-select';
import { IOption, TSelectOptionType } from '@/types/common';
import { useUnit } from 'effector-react';
import { useEffect, useState } from 'react';
import { createSelectOption } from '@/utils/common';
import {
  selectStyles,
  controlStyles,
  menuStyles,
} from '@/styles/catalog/select';
import { optionStyles } from '@/styles/searchInput';
import { categoriesOptions } from '@/utils/selectContents';
import {
  $productParts,
  setProductPartsByPopularity,
  setProductPartsCheapFirst,
  setProductPartsExpensiveFirst,
} from '@/context/productParts';
import { useRouter } from 'next/router';

const FilterSelect = () => {
  const mode = useUnit($mode);
  const productParts = useUnit($productParts);
  const [categoryOption, setCategoryOption] = useState<TSelectOptionType>(null);
  const router = useRouter();

  useEffect(() => {
    if (productParts.rows) {
      switch (router.query.first) {
        case 'cheap':
          updateCategoryOption('Сначала дешевле');
          setProductPartsCheapFirst();
          break;
        case 'expensive':
          updateCategoryOption('Сначала дороже');
          setProductPartsExpensiveFirst();
          break;
        case 'popularity':
          updateCategoryOption('По популярности');
          setProductPartsByPopularity();
          break;
        default:
          updateCategoryOption('Сначала дешевле');
          setProductPartsCheapFirst();
          updateRouteParam('cheap');
          break;
      }
    }
  }, [productParts.rows, router.query.first]);

  const updateCategoryOption = (value: string) =>
    setCategoryOption({ value, label: value });

  const updateRouteParam = (first: string) => {
    router.push(
      {
        query: {
          ...router.query,
          first,
        },
      },
      undefined,
      { shallow: true }
    );
  };

  const handleSortOptionChange = (selectedOption: TSelectOptionType) => {
    setCategoryOption(selectedOption);

    switch ((selectedOption as IOption).value) {
      case 'Сначала дешевле':
        setProductPartsCheapFirst();
        updateRouteParam('cheap');
        break;
      case 'Сначала дороже':
        setProductPartsExpensiveFirst();
        updateRouteParam('expensive');
        break;
      case 'По популярности':
        setProductPartsByPopularity();
        updateRouteParam('popularity');
        break;
    }
  };

  return (
    <Select
      placeholder="Я ищу..."
      value={categoryOption || createSelectOption('Сначала дешевле')}
      onChange={handleSortOptionChange}
      styles={{
        ...selectStyles,
        control: (defaultStyles) => ({
          ...controlStyles(defaultStyles, mode),
        }),
        input: (defaultStyles) => ({
          ...defaultStyles,
          color: mode === 'dark' ? '#f2f2f2' : '#222',
        }),
        menu: (defaultStyles) => ({
          ...menuStyles(defaultStyles, mode),
        }),
        option: (defaultStyles, state) => ({
          ...optionStyles(defaultStyles, state, mode),
        }),
      }}
      isSearchable={false}
      options={categoriesOptions}
    />
  );
};

export default FilterSelect;
