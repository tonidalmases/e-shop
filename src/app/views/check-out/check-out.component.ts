import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CartHelper } from 'src/app/helpers/cart.helper';
import { ICartProduct } from 'src/app/models/cart-product';
import { Order } from 'src/app/models/order';
import { IShipping } from 'src/app/models/shipping';
import { IUser } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { OrderService } from 'src/app/services/order.service';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.scss'],
})
export class CheckOutComponent implements OnInit, OnDestroy {
  formShipping: FormGroup;

  cartProducts: ICartProduct[];
  cartSubscription: Subscription;

  user: IUser;
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
      address: new FormGroup({
        line1: new FormControl('', Validators.required),
        line2: new FormControl(''),
      }),
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

    this.userSubscription = this.authService.appUser$.subscribe(
      (user) => (this.user = user)
    );
  }

  ngOnDestroy(): void {
    this.cartSubscription.unsubscribe();
    this.userSubscription.unsubscribe();
  }

  getTotalProductPrice(cartProduct: ICartProduct): number {
    return CartHelper.getTotalProductPrice(cartProduct);
  }

  get cartQuantity(): number {
    return CartHelper.getTotalProductsQuantity(this.cartProducts);
  }

  get totalProductsPrice(): number {
    return CartHelper.getTotalProductsPrice(this.cartProducts);
  }

  placeOrder(): void {
    if (this.formShipping.valid) {
      const order = new Order(
        this.user.key,
        this.formShipping.value as IShipping,
        this.cartProducts
      );
      this.orderService.placeOrder(order).then((key) => {
        this.router.navigate(['/order-success', key]);
      });
    }
  }
}
