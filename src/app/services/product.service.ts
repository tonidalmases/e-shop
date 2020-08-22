import { Injectable } from '@angular/core';
import { DocumentReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IProductData, Product } from '../models/product';
import { FirebaseService } from './firebase.service';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private readonly productsPath = '/products/';

  constructor(private firebaseService: FirebaseService) {}

  public getProducts(): Observable<Product[]> {
    return this.firebaseService.list<IProductData>(this.productsPath).pipe(
      map((snapshots) =>
        snapshots.map((snapshot) => {
          return Product.getProductFromSnapshot(snapshot);
        })
      )
    );
  }

  public addProduct(product: Product): Promise<DocumentReference> {
    const productData = Product.getProductData(product);
    return this.firebaseService.add<IProductData>(
      this.productsPath,
      productData
    );
  }

  public updateProduct(product: Product): Promise<void> {
    const productData = Product.getProductData(product);
    return this.firebaseService.update(
      this.productsPath,
      product.id,
      productData
    );
  }

  public deleteProduct(id: string): void {
    this.firebaseService.delete<IProductData>(this.productsPath, id);
  }

  public getProduct(id: string): Observable<Product> {
    return this.firebaseService
      .get<IProductData>(this.productsPath, id)
      .pipe(map((snapshot) => Product.getProductFromSnapshot(snapshot)));
  }
}
