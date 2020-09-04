import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { OrderService } from 'src/app/services/order.service';
import { MockOrderService } from '../../testing/mock-order.service';
import { MockRouterLinkDirective } from '../../testing/mock-router-link.directive';
import { AdminOrdersComponent } from './admin-orders.component';

describe('AdminOrdersComponent: Integrated', () => {
  let component: AdminOrdersComponent;
  let fixture: ComponentFixture<AdminOrdersComponent>;
  let debugElement: DebugElement;

  let orderService: MockOrderService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AdminOrdersComponent, MockRouterLinkDirective],
      providers: [
        MockOrderService,
        { provide: OrderService, useClass: MockOrderService },
      ],
      imports: [FormsModule, NgbModule],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminOrdersComponent);
    debugElement = fixture.debugElement;
    component = fixture.componentInstance;

    orderService = TestBed.inject(MockOrderService);
  }));

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should contain a table with at least 2 rows', () => {
    fixture.detectChanges();

    const rows = debugElement.queryAll(By.css('tr'));

    expect(rows.length).toBeGreaterThan(1);
  });
});
