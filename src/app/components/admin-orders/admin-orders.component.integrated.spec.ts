import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { OrderService } from 'src/app/services/order.service';
import { MockOrderService } from '../../testing/mock-order.service';
import { AdminOrdersComponent } from './admin-orders.component';

describe('AdminOrdersComponent: Integrated', () => {
  let component: AdminOrdersComponent;
  let fixture: ComponentFixture<AdminOrdersComponent>;
  let debugElement: DebugElement;

  let orderService: MockOrderService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AdminOrdersComponent],
      providers: [
        MockOrderService,
        { provide: OrderService, useClass: MockOrderService },
      ],
      imports: [FormsModule, NgbModule, RouterTestingModule],
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

  it('should contain a table with more than 1 row', () => {
    fixture.detectChanges();

    const rows = debugElement.queryAll(By.css('tr'));

    expect(rows.length).toBeGreaterThan(1);
  });
});
