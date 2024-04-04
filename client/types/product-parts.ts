export interface IProductPart {
  id: number;
  product_manufacturer: string;
  price: number;
  parts_manufacturer: string;
  vendor_code: string;
  name: string;
  description: string;
  images: string;
  in_stock: number;
  bestseller: boolean;
  new: boolean;
  popularity: number;
  compatibility: string;
}

export interface IProductParts {
  count: number;
  rows: IProductPart[];
}
