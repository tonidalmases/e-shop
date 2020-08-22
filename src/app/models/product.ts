import { QueryDocumentSnapshot } from '@angular/fire/firestore';
import { Category, ICategoryData } from './category';

export interface IProductData {
  name: string;
  price: number;
  category: ICategoryData;
  pictureUrl: string;
}

export class Product {
  id?: string;
  name: string;
  price: number;
  category: Category;
  pictureUrl: string;

  static getProductFromSnapshot(
    snapshot: QueryDocumentSnapshot<IProductData>
  ): Product {
    return {
      id: snapshot.id,
      name: snapshot.data().name,
      price: snapshot.data().price,
      category: Category.getCategory(snapshot.data().category),
      pictureUrl: snapshot.data().pictureUrl,
    };
  }

  static getProduct(productData: IProductData): Product {
    return {
      name: productData.name,
      price: productData.price,
      category: Category.getCategory(productData.category),
      pictureUrl: productData.pictureUrl,
    };
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
