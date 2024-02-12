import { useUnit } from 'effector-react';
import Select from 'react-select';
import { $mode } from '@/context/mode';
import { useState } from 'react';
import { TSelectOptionType } from '@/types/common';
import {
  inputStyles,
  controlStyles,
  menuStyles,
  optionStyles,
} from '@/styles/searchInput';

const SearchInput = () => {
  const mode = useUnit($mode);
  const [searchOption, setSearchOption] = useState<TSelectOptionType>(null);

  const handleSearchOptionChange = (selectedOption: TSelectOptionType) => {
    setSearchOption(selectedOption);
  };

  return (
    <Select
      placeholder="Я ищу..."
      value={searchOption}
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
      options={[1, 2, 3, 4].map((item) => ({ value: item, label: item }))}
    />
  );
};

export default SearchInput;
