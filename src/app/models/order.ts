import { ICartProduct } from './cart-product';
import { IShipping } from './shipping';

export interface IOrder {
  key?: string;
  dateOrder: number;
  userKey: string;
  shipping: IShipping;
  cartProducts: ICartProduct[];
}
