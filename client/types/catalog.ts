import { Event } from 'effector-next';

export interface IManufacturersBlockProps {
  title: string;
}

export interface IQueryParams {
  offset: string;
  first: string;
  boiler: string;
  parts: string;
  priceFrom: string;
  priceTo: string;
}

export interface IFilterCheckboxFilter {
  title: string;
  checkbox: boolean;
  id?: string;
}

export interface IFilterManufacturerAccordionProps {
  manufacturerList: IFilterCheckboxFilter[];
  title: string | false;
  setManufacturer: Event<IFilterCheckboxFilter[]>;
  updateManufacturer: Event<IFilterCheckboxFilter>;
}
