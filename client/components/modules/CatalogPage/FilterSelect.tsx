import { $mode } from '@/context/mode';
import Select from 'react-select';
import { TSelectOptionType } from '@/types/common';
import { useUnit } from 'effector-react';
import { useState } from 'react';
import { createSelectOption } from '@/utils/common';
import {
  selectStyles,
  controlStyles,
  menuStyles,
} from '@/styles/catalog/select';
import { optionStyles } from '@/styles/searchInput';
import { categoriesOptions } from '@/utils/selectContents';

const FilterSelect = () => {
  const mode = useUnit($mode);
  const [categoryOption, setCategoryOption] = useState<TSelectOptionType>(null);

  const handleSearchOptionChange = (selectedOption: TSelectOptionType) => {
    setCategoryOption(selectedOption);
  };

  return (
    <Select
      placeholder="Я ищу..."
      value={categoryOption || createSelectOption('Сначала дешевле')}
      onChange={handleSearchOptionChange}
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
