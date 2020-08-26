import {
  CartProduct,
  ICartProductData,
  ICartProductsFirebaseData,
} from './cart-product';

export interface ICartFirebaseData {
  dateCreated: number;
  products?: ICartProductsFirebaseData;
}

export interface ICartData {
  dateCreated: number;
  products?: ICartProductData[];
}

export class Cart {
  constructor(
    public dateCreated: number,
    public products: CartProduct[],
    public id?: string
  ) {}

  get quantity(): number {
    return this.products
      ? this.products.reduce(
          (acc, cartProduct) => acc + (cartProduct.quantity || 0),
          0
        )
      : 0;
  }

  get price(): number {
    return this.products
      ? this.products.reduce(
          (acc, cartProduct) => acc + (cartProduct.price || 0),
          0
        )
      : 0;
  }

  static getCart(cartData: ICartData): Cart {
    return new Cart(
      cartData.dateCreated,
      CartProduct.getCartProducts(cartData.products)
    );
  }

  static getCartData(cart: Cart): ICartData {
    return {
      dateCreated: cart.dateCreated,
      products: CartProduct.getCartProductsData(cart.products),
    };
  }
}
