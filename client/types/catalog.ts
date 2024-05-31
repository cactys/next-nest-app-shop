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

interface ICatalogBaseType {
  priceRange: number[];
  setPriceRange: (arg0: number[]) => void;
  setIsPriceRangeChange: (arg0: boolean) => void;
}

interface ICatalogFiltersBaseType {
  resetFilterBtnDisabled: boolean;
  resetFilters: VoidFunction;
}

export interface ICatalogFiltersProps
  extends ICatalogBaseType,
    ICatalogFiltersBaseType {
  isPriceRangeChange: boolean;
  currentPage: number;
  setIsFilterInQuery: (arg0: boolean) => void;
}

export type IPriceRangeProps = ICatalogBaseType;

export interface ICatalogFilterDesktopProps
  extends ICatalogBaseType,
    ICatalogFiltersBaseType {
  spinner: boolean;
  applyFilters: VoidFunction;
}

export interface ICatalogFilterMobileProps
  extends ICatalogBaseType,
    ICatalogFiltersBaseType {
  priceRange: number[];
  setPriceRange: (arg0: number[]) => void;
  setIsPriceRangeChange: (arg0: boolean) => void;
  spinner: boolean;
  applyFilters: VoidFunction;
}
