import { Cart } from '../models/cart';
import { CartProduct } from '../models/cart-product';
import { Category } from '../models/category';
import { Order } from '../models/order';
import { Product } from '../models/product';
import { Shipping } from '../models/shipping';
import { User } from '../models/user';

export class FakeModels {
  public static getOrders(): Order[] {
    return [this.getOrder()];
  }

  public static getOrder(): Order {
    return new Order(
      new Date().getTime(),
      this.getUser(),
      this.getShipping(),
      this.getCart(),
      'orderId'
    );
  }

  public static getUser(): User {
    return new User('userName', 'email@email.com', false, 'id');
  }

  public static getShipping(): Shipping {
    return new Shipping('shippingName', 'address', 'city', '12345', 'country');
  }

  public static getCart(): Cart {
    return new Cart(new Date().getTime(), this.getCartProducts(), 'cartId');
  }

  public static getCartProducts(): CartProduct[] {
    return [this.getCartProduct()];
  }

  public static getCartProduct(): CartProduct {
    return new CartProduct(this.getProduct(), 2, 'cartProductId');
  }

  public static getProduct(): Product {
    return new Product(
      'productName',
      2,
      this.getCategory(),
      'picture',
      'productId'
    );
  }

  public static getCategory(): Category {
    return new Category('categoryName', 'categoryId');
  }
}
