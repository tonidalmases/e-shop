import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from 'src/app/models/order';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.scss'],
})
export class AdminOrdersComponent implements OnInit {
  orders$: Observable<Order[]>;

  page = 1;
  pageSize = 5;
  itemsPerPage = [5, 10, 20];

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.orders$ = this.orderService.getOrders();
  }
}
