import * as bcrypt from 'bcrypt';
import { INestApplication } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { Test, TestingModule } from '@nestjs/testing';
import { User } from 'src/users/users.model';
import { Dialect } from 'sequelize';
import { ProductPartsService } from 'src/product-parts/product-parts.service';
import { ProductPartsModule } from 'src/product-parts/product-parts.module';

describe('Product Parts Service', () => {
  let app: INestApplication;
  let productPartsService: ProductPartsService;

  beforeEach(async () => {
    const testModule: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          envFilePath: `.${process.env.NODE_ENV}.env`,
        }),
        SequelizeModule.forRoot({
          dialect: <Dialect>process.env.SQL_DIALECT || 'mysql',
          host: process.env.DB_HOST,
          port: Number(process.env.DB_PORT),
          username: process.env.DB_USER,
          password: process.env.DB_PASSWORD,
          database: process.env.DB_NAME,
          models: [User],
          autoLoadModels: true,
        }),
        ProductPartsModule,
      ],
    }).compile();

    productPartsService =
      testModule.get<ProductPartsService>(ProductPartsService);
    app = testModule.createNestApplication();

    await app.init();
  });

  it('should find by id', async () => {
    const part = await productPartsService.findOne(1);

    expect(part.dataValues).toEqual(
      expect.objectContaining({
        id: 1,
        price: expect.any(Number),
        product_manufacturer: expect.any(String),
        part_manufacturer: expect.any(String),
        vendor_code: expect.any(String),
        name: expect.any(String),
        description: expect.any(String),
        images: expect.any(String),
        in_stock: expect.any(Number),
        bestseller: expect.any(Boolean),
        new: expect.any(Boolean),
        popularity: expect.any(Number),
        compatibility: expect.any(String),
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
      }),
    );
  });
});
