import { ICartProduct } from './cart-product';
import { IProduct } from './product';

export class ICart {
  key?: string;
  dateCreated: number;
  products?: ICartProduct[];
}

export interface ICartFirebase {
  key: string;
  dateCreated: number;
  products: {
    [productKey: string]: {
      product: IProduct;
      quantity: number;
    };
  };
}
