import {
  CartProduct,
  ICartProductData,
  ICartProductsFirebaseData,
} from './cart-product';

export interface ICartFirebaseData {
  dateCreated: number;
  cartProducts?: ICartProductsFirebaseData;
}

export interface ICartData {
  dateCreated: number;
  cartProducts?: ICartProductData[];
}

export class Cart {
  constructor(
    public dateCreated: number,
    public cartProducts: CartProduct[],
    public id?: string
  ) {}

  get quantity(): number {
    return this.cartProducts
      ? this.cartProducts.reduce(
          (acc, cartProduct) => acc + (cartProduct.quantity || 0),
          0
        )
      : 0;
  }

  get price(): number {
    return this.cartProducts
      ? this.cartProducts.reduce(
          (acc, cartProduct) => acc + (cartProduct.price || 0),
          0
        )
      : 0;
  }

  static getCart(cartData: ICartData): Cart {
    return new Cart(
      cartData.dateCreated,
      CartProduct.getCartProducts(cartData.cartProducts)
    );
  }

  static getCartData(cart: Cart): ICartData {
    return {
      dateCreated: cart.dateCreated,
      cartProducts: CartProduct.getCartProductsData(cart.cartProducts),
    };
  }
}
