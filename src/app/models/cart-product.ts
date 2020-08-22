import { QueryDocumentSnapshot } from '@angular/fire/firestore';
import { IProductData, Product } from './product';

export interface ICartProductData {
  product: IProductData;
  quantity: number;
}

export class CartProduct {
  id?: string;
  product: Product;
  quantity: number;

  static getCartProductFromSnapshot(
    snapshot: QueryDocumentSnapshot<ICartProductData>
  ): CartProduct {
    return {
      id: snapshot.id,
      product: Product.getProduct(snapshot.data().product),
      quantity: snapshot.data().quantity,
    };
  }

  static getCartProduct(cartProductData: ICartProductData): CartProduct {
    return {
      product: Product.getProduct(cartProductData.product),
      quantity: cartProductData.quantity,
    };
  }

  static getCartProductData(cartProduct: CartProduct): ICartProductData {
    return {
      product: Product.getProductData(cartProduct.product),
      quantity: cartProduct.quantity,
    };
  }

  // NOT WORKING

  // getPrice?(): number {
  //   return this.quantity * this.product.price;
  // }
}
