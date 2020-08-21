import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IOrder } from 'src/app/models/order';
import { ICartProduct } from 'src/app/models/cart-product';
import { CartHelper } from 'src/app/helpers/cart.helper';

@Component({
  selector: 'app-order-success',
  templateUrl: './order-success.component.html',
  styleUrls: ['./order-success.component.scss'],
})
export class OrderSuccessComponent implements OnInit {
  order$: Observable<IOrder>;

  constructor(
    private orderService: OrderService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const orderKey = this.route.snapshot.paramMap.get('key');

    if (orderKey) {
      this.order$ = this.orderService.getOrder(orderKey);
    }
  }

  getTotalProductPrice(cartProduct: ICartProduct): number {
    return CartHelper.getTotalProductPrice(cartProduct);
  }

  getTotalProductsPrice(cartProducts: ICartProduct[]): number {
    return CartHelper.getTotalProductsPrice(cartProducts);
  }
}
