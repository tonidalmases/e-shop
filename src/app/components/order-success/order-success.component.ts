import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { CartHelper } from 'src/app/helpers/cart.helper';
import { CartProduct } from 'src/app/models/cart-product';
import { Order } from 'src/app/models/order';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-order-success',
  templateUrl: './order-success.component.html',
  styleUrls: ['./order-success.component.scss'],
})
export class OrderSuccessComponent implements OnInit {
  order$: Observable<Order>;

  constructor(
    private orderService: OrderService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const orderId = this.route.snapshot.paramMap.get('id');

    if (orderId) {
      this.order$ = this.orderService.getOrder(orderId);
    }
  }

  getTotalProductPrice(cartProduct: CartProduct): number {
    return CartHelper.getTotalProductPrice(cartProduct);
  }

  getTotalProductsPrice(cartProducts: CartProduct[]): number {
    return CartHelper.getTotalProductsPrice(cartProducts);
  }
}
