import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IUser } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { Observable } from 'rxjs';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { map } from 'rxjs/operators';
import { CartHelper } from '../../helpers/cart.helper';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  isMenuCollapsed = true;
  user$: Observable<IUser>;

  cartQuantity$: Observable<number>;

  constructor(
    private router: Router,
    private authService: AuthService,
    private shoppingCartService: ShoppingCartService
  ) {
    this.user$ = this.authService.appUser$;
  }

  ngOnInit(): void {
    this.shoppingCartService.getShoppingCart().then((cart$) => {
      this.cartQuantity$ = cart$.pipe(
        map((cart) => CartHelper.getTotalProductsQuantity(cart.products))
      );
    });
  }

  navigateTo(path: string): void {
    this.router.navigate([path]);
    this.isMenuCollapsed = true;
  }

  logout(): void {
    this.authService.logout();
  }
}
