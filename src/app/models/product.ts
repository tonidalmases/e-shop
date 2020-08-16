import { ICategory } from './category';

export interface IProduct {
  key: string;
  name: string;
  price: number;
  category: ICategory;
  pictureUrl: string;
}
