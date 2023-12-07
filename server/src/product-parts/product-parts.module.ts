import { Module } from '@nestjs/common';
import { ProductPartsController } from './product-parts.controller';
import { ProductPartsService } from './product-parts.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { ProductParts } from './product-parts.model';

@Module({
  imports: [SequelizeModule.forFeature([ProductParts])],
  controllers: [ProductPartsController],
  providers: [ProductPartsService],
  exports: [ProductPartsService],
})
export class ProductPartsModule {}
