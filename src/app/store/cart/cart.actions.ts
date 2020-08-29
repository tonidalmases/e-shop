import { createAction, props } from '@ngrx/store';
import { Product } from 'src/app/models/product';
import { Cart } from 'src/app/models/cart';

export class CartActions {
  public static readonly getCart = createAction(
    '[Cart Actions] Get cart',
    props<{ cartId: string }>()
  );
  public static readonly getCartSuccess = createAction(
    '[Cart Actions] Get cart success',
    props<{ cart: Cart }>()
  );

  public static readonly addProduct = createAction(
    '[Cart Actions] Add product',
    props<{ product: Product }>()
  );
  public static readonly removeProduct = createAction(
    '[Cart Actions] Remove product',
    props<{ product: Product }>()
  );

  public static readonly clearCart = createAction('[Cart Actions] Clear cart');
}
