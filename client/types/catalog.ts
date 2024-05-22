import { Event } from 'effector-next';

export interface IManufacturersBlockProps {
  title: string;
  event: Event<IFilterCheckboxItem>;
  manufacturersList: IFilterCheckboxItem[];
}

export interface IManufacturersBlockItemProps {
  item: IFilterCheckboxItem;
  event: Event<IFilterCheckboxItem>;
}

export interface IQueryParams {
  offset: string;
  first: string;
  boiler: string;
  parts: string;
  priceFrom: string;
  priceTo: string;
}

export interface IFilterCheckboxItem {
  title: string;
  checked: boolean;
  id?: string;
  event: Event<IFilterCheckboxItem>;
}

export interface IFilterManufacturerAccordionProps {
  manufacturersList: IFilterCheckboxItem[];
  title: string | false;
  setManufacturer: Event<IFilterCheckboxItem[]>;
  updateManufacturer: Event<IFilterCheckboxItem>;
}

export interface ICatalogFiltersProps {
  priceRange: number[];
  setPriceRange: (arg: number[]) => void;
  setIsPriceChanged: (arg: boolean) => void;
  resetFilterBtnDisabled: boolean;
  resetFilters: VoidFunction;
  isPriceRangeChange: boolean;
  currentPage: number;
  setIsFilterInQuery: (arg: boolean) => void;
}

export interface IPriceRangeProps {
  priceRange: number[];
  setPriceRange: (arg: number[]) => void;
  setIsPriceChanged: (arg: boolean) => void;
}

export interface ICatalogFilterDesktopProps {
  priceRange: number[];
  setPriceRange: (arg: number[]) => void;
  setIsPriceChanged: (arg: boolean) => void;
  resetFilterBtnDisabled: boolean;
  resetFilters: VoidFunction;
  spinner: boolean;
  applyFilters: VoidFunction;
}
