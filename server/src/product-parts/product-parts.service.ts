import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ProductParts } from './product-parts.model';
import { IProductPartsQuery } from './types';
import { Op } from 'sequelize';

@Injectable()
export class ProductPartsService {
  constructor(
    @InjectModel(ProductParts)
    private productParamsModel: typeof ProductParts,
  ) {}

  async paginateAndFilter(
    query: IProductPartsQuery,
  ): Promise<{ count: number; rows: ProductParts[] }> {
    const limit = +query.limit;
    const offset = +query.offset * 20;

    return this.productParamsModel.findAndCountAll({ limit, offset });
  }

  async bestsellers(): Promise<{ count: number; rows: ProductParts[] }> {
    return this.productParamsModel.findAndCountAll({
      where: { bestseller: true },
    });
  }

  async new(): Promise<{ count: number; rows: ProductParts[] }> {
    return this.productParamsModel.findAndCountAll({
      where: { new: true },
    });
  }

  async findOne(id: number | string): Promise<ProductParts> {
    return this.productParamsModel.findOne({
      where: { id },
    });
  }

  async findOneByName(name: string): Promise<ProductParts> {
    return this.productParamsModel.findOne({
      where: { name },
    });
  }

  async searchByString(
    str: string,
  ): Promise<{ count: number; rows: ProductParts[] }> {
    return this.productParamsModel.findAndCountAll({
      limit: 20,
      where: { name: { [Op.like]: `%${str}%` } },
    });
  }
}
