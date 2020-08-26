import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { IOrderData, Order } from '../models/order';
import { AuthService } from './auth.service';
import { FirebaseService } from './firebase.service';
import { ShoppingCartService } from './shopping-cart.service';

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

  async placeOrder(order: Order): Promise<string> {
    const orderData = Order.getOrderData(order);

    const dr = await this.firebaseService.add(this.ordersPath, orderData);
    this.shoppingCartService.clearShoppingCart();

    return dr.id;
  }

  getOrder(id: string): Observable<Order> {
    return this.firebaseService
      .get<IOrderData>(this.ordersPath, id)
      .pipe(map((snapshot) => Order.getOrderFromSnapshot(snapshot)));
  }

  getOrders(): Observable<Order[]> {
    return this.firebaseService
      .list<IOrderData>(this.ordersPath)
      .pipe(
        map((snapshots) =>
          snapshots.map((snapshot) => Order.getOrderFromSnapshot(snapshot))
        )
      );
  }

  getOrdersByUser(): Observable<Order[]> {
    return this.authService.user$.pipe(
      switchMap((user) =>
        this.firebaseService.list<IOrderData>(this.ordersPath, (ref) => {
          return ref.where('user.id', '==', user.id);
        })
      ),
      map((snapshots) =>
        snapshots.map((snapshot) => Order.getOrderFromSnapshot(snapshot))
      )
    );
  }
}
