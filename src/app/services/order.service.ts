import { Injectable } from '@angular/core';
import { Order } from '../models/order';
import { FirebaseService } from './firebase.service';
import { ShoppingCartService } from './shopping-cart.service';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private readonly ordersPath = '/orders/';

  constructor(
    private firebaseService: FirebaseService,
    private shoppingCartService: ShoppingCartService
  ) {}

  async placeOrder(order: Order): Promise<string> {
    const result = await this.firebaseService.add(this.ordersPath, order);
    this.shoppingCartService.clearShoppingCart();
    return result.key;
  }
}
