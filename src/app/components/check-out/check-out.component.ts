import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CartHelper } from 'src/app/helpers/cart.helper';
import { CartProduct } from 'src/app/models/cart-product';
import { Order } from 'src/app/models/order';
import { Shipping } from 'src/app/models/shipping';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { OrderService } from 'src/app/services/order.service';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.scss'],
})
export class CheckOutComponent implements OnInit, OnDestroy {
  formShipping: FormGroup;

  cartProducts: CartProduct[];
  cartSubscription: Subscription;

  user: User;
  userSubscription: Subscription;

  constructor(
    private shoppingCartService: ShoppingCartService,
    private authService: AuthService,
    private orderService: OrderService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.formShipping = new FormGroup({
      name: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      zipCode: new FormControl('', [
        Validators.required,
        Validators.pattern('[0-9]{5}'),
      ]),
      country: new FormControl('', Validators.required),
    });

    this.shoppingCartService
      .getShoppingCart()
      .then(
        (cart$) =>
          (this.cartSubscription = cart$.subscribe(
            (cart) => (this.cartProducts = cart.products)
          ))
      );

    this.userSubscription = this.authService.user$.subscribe(
      (user) => (this.user = user)
    );
  }

  ngOnDestroy(): void {
    this.cartSubscription.unsubscribe();
    this.userSubscription.unsubscribe();
  }

  get cartQuantity(): number {
    return CartHelper.getTotalProductsQuantity(this.cartProducts);
  }

  get totalProductsPrice(): number {
    return CartHelper.getTotalProductsPrice(this.cartProducts);
  }

  getTotalProductPrice(cartProduct: CartProduct): number {
    return CartHelper.getTotalProductPrice(cartProduct);
  }

  placeOrder(): void {
    if (this.formShipping.valid) {
      const order: Order = {
        user: this.user,
        shipping: this.formShipping.value as Shipping,
        cartProducts: this.cartProducts,
        dateOrder: new Date().getTime(),
      };
      this.orderService.placeOrder(order).then((dr) => {
        this.router.navigate(['/order-success', dr.id]);
      });
    }
  }
}
