import { IProductPart } from './product-parts';

export interface IDashboardSlider {
  product: IProductPart[];
  spinner: boolean;
  goToPartPage?: boolean;
}
