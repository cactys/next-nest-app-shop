import { Table, Model, Column } from 'sequelize-typescript';

@Table({ tableName: 'shopping-cart' })
export class ShoppingCart extends Model {
  @Column
  userId: number;

  @Column
  partId: number;

  @Column
  product_manufacturer: string;

  @Column({ defaultValue: 0 })
  price: number;

  @Column
  part_manufacturer: string;

  @Column
  name: string;

  @Column
  images: string;

  @Column({ defaultValue: 0 })
  in_stock: number;

  @Column({ defaultValue: 1 })
  count: number;

  @Column({ defaultValue: 0 })
  total_price: number;
}
