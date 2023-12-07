import { Table, Model, Column } from 'sequelize-typescript';

@Table({ tableName: 'productparts' })
export class ProductParts extends Model {
  @Column
  product_manufacturer: string;

  @Column({ defaultValue: 0 })
  price: number;

  @Column
  part_manufacturer: string;

  @Column
  vendor_code: string;

  @Column
  name: string;

  @Column
  description: string;

  @Column
  images: string;

  @Column({ defaultValue: 0 })
  in_stock: number;

  @Column({ defaultValue: false })
  bestseller: boolean;

  @Column({ defaultValue: false })
  new: boolean;

  @Column
  popularity: number;

  @Column
  compatibility: string;
}
