import { Observable, of } from 'rxjs';
import { Category } from '../models/category';
import { FakeModels } from './fake-models';

export class MockCategoryService {
  getCategories(): Observable<Category[]> {
    return of(FakeModels.getCategories());
  }
}
