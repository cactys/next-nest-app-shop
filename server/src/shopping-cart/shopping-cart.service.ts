import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ShoppingCart } from './shopping-cart.model';
import { UsersService } from 'src/users/users.service';
import { ProductPartsService } from 'src/product-parts/product-parts.service';
import { AddToCartDto } from './dto/add-to-cart.dto';

@Injectable()
export class ShoppingCartService {
  constructor(
    @InjectModel(ShoppingCart)
    private shoppingCartsModel: typeof ShoppingCart,
    private readonly usersService: UsersService,
    private readonly productPartsService: ProductPartsService,
  ) {}

  async findAll(userId: number | string): Promise<ShoppingCart[]> {
    return this.shoppingCartsModel.findAll({ where: { userId } });
  }

  async add(addToCartDto: AddToCartDto) {
    const cart = new ShoppingCart();
    const user = this.usersService.findOne({
      where: { username: addToCartDto.username },
    });
    const part = this.productPartsService.findOne(addToCartDto.partId);

    cart.userId = (await user).id;
    cart.partId = (await part).id;
    cart.product_manufacturer = (await part).product_manufacturer;
    cart.part_manufacturer = (await part).part_manufacturer;
    cart.price = (await part).price;
    cart.in_stock = (await part).in_stock;
    cart.images = JSON.stringify((await part).images)[0];
    cart.name = (await part).name;
    cart.total_price = (await part).price;

    return cart.save();
  }
}
