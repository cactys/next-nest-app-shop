import { Table, Model, Column } from 'sequelize-typescript';

@Table({ tableName: 'users' })
export class User extends Model {
  @Column
  username: string;

  @Column
  password: string;

  @Column
  email: string;
}
