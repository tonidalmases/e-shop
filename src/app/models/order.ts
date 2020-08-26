import { QueryDocumentSnapshot } from '@angular/fire/firestore';
import { Cart, ICartData } from './cart';
import { IShippingData, Shipping } from './shipping';
import { IUserDataId, User } from './user';

export interface IOrderData {
  dateOrder: number;
  user: IUserDataId;
  shipping: IShippingData;
  cart: ICartData;
}

export class Order {
  constructor(
    public dateOrder: number,
    public user: User,
    public shipping: Shipping,
    public cart: Cart,
    public id?: string
  ) {}

  static getOrderFromSnapshot(
    snapshot: QueryDocumentSnapshot<IOrderData>
  ): Order {
    return new Order(
      snapshot.data().dateOrder,
      User.getUserWithId(snapshot.data().user),
      Shipping.getShipping(snapshot.data().shipping),
      Cart.getCart(snapshot.data().cart),
      snapshot.id
    );
  }

  static getOrderData(order: Order): IOrderData {
    return {
      dateOrder: order.dateOrder,
      user: User.getUserDataWithId(order.user),
      shipping: Shipping.getShippingData(order.shipping),
      cart: Cart.getCartData(order.cart),
    };
  }
}
