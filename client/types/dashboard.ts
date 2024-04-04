import { IProductPart } from './product-parts';

export interface IDashboardSlider {
  items: IProductPart[];
  spinner: boolean;
  goToPartPage?: boolean;
}
