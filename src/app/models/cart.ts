import { QueryDocumentSnapshot } from '@angular/fire/firestore';
import { CartProduct } from './cart-product';
import { IProductData } from './product';

export interface ICartProductsFirebaseData {
  [productId: string]: {
    product: IProductData;
    quantity: number;
  };
}

export interface ICartData {
  dateCreated: number;
  products?: ICartProductsFirebaseData;
}

export class Cart {
  id: string;
  dateCreated: number;
  products?: CartProduct[];

  static getCartFromSnapshot(snapshot: QueryDocumentSnapshot<ICartData>): Cart {
    return {
      id: snapshot.id,
      dateCreated: snapshot.data().dateCreated,
    };
  }

  static getCartProducts(products: ICartProductsFirebaseData): CartProduct[] {
    const cartProducts: CartProduct[] = [];
    for (const productId in products) {
      if (productId) {
        cartProducts.push({
          id: productId,
          ...products[productId],
        });
      }
    }
    return cartProducts;
  }

  // NOT WORKING

  // getQuantity?(): number {
  //   return this.products
  //     ? this.products.reduce(
  //         (acc, cartProduct) => acc + (cartProduct.quantity || 0),
  //         0
  //       )
  //     : 0;
  // }

  // getPrice?(): number {
  //   return this.products
  //     ? this.products.reduce(
  //         (acc, cartProduct) => acc + (cartProduct.getPrice() || 0),
  //         0
  //       )
  //     : 0;
  // }
}
