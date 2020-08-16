import { Injectable } from '@angular/core';
import { ICart, ICartFirebase } from '../models/cart';
import { IProduct } from '../models/product';
import { FirebaseService } from './firebase.service';
import { Observable } from 'rxjs';
import { ICartProduct } from '../models/cart-product';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ShoppingCartService {
  private readonly shoppingCartsPath = '/shopping-carts/';
  private readonly shoppingCartProductsPath = '/products/';
  private readonly localStorageCartId = 'cartId';

  constructor(private firebaseService: FirebaseService) {}

  public async addToCart(product: IProduct): Promise<void> {
    this.cartTransaction(product, (data) => ({
      product,
      quantity: (data?.quantity || 0) + 1,
    }));
  }

  public async removeFromCart(product: IProduct): Promise<void> {
    this.cartTransaction(product, (data) =>
      data && data.quantity > 1
        ? { product, quantity: data.quantity - 1 }
        : null
    );
  }

  public async getShoppingCart(): Promise<Observable<ICart>> {
    const cartKey = await this.getOrCreateCartKey();

    return this.firebaseService
      .get<ICartFirebase>(this.shoppingCartsPath, cartKey)
      .pipe(
        map((cartFirebase) => {
          const cart: ICart = {
            key: cartFirebase.key,
            dateCreated: cartFirebase.dateCreated,
            products: [],
          };
          for (const productId in cartFirebase.products) {
            if (productId) {
              cart.products.push({
                key: productId,
                ...cartFirebase.products[productId],
              });
            }
          }
          return cart;
        })
      );
  }

  public async clearShoppingCart(): Promise<void> {
    const cartKey = await this.getOrCreateCartKey();
    this.firebaseService.delete(this.shoppingCartsPath + cartKey, '/products/');
  }

  private async cartTransaction(
    product: IProduct,
    transactionUpdate: (data: ICartProduct) => any
  ): Promise<void> {
    const cartKey = await this.getOrCreateCartKey();

    this.firebaseService.transaction<ICartProduct>(
      this.shoppingCartsPath +
        cartKey +
        this.shoppingCartProductsPath +
        product.key,
      transactionUpdate
    );
  }

  private async getOrCreateCartKey(): Promise<string> {
    const cartId = localStorage.getItem(this.localStorageCartId);
    if (!cartId) {
      const result = await this.createCart();
      localStorage.setItem(this.localStorageCartId, result.key);
      return result.key;
    }
    return cartId;
  }

  private createCart(): firebase.database.ThenableReference {
    const cart: ICart = {
      dateCreated: new Date().getTime(),
    };
    return this.firebaseService.add<ICart>(this.shoppingCartsPath, cart);
  }
}
