import { faker } from '@faker-js/faker';
import { ApiProperty } from '@nestjs/swagger';
import { Op } from 'sequelize';

class ProductParts {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: faker.lorem.sentence(2) })
  product_manufacturer: string;

  @ApiProperty({ example: faker.string.numeric(6) })
  price: string;

  @ApiProperty({ example: faker.lorem.sentence(2) })
  part_manufacturer: string;

  @ApiProperty({ example: faker.internet.password() })
  vendor_code: string;

  @ApiProperty({ example: 'Cohaero ulterius.' })
  name: string;

  @ApiProperty({ example: faker.lorem.sentence(10) })
  description: string;

  @ApiProperty({
    example: faker.image.urlLoremFlickr({
      category: 'electricalequipment',
    }),
  })
  images: string;

  @ApiProperty({ example: faker.string.numeric(1) })
  in_stock: number;

  @ApiProperty({ example: true })
  bestseller: boolean;

  @ApiProperty({ example: true })
  new: boolean;

  @ApiProperty({ example: faker.string.numeric(3) })
  popularity: number;

  @ApiProperty({ example: faker.lorem.sentence(7) })
  compatibility: number;

  @ApiProperty({ example: '2023-12-08T06:11:18.000Z' })
  createdAt: string;

  @ApiProperty({ example: '2023-12-08T06:11:18.000Z' })
  updatedAt: string;
}

export class PaginateAndFilterResponse {
  @ApiProperty({ example: 10 })
  count: number;

  @ApiProperty({ type: ProductParts, isArray: true })
  rows: ProductParts;
}

export class Bestsellers extends ProductParts {
  @ApiProperty({ example: true })
  bestseller: boolean;
}

export class GetBestsellersResponse extends PaginateAndFilterResponse {
  @ApiProperty({ example: 10 })
  count: number;

  @ApiProperty({ type: ProductParts, isArray: true })
  rows: Bestsellers;
}

export class NewParts extends ProductParts {
  @ApiProperty({ example: true })
  new: boolean;
}

export class GetNewResponse extends PaginateAndFilterResponse {
  @ApiProperty({ example: 10 })
  count: number;

  @ApiProperty({ type: ProductParts, isArray: true })
  rows: NewParts;
}

export class SearchByLetterResponse extends ProductParts {
  @ApiProperty({ example: 'Cohaero ulterius.' })
  name: string;
}

export class SearchResponse extends PaginateAndFilterResponse {
  @ApiProperty({ type: SearchByLetterResponse, isArray: true })
  rows: SearchByLetterResponse;
}

export class SearchRequest {
  @ApiProperty({ example: 'h' })
  search: string;
}

export class GetByNameResponse extends ProductParts {
  @ApiProperty({ example: 'Cohaero ulterius.' })
  name: string;
}

export class GetByNameRequest {
  @ApiProperty({ example: 'Cohaero ulterius.' })
  name: string;
}

export class FindOneResponse extends ProductParts {}

export interface IProductPartsFilter {
  product_manufacturer: string | undefined;
  parts_manufacturer: string | undefined;
  price: { [Op.between]: number[] };
}

export interface IProductPartsQuery {
  limit: string;
  offset: string;
  product: string | undefined;
  parts: string | undefined;
  priceFrom: string | undefined;
  priceTo: string | undefined;
}
