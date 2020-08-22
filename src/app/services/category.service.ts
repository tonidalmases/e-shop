import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Category, ICategoryData } from '../models/category';
import { FirebaseService } from './firebase.service';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private readonly categoriesPath = '/categories/';

  constructor(private firebaseService: FirebaseService) {}

  public getCategories(): Observable<Category[]> {
    return this.firebaseService
      .list<ICategoryData>(this.categoriesPath)
      .pipe(
        map((snapshots) =>
          snapshots.map((snapshot) =>
            Category.getCategoryFromSnapshot(snapshot)
          )
        )
      );
  }

  public getCategoryAll(): Category {
    return {
      id: 'all',
      name: 'All categories',
    };
  }
}
