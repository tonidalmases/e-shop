import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { ICategory } from '../models/category';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { FirebaseService } from './firebase.service';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private readonly categoriesPath = '/categories/';

  constructor(private firebaseService: FirebaseService) {}

  public getCategories(): Observable<ICategory[]> {
    return this.firebaseService.list<ICategory>(this.categoriesPath);
  }

  public getCategoryAll(): ICategory {
    return {
      key: 'all',
      name: 'All categories',
    };
  }
}
