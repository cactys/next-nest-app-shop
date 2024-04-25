import { IOption } from '@/types/common';
import { CSSObjectWithLabel, GroupBase, StylesConfig } from 'react-select';

export const controlStyles = (
  defaultStyles: CSSObjectWithLabel,
  theme: string
) => ({
  ...defaultStyles,
  cursor: 'pointer',
  backgroundColor: 'transparent',
  border: '1px solid #d5d5d5',
  width: '241px',
  height: '40px',
  boxShadow: 'none',
  borderRadius: '4px',
  '&:hover': {
    borderColor: '#9e9e9e',
  },
  '& .css-1dimb5e-singleValue': {
    color: theme === 'dark' ? '#f2f2f2' : '#222',
  },
  '@media (max-width: 820px': {
    width: '200px',
  },
  '@media (max-width: 560px)': {
    width: '177px',
  },
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
});

export const selectStyles: StylesConfig<
  IOption,
  boolean,
  GroupBase<IOption>
> = {
  indicatorSeparator: () => ({ border: 'none' }),
  dropdownIndicator: (defaultStyles, state) => ({
    ...defaultStyles,
    transform: state.selectProps.menuIsOpen ? 'rotate(180deg)' : '',
    color: '#1c629e',
  }),
  menuList: (defaultStyles) => ({
    ...defaultStyles,
    paddingTop: 0,
    paddingBottom: 0,
  }),
  placeholder: (defaultStyles) => ({ ...defaultStyles, color: '#b9babb' }),
};
