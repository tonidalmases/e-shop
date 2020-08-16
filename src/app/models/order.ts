import { ICartProduct } from './cart-product';
import { IShipping } from './shipping';

export class Order {
  dateOrder: number;

  constructor(
    public userKey: string,
    public shipping: IShipping,
    public cartProducts: ICartProduct[]
  ) {
    this.dateOrder = new Date().getTime();
  }
}
