import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProduct } from '../models/product';
import { FirebaseService } from './firebase.service';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private readonly productsPath = '/products/';

  constructor(private firebaseService: FirebaseService) {}

  public getProducts(): Observable<IProduct[]> {
    return this.firebaseService.list<IProduct>(this.productsPath);
  }

  public addProduct(product: IProduct): void {
    this.firebaseService.add<IProduct>(this.productsPath, product);
  }

  public updateProduct(product: IProduct): void {
    this.firebaseService.update<IProduct>(this.productsPath, product);
  }

  public deleteProduct(key: string): void {
    this.firebaseService.delete<IProduct>(this.productsPath, key);
  }

  public getProduct(key: string): Observable<IProduct> {
    return this.firebaseService.get<IProduct>(this.productsPath, key);
  }
}
