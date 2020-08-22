import { CartProduct } from '../models/cart-product';

export class CartHelper {
  static getTotalProductsQuantity(cartProducts: CartProduct[]): number {
    return cartProducts
      ? cartProducts.reduce(
          (acc, cartProduct) => acc + (cartProduct.quantity || 0),
          0
        )
      : 0;
  }

  static getTotalProductPrice(cartProduct: CartProduct): number {
    return cartProduct ? cartProduct.quantity * cartProduct.product.price : 0;
  }

  static getTotalProductsPrice(cartProducts: CartProduct[]): number {
    return cartProducts
      ? cartProducts.reduce(
          (acc, cartProduct) =>
            acc + (this.getTotalProductPrice(cartProduct) || 0),
          0
        )
      : 0;
  }
}
