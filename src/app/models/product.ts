import { QueryDocumentSnapshot } from '@angular/fire/firestore';
import { Category, ICategoryData } from './category';

export interface IProductData {
  name: string;
  price: number;
  category: ICategoryData;
  pictureUrl: string;
}

export class Product {
  constructor(
    public name: string,
    public price: number,
    public category: Category,
    public pictureUrl: string,
    public id?: string
  ) {}

  static getProductFromSnapshot(
    snapshot: QueryDocumentSnapshot<IProductData>
  ): Product {
    return new Product(
      snapshot.data().name,
      snapshot.data().price,
      Category.getCategory(snapshot.data().category),
      snapshot.data().pictureUrl,
      snapshot.id
    );
  }

  static getProduct(productData: IProductData): Product {
    return new Product(
      productData.name,
      productData.price,
      Category.getCategory(productData.category),
      productData.pictureUrl
    );
  }

  static getProductData(product: Product): IProductData {
    return {
      name: product.name,
      price: product.price,
      category: Category.getCategoryData(product.category),
      pictureUrl: product.pictureUrl,
    };
  }
}
