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

  async add({ username, partId }: AddToCartDto) {
    const cart = new ShoppingCart();
    const user = await this.usersService.findOne({
      where: { username: username },
    });
    const part = await this.productPartsService.findOne(partId);

    cart.userId = user.id;
    cart.partId = part.id;
    cart.product_manufacturer = part.product_manufacturer;
    cart.part_manufacturer = part.part_manufacturer;
    cart.price = part.price;
    cart.in_stock = part.in_stock;
    cart.images = JSON.parse(part.images)[0];
    cart.name = part.name;
    cart.total_price = part.price;

    return cart.save();
  }

  async updateCount(
    count: number,
    partId: number | string,
  ): Promise<{ count: number }> {
    await this.shoppingCartsModel.update({ count }, { where: { partId } });

    const part = await this.shoppingCartsModel.findOne({ where: { partId } });

    return { count: part.count };
  }

  async updateTotalPrice(
    total_price: number,
    partId: number | string,
  ): Promise<{ total_price: number }> {
    await this.shoppingCartsModel.update(
      { total_price },
      { where: { partId } },
    );

    const part = await this.shoppingCartsModel.findOne({ where: { partId } });

    return { total_price: part.count };
  }

  async remove(partId: number | string): Promise<void> {
    const part = await this.shoppingCartsModel.findOne({ where: { partId } });

    await part.destroy();
  }

  async removeAll(userId: number | string): Promise<void> {
    await this.shoppingCartsModel.destroy({ where: { userId } });
  }
}
