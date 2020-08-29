import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Cart, ICartData } from '../models/cart';
import { CartProduct, ICartProductData } from '../models/cart-product';
import { Product } from '../models/product';
import { FirebaseService } from './firebase.service';

@Injectable({
  providedIn: 'root',
})
export class ShoppingCartService {
  private readonly shoppingCartsPath = '/shopping-carts/';
  private readonly shoppingCartProductsPath = '/products/';
  private readonly localStorageCartId = 'cartId';

  constructor(private firebaseService: FirebaseService) {}

  public async initCart(): Promise<string> {
    let cartId = localStorage.getItem(this.localStorageCartId);
    if (!cartId) {
      cartId = await this.createCart();
      localStorage.setItem(this.localStorageCartId, cartId);
    }
    return cartId;
  }

  private async createCart(): Promise<string> {
    const cartData: ICartData = {
      dateCreated: new Date().getTime(),
    };
    const result = await this.firebaseService.add<ICartData>(
      this.shoppingCartsPath,
      cartData
    );
    return result.id;
  }

  private getCartId(): string {
    return localStorage.getItem('cartId');
  }

  public getShoppingCart(cartId: string): Observable<Cart> {
    return this.firebaseService
      .get<ICartData>(this.shoppingCartsPath, cartId)
      .pipe(
        switchMap((snapshotCart) => {
          return this.firebaseService
            .list<ICartProductData>(
              this.shoppingCartsPath + cartId + this.shoppingCartProductsPath
            )
            .pipe(
              map((snapshotCartProducts) => {
                const products = snapshotCartProducts.map((scp) =>
                  CartProduct.getCartProductFromSnapshot(scp)
                );

                return new Cart(
                  snapshotCart.data().dateCreated,
                  products,
                  snapshotCart.id
                );
              })
            );
        })
      );
  }

  public async addToCart(product: Product): Promise<unknown> {
    const cartId = this.getCartId();

    const docRef = this.firebaseService.getDocumentReference(
      this.shoppingCartsPath + cartId + this.shoppingCartProductsPath,
      product.id
    );

    const updateTransaction = async (
      transaction: firebase.firestore.Transaction
    ) => {
      const doc = await transaction.get(docRef);
      if (!doc.exists) {
        transaction.set(docRef, {
          product: Product.getProductData(product),
          quantity: 1,
        });
      } else {
        transaction.update(docRef, { quantity: doc.data().quantity + 1 });
      }
    };

    return this.firebaseService.runTransaction(updateTransaction);
  }

  public async removeFromCart(product: Product): Promise<unknown> {
    const cartId = this.getCartId();

    const docRef = this.firebaseService.getDocumentReference(
      this.shoppingCartsPath + cartId + this.shoppingCartProductsPath,
      product.id
    );

    const updateTransaction = async (
      transaction: firebase.firestore.Transaction
    ) => {
      const doc = await transaction.get(docRef);
      if (doc.exists) {
        if (doc.data().quantity > 1) {
          transaction.set(docRef, {
            product: Product.getProductData(product),
            quantity: doc.data().quantity - 1,
          });
        } else {
          transaction.delete(docRef);
        }
      }
    };

    return this.firebaseService.runTransaction(updateTransaction);
  }

  public async clearShoppingCart(): Promise<void> {
    const cartId = this.getCartId();
    this.firebaseService.emptyCollection(
      this.shoppingCartsPath + cartId + this.shoppingCartProductsPath
    );
  }
}
