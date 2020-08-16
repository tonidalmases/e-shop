import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ICartProduct } from 'src/app/models/cart-product';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { CartHelper } from '../../helpers/cart.helper';
import { IProduct } from 'src/app/models/product';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss'],
})
export class ShoppingCartComponent implements OnInit, OnDestroy {
  cartProducts: ICartProduct[];
  cartSubscription: Subscription;

  constructor(private shoppingCartService: ShoppingCartService) {}

  ngOnInit(): void {
    this.shoppingCartService
      .getShoppingCart()
      .then(
        (cart$) =>
          (this.cartSubscription = cart$.subscribe(
            (cart) => (this.cartProducts = cart.products)
          ))
      );
  }

  ngOnDestroy(): void {
    this.cartSubscription.unsubscribe();
  }

  get cartQuantity(): number {
    return CartHelper.getTotalProductsQuantity(this.cartProducts);
  }

  getTotalProductPrice(cartProduct: ICartProduct): number {
    return CartHelper.getTotalProductPrice(cartProduct);
  }

  get totalProductsPrice(): number {
    return CartHelper.getTotalProductsPrice(this.cartProducts);
  }

  clearShoppingCart(): void {
    this.shoppingCartService.clearShoppingCart();
  }
}
