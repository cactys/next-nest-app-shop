import { ApiProperty } from '@nestjs/swagger';

export class MakePaymentResponse {
  @ApiProperty({ example: '2d08f1cc-000f-5000-8000-1a4db8b00de6' })
  id: string;

  @ApiProperty({ example: 'pending' })
  status: string;

  @ApiProperty({ example: { value: '1000.00', currency: 'RUB' } })
  amount: { value: string; currency: string };

  @ApiProperty({ example: 'Заказ №1' })
  description: string;

  @ApiProperty({ example: { account_id: '291659', gateway_id: '2156154' } })
  recipient: {
    account_id: string;
    gateway_id: string;
  };

  @ApiProperty({ example: '2023-12-11T10:01:48.145Z' })
  created_at: string;

  @ApiProperty({
    example: {
      type: 'redirect',
      confirmation_url:
        'https://yoomoney.ru/checkout/payments/v2/contract?orderId=2d08f1cc-000f-5000-8000-1a4db8b00de6',
    },
  })
  confirmation: {
    type: string;
    confirmation_url: string;
  };

  @ApiProperty({ example: true })
  test: boolean;

  @ApiProperty({ example: false })
  paid: boolean;

  @ApiProperty({ example: false })
  refundable: boolean;

  @ApiProperty({ example: {} })
  metadata: object;
}
