import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Cart } from 'src/app/models/cart';
import { AppState } from 'src/app/store/app.store';
import { CartActions } from 'src/app/store/cart/cart.actions';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss'],
})
export class ShoppingCartComponent implements OnInit {
  cart$: Observable<Cart>;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.cart$ = this.store.select((s) => s.cart.cart);
  }

  clearShoppingCart(): void {
    this.store.dispatch(CartActions.clearCart());
  }
}
