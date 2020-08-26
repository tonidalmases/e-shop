import { QueryDocumentSnapshot } from '@angular/fire/firestore';
import { IProductData, Product } from './product';

export interface ICartProductsFirebaseData {
  [productId: string]: {
    product: IProductData;
    quantity: number;
  };
}

export interface ICartProductData {
  product: IProductData;
  quantity: number;
}

export class CartProduct {
  constructor(
    public product: Product,
    public quantity: number,
    public id?: string
  ) {}

  get price(): number {
    return this.quantity * this.product.price;
  }

  static getCartProductFromSnapshot(
    snapshot: QueryDocumentSnapshot<ICartProductData>
  ): CartProduct {
    return new CartProduct(
      Product.getProduct(snapshot.data().product),
      snapshot.data().quantity,
      snapshot.id
    );
  }

  static getCartProduct(cartProductData: ICartProductData): CartProduct {
    return new CartProduct(
      Product.getProduct(cartProductData.product),
      cartProductData.quantity
    );
  }

  static getCartProducts(cartProductsData: ICartProductData[]): CartProduct[] {
    return cartProductsData
      ? cartProductsData.map((cpd) => CartProduct.getCartProduct(cpd))
      : [];
  }

  static getCartProductData(cartProduct: CartProduct): ICartProductData {
    return {
      product: Product.getProductData(cartProduct.product),
      quantity: cartProduct.quantity,
    };
  }

  static getCartProductsData(cartProducts: CartProduct[]): ICartProductData[] {
    return cartProducts
      ? cartProducts.map((cp) => CartProduct.getCartProductData(cp))
      : [];
  }
}
