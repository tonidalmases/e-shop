import { Injectable } from '@angular/core';
import {
  Actions,
  createEffect,
  ofType,
  ROOT_EFFECTS_INIT,
} from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { from } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { AppState } from '../app.store';
import { CartActions } from './cart.actions';

@Injectable()
export class CartEffects {
  initCart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ROOT_EFFECTS_INIT),
      switchMap(() => {
        return from(this.shoppingCartService.initCart()).pipe(
          map((cartId) => CartActions.getCart({ cartId }))
        );
      })
    )
  );

  getCart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CartActions.getCart),
      switchMap((props) => {
        return this.shoppingCartService.getShoppingCart(props.cartId).pipe(
          map((cart) => {
            return CartActions.getCartSuccess({ cart });
          })
        );
      })
    )
  );

  addProduct$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(CartActions.addProduct),
        tap((props) => {
          this.shoppingCartService.addToCart(props.product);
        })
      ),
    { dispatch: false }
  );

  removeProduct$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(CartActions.removeProduct),
        tap((props) => {
          this.shoppingCartService.removeFromCart(props.product);
        })
      ),
    { dispatch: false }
  );

  clearCart$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(CartActions.clearCart),
        tap(() => {
          this.shoppingCartService.clearShoppingCart();
        })
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private shoppingCartService: ShoppingCartService,
    private store: Store<AppState>
  ) {}
}
