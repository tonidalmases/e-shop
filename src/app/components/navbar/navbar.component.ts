import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Cart } from 'src/app/models/cart';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { AppState } from 'src/app/store/app.store';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  user$: Observable<User>;
  cart$: Observable<Cart>;

  constructor(
    private authService: AuthService,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.user$ = this.authService.user$;
    this.cart$ = this.store.select((s) => s.cart.cart);
  }

  logout(): void {
    this.authService.logout();
  }
}
