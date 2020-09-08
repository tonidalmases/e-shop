import { Observable, of } from 'rxjs';
import { Product } from '../models/product';
import { FakeModels } from './fake-models';

export class MockProductService {
  getProduct(): Observable<Product> {
    return of(FakeModels.getProduct());
  }
}
