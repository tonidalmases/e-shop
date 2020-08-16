import { ICartProduct } from '../models/cart-product';

export class CartHelper {
  static getTotalProductsQuantity(cartProducts: ICartProduct[]): number {
    return cartProducts
      ? cartProducts.reduce(
          (acc, cartProduct) => acc + (cartProduct.quantity || 0),
          0
        )
      : 0;
  }

  static getTotalProductPrice(cartProduct: ICartProduct): number {
    return cartProduct ? cartProduct.quantity * cartProduct.product.price : 0;
  }

  static getTotalProductsPrice(cartProducts: ICartProduct[]): number {
    return cartProducts
      ? cartProducts.reduce(
          (acc, cartProduct) =>
            acc + (this.getTotalProductPrice(cartProduct) || 0),
          0
        )
      : 0;
  }
}
