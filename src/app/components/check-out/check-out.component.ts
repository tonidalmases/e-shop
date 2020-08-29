import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Cart } from 'src/app/models/cart';
import { Order } from 'src/app/models/order';
import { Shipping } from 'src/app/models/shipping';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { OrderService } from 'src/app/services/order.service';
import { AppState } from 'src/app/store/app.store';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.scss'],
})
export class CheckOutComponent implements OnInit, OnDestroy {
  formShipping: FormGroup;

  cart: Cart;
  cartSubscription: Subscription;

  user: User;
  userSubscription: Subscription;

  constructor(
    private authService: AuthService,
    private orderService: OrderService,
    private router: Router,
    private store: Store<AppState>
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

    this.cartSubscription = this.store
      .select((s) => s.cart.cart)
      .subscribe((cart) => (this.cart = cart));

    this.userSubscription = this.authService.user$.subscribe(
      (user) => (this.user = user)
    );
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }

  placeOrder(): void {
    if (this.formShipping.valid && this.cart && this.user) {
      const order = new Order(
        new Date().getTime(),
        this.user,
        this.formShipping.value as Shipping,
        this.cart
      );
      this.orderService.placeOrder(order).then((orderId) => {
        this.router.navigate(['/order-success', orderId]);
      });
    }
  }
}
