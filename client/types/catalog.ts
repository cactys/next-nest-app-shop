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

export interface IPriceRangeProps {
  priceRange: number[];
  setPriceRange: (arg: number[]) => void;
  setIsPriceChanged: (arg: boolean) => void;
}

export interface ICatalogFiltersProps extends IPriceRangeProps {
  resetFilterBtnDisabled: boolean;
}

export interface ICatalogFilterDesktopProps extends ICatalogFiltersProps {
  spinner: boolean;
}
