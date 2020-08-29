import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.store';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  constructor(private store: Store<AppState>) {
    // this.store
    //   .select((s) => s.cart.cart)
    //   .subscribe((cart) => console.log(cart));
  }
}
