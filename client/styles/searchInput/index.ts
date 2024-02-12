import { IOption } from '@/types/common';
import {
  CSSObjectWithLabel,
  GroupBase,
  OptionProps,
  StylesConfig,
} from 'react-select';

export const controlStyles = (
  defaultStyles: CSSObjectWithLabel,
  theme: string
) => ({
  ...defaultStyles,
  cursor: 'pointer',
  backgroundColor: 'transparent',
  border: '1px solid #9e9e9e',
  height: '40px',
  boxShadow: 'none',
  borderRadius: '4px',
  '&:hover': {
    borderColor: '#9e9e9e',
  },
  '& .css-1dimb5e-singleValue': {
    color: theme === 'dark' ? '#f2f2f2' : '#222',
  },
  borderRight: 'none',
  borderTopRightRadius: 0,
  borderBottomRightRadius: 0,
});

export const menuStyles = (
  defaultStyles: CSSObjectWithLabel,
  theme: string
) => ({
  ...defaultStyles,
  boxShadow: '0 4px 20px rgb(0 0 0 / 7%)',
  borderRadius: '4px',
  height: 'auto',
  overflow: 'hidden',
  backgroundColor: theme === 'dark' ? '#2d2d2d' : '#f2f2f2',
  width: 'calc(100% + 40px)',
  minHeight: 30,
});

export const optionStyles = (
  defaultStyles: CSSObjectWithLabel,
  state: OptionProps<IOption, boolean, GroupBase<IOption>>,
  theme: string
) => {
  const backgroundHoverFromLightMode = state.isSelected
    ? state.isSelected
      ? '#9e9e9e'
      : '#f2f2f2'
    : state.isSelected
      ? '#f2f2f2'
      : '#9e9e9e';

  const backgroundHoverFromDarkMode = state.isSelected
    ? state.isSelected
      ? '#f2f2f2'
      : '#9e9e9e'
    : state.isSelected
      ? '#9e9e9e'
      : '#f2f2f2';

  const colorHoverFromLightMode = state.isSelected
    ? state.isSelected
      ? '#f2f2f2'
      : '#9e9e9e'
    : state.isSelected
      ? '#9e9e9e'
      : '#f2f2f2';

  const colorHoverFromDarkMode = state.isSelected
    ? state.isSelected
      ? '#9e9e9e'
      : '#f2f2f2'
    : state.isSelected
      ? '#f2f2f2'
      : '#9e9e9e';

  return {
    ...defaultStyles,
    cursor: 'pointer',
    padding: '6px 12px',
    margin: 0,
    '&:hover': {
      backgroundColor:
        theme === 'dark'
          ? backgroundHoverFromDarkMode
          : backgroundHoverFromLightMode,
      color:
        theme === 'dark' ? colorHoverFromDarkMode : colorHoverFromLightMode,
    },
    backgroundColor:
      theme === 'dark'
        ? state.isSelected
          ? '#f2f2f2'
          : '#2d2d2d'
        : state.isSelected
          ? '#2d2d2d'
          : '#f2f2f2',
    color:
      theme === 'dark'
        ? state.isSelected
          ? '#222'
          : '#f2f2f2'
        : state.isSelected
          ? '#f2f2f2'
          : '#222',
  };
};

export const inputStyles: StylesConfig<IOption, boolean, GroupBase<IOption>> = {
  indicatorSeparator: () => ({ border: 'none' }),
  dropdownIndicator: () => ({ display: 'none' }),
  menuList: (defaultStyles) => ({
    ...defaultStyles,
    paddingTop: 0,
    paddingBottom: 0,
    minHeight: 30,
    '&::-webkit-scrollbar': {
      width: '8px',
    },
    '&::-webkit-scrollbar-track': {
      background: 'transparent',
    },
    '&::-webkit-scrollbar-thumb': {
      background: '#454545',
      borderRadius: '3px',
    },
    '&::-webkit-scrollbar-thumb:hover': {
      background: 'gray',
    },
  }),
  placeholder: (defaultStyles) => ({ ...defaultStyles, color: '#b9babb' }),
};
