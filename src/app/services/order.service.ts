import { Injectable } from '@angular/core';
import { IOrder } from '../models/order';
import { FirebaseService } from './firebase.service';
import { ShoppingCartService } from './shopping-cart.service';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private readonly ordersPath = '/orders/';

  constructor(
    private firebaseService: FirebaseService,
    private shoppingCartService: ShoppingCartService,
    private authService: AuthService
  ) {}

  async placeOrder(order: IOrder): Promise<string> {
    const result = await this.firebaseService.add(this.ordersPath, order);
    this.shoppingCartService.clearShoppingCart();
    return result.key;
  }

  getOrder(key: string): Observable<IOrder> {
    return this.firebaseService.get<IOrder>(this.ordersPath, key);
  }

  getOrders(): Observable<IOrder[]> {
    return this.firebaseService.list<IOrder>(this.ordersPath);
  }

  getOrdersByUser(): Observable<IOrder[]> {
    return this.authService.appUser$.pipe(
      switchMap((user) =>
        this.firebaseService.list<IOrder>(this.ordersPath, (ref) =>
          ref.orderByChild('userKey').equalTo(user.key)
        )
      )
    );
  }
}
