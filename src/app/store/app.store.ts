import { cartReducer } from './cart/cart.reducer';
import { ICartState } from './cart/cart.state';
import { CartEffects } from './cart/cart.effects';

export interface AppState {
  cart: ICartState;
}

export const reducers = {
  cart: cartReducer,
};

export const effects = [CartEffects];
