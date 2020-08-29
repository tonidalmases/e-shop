import { createReducer, on } from '@ngrx/store';
import { Cart } from 'src/app/models/cart';
import { CartProduct } from 'src/app/models/cart-product';
import { CartActions } from './cart.actions';
import { ICartState } from './cart.state';

export const initialState: ICartState = {
  cart: new Cart(null, []),
};

const reducer = createReducer(
  initialState,
  on(CartActions.getCart, (state, action) => {
    return {
      ...state,
      cart: new Cart(
        state.cart.dateCreated,
        state.cart.cartProducts,
        action.cartId
      ),
    };
  }),
  on(CartActions.getCartSuccess, (state, action) => {
    return {
      ...state,
      cart: action.cart,
    };
  }),

  on(CartActions.addProduct, (state, action) => {
    const products = [...state.cart.cartProducts];
    const index = products.findIndex((p) => p.id === action.product.id);
    if (index >= 0) {
      const cartProduct = new CartProduct(
        products[index].product,
        products[index].quantity + 1,
        products[index].id
      );
      products.splice(index, 1, cartProduct);
    } else {
      const cartProduct = new CartProduct(action.product, 1, action.product.id);
      products.push(cartProduct);
    }
    return {
      ...state,
      cart: new Cart(state.cart.dateCreated, products, state.cart.id),
    };
  }),

  on(CartActions.removeProduct, (state, action) => {
    const products = [...state.cart.cartProducts];
    const index = products.findIndex((p) => p.id === action.product.id);
    if (index >= 0) {
      if (products[index].quantity > 1) {
        const cartProduct = new CartProduct(
          products[index].product,
          products[index].quantity - 1,
          products[index].id
        );
        products.splice(index, 1, cartProduct);
      } else {
        products.splice(index, 1);
      }
      return {
        ...state,
        cart: new Cart(state.cart.dateCreated, products, state.cart.id),
      };
    }
    return { ...state };
  }),

  on(CartActions.clearCart, (state) => {
    return {
      ...state,
      cart: new Cart(state.cart.dateCreated, [], state.cart.id),
    };
  })
);

export function cartReducer(state: ICartState, action): ICartState {
  return reducer(state, action);
}
