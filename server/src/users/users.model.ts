import { DataType, Table, Model, Column } from 'sequelize-typescript';

@Table
export class User extends Model {
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  username: string;

  @Column({ type: DataType.STRING, allowNull: false })
  password: string;

  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  email: string;
}
