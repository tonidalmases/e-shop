import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { CartHelper } from '../../helpers/cart.helper';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  isMenuCollapsed = true;
  user$: Observable<User>;

  cartQuantity$: Observable<number>;

  constructor(
    private router: Router,
    private authService: AuthService,
    private shoppingCartService: ShoppingCartService
  ) {
    this.user$ = this.authService.user$;
  }

  async ngOnInit(): Promise<void> {
    this.cartQuantity$ = (
      await this.shoppingCartService.getShoppingCart()
    ).pipe(map((cart) => CartHelper.getTotalProductsQuantity(cart.products)));
  }

  navigateTo(path: string): void {
    this.router.navigate([path]);
    this.isMenuCollapsed = true;
  }

  logout(): void {
    this.authService.logout();
  }
}
