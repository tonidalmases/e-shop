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

  public async addToCart(product: Product): Promise<void> {
    const cartId = await this.getOrCreateCartId();

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

    this.firebaseService.runTransaction(updateTransaction);
  }

  public async removeFromCart(product: Product): Promise<void> {
    const cartId = await this.getOrCreateCartId();

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

    this.firebaseService.runTransaction(updateTransaction);
  }

  public async getShoppingCart(): Promise<Observable<Cart>> {
    const cartId = await this.getOrCreateCartId();

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

  public async clearShoppingCart(): Promise<void> {
    const cartId = await this.getOrCreateCartId();
    this.firebaseService.emptyCollection(
      this.shoppingCartsPath + cartId + this.shoppingCartProductsPath
    );
  }

  private async getOrCreateCartId(): Promise<string> {
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
}
