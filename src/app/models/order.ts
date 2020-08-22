import { QueryDocumentSnapshot } from '@angular/fire/firestore';
import { CartProduct, ICartProductData } from './cart-product';
import { IShippingData, Shipping } from './shipping';
import { IUserDataId, User } from './user';

export interface IOrderData {
  dateOrder: number;
  user: IUserDataId;
  shipping: IShippingData;
  cartProducts: ICartProductData[];
}

export class Order {
  id?: string;
  dateOrder: number;
  user: User;
  shipping: Shipping;
  cartProducts: CartProduct[];

  static getOrderFromSnapshot(
    snapshot: QueryDocumentSnapshot<IOrderData>
  ): Order {
    return {
      id: snapshot.id,
      dateOrder: snapshot.data().dateOrder,
      user: User.getUserWithId(snapshot.data().user),
      shipping: Shipping.getShipping(snapshot.data().shipping),
      cartProducts: snapshot
        .data()
        .cartProducts.map((cp) => CartProduct.getCartProduct(cp)),
    };
  }

  static getOrderData(order: Order): IOrderData {
    return {
      dateOrder: order.dateOrder,
      user: User.getUserDataWithId(order.user),
      shipping: Shipping.getShippingData(order.shipping),
      cartProducts: order.cartProducts.map((cp) =>
        CartProduct.getCartProductData(cp)
      ),
    };
  }
}
