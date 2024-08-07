import { ReactNode } from 'react';
import { MultiValue, SingleValue } from 'react-select';

export interface IWrappedComponentProps {
  open: boolean;
  setOpen: (arg0: boolean) => void;
}

export interface IOption {
  value: string | number;
  label: string | number;
}

export type TSelectOptionType =
  | MultiValue<IOption>
  | SingleValue<IOption>
  | null;

export interface IAccordion {
  children: ReactNode;
  title: string | false;
  titleClass: string;
  arrowOpenClass?: string;
  isMobileForFilter?: boolean;
  hideArrowClass?: string;
  boxShadowStyle?: string;
  callback?: (arg0: boolean) => void;
}

export interface ILayoutProps {
  children: ReactNode;
}
