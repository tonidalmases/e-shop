import { of } from 'rxjs';
import { OrderService } from 'src/app/services/order.service';
import { FakeModels } from 'src/app/testing/fake-models';
import { AdminOrdersComponent } from './admin-orders.component';

describe('AdminOrdersComponent: Integrated', () => {
  let component: AdminOrdersComponent;

  let orderServiceSpy: jasmine.SpyObj<OrderService>;

  beforeEach(() => {
    orderServiceSpy = jasmine.createSpyObj<OrderService>(['getOrders']);

    component = new AdminOrdersComponent(orderServiceSpy);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Function: ngOnInit', () => {
    it('should call getOrders', () => {
      const fakeOrders = FakeModels.getOrders();
      orderServiceSpy.getOrders.and.returnValue(of(fakeOrders));

      component.ngOnInit();

      expect(orderServiceSpy.getOrders).toHaveBeenCalled();
      component.orders$.subscribe((orders) => {
        expect(orders).toEqual(fakeOrders);
      });
    });
  });
});
