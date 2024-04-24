import { $mode } from '@/context/mode';
import Select from 'react-select';
import { TSelectOptionType } from '@/types/common';
import { useUnit } from 'effector-react';
import { useState } from 'react';
import { createSelectOption } from '@/utils/common';

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
        ...inputStyles,
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
      isClearable={true}
      openMenuOnClick={false}
      options={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].map((item) => ({
        value: item,
        label: item,
      }))}
    />
  );
};

export default FilterSelect;
