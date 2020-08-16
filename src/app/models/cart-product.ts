import { IProduct } from './product';

export interface ICartProduct {
  key: string;
  product: IProduct;
  quantity: number;
}
