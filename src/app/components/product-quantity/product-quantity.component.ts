import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Product } from 'src/app/models/product';
import { AppState } from 'src/app/store/app.store';
import { CartActions } from 'src/app/store/cart/cart.actions';

@Component({
  selector: 'app-product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.scss'],
})
export class ProductQuantityComponent {
  @Input()
  product: Product;

  @Input()
  quantity: number;

  constructor(private store: Store<AppState>) {}

  addProduct(): void {
    this.store.dispatch(CartActions.addProduct({ product: this.product }));
  }

  removeProduct(): void {
    this.store.dispatch(CartActions.removeProduct({ product: this.product }));
  }
}
