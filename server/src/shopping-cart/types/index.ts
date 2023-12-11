import { ApiProperty } from '@nestjs/swagger';

class ShoppingCartItem {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 4 })
  userId: number;

  @ApiProperty({ example: 2 })
  partId: number;

  @ApiProperty({ example: 'Northwest' })
  product_manufacturer: string;

  @ApiProperty({ example: 4745 })
  price: number;

  @ApiProperty({ example: 'Sensor' })
  part_manufacturer: string;

  @ApiProperty({ example: 'Copia alius.' })
  name: string;

  @ApiProperty({
    example:
      'https://loremflickr.com/640/480/electricalequipment?lock=29146583400448?random=297453393857853201518314986310',
  })
  images: string;

  @ApiProperty({ example: 9 })
  in_stock: number;

  @ApiProperty({ example: 4 })
  count: number;

  @ApiProperty({ example: 9490 })
  total_price: number;

  @ApiProperty({ example: '2023-12-11T09:16:08.000Z' })
  createdAt: string;

  @ApiProperty({ example: '2023-12-11T09:16:08.000Z' })
  updatedAt: string;
}

export class GetAllResponse extends ShoppingCartItem {}

export class AddToCardResponse extends ShoppingCartItem {}

export class UpdateCountResponse {
  @ApiProperty({ example: 1 })
  count: number;
}

export class UpdateCountRequest {
  @ApiProperty({ example: 1 })
  count: number;
}

export class TotalPriceResponse {
  @ApiProperty({ example: 9490 })
  total_price: number;
}

export class TotalPriceRequest {
  @ApiProperty({ example: 9490 })
  total_price: number;
}
