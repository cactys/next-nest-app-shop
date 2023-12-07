import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { ProductPartsService } from './product-parts.service';
import { AuthenticatedGuard } from 'src/auth/authenticated.guard';

@Controller('product-parts')
export class ProductPartsController {
  constructor(private readonly productPartsService: ProductPartsService) {}

  @UseGuards(AuthenticatedGuard)
  @Get()
  paginateAndFilter(@Query() query) {
    return this.productPartsService.paginateAndFilter(query);
  }

  @UseGuards(AuthenticatedGuard)
  @Get('find/:id')
  getOne(@Param('id') id: string) {
    return this.productPartsService.findOne(id);
  }
}
