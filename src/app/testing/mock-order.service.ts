import { Observable, of } from 'rxjs';
import { Order } from '../models/order';
import { FakeModels } from './fake-models';

export class MockOrderService {
  getOrders(): Observable<Order[]> {
    return of(FakeModels.getOrders());
  }
}
