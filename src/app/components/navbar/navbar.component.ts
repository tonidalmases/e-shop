import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Cart } from 'src/app/models/cart';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  isMenuCollapsed = true;
  user$: Observable<User>;
  cart$: Observable<Cart>;

  constructor(
    private router: Router,
    private authService: AuthService,
    private shoppingCartService: ShoppingCartService
  ) {
    this.user$ = this.authService.user$;
  }

  async ngOnInit(): Promise<void> {
    this.cart$ = await this.shoppingCartService.getShoppingCart();
  }

  navigateTo(path: string): void {
    this.router.navigate([path]);
    this.isMenuCollapsed = true;
  }

  logout(): void {
    this.authService.logout();
  }
}
