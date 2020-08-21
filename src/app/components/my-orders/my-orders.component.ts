import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IOrder } from 'src/app/models/order';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.scss'],
})
export class MyOrdersComponent implements OnInit {
  orders$: Observable<IOrder[]>;

  page = 1;
  pageSize = 5;
  itemsPerPage = [5, 10, 20];

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.orders$ = this.orderService.getOrdersByUser();
  }
}
