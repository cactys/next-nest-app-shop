import { IProductPart } from './product-parts';

export interface IDashboardSlider {
  items: IProductPart[];
  spinner: boolean;
  goToPartPage?: boolean;
}

export interface ICartAlertProps {
  count: number;
  closeAlert: VoidFunction;
}
