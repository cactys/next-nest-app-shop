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
  partId: string;
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
  closePopup: VoidFunction;
  filtersMobileOpen: boolean;
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
  spinner: boolean;
  applyFilters: VoidFunction;
  closePopup: VoidFunction;
  filtersMobileOpen: boolean;
}

export interface IFiltersPopupTo {
  resetBtnText: string;
  title: string;
  resetFilters: VoidFunction;
  resetFilterBtnDisabled: boolean;
  closePopup: VoidFunction;
}

export interface IFiltersPopupProps extends IFilterManufacturerAccordionProps {
  resetFilterBtnDisabled: boolean;
  resetAllManufacturers: VoidFunction;
  handleClosePopup: VoidFunction;
  applyFilters: VoidFunction;
  openPopup: boolean;
}
