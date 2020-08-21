import { Component, OnInit, Input } from '@angular/core';
import { IProduct } from 'src/app/models/product';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { ICartProduct } from 'src/app/models/cart-product';

@Component({
  selector: 'app-product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.scss'],
})
export class ProductQuantityComponent {
  @Input()
  product: IProduct;

  @Input()
  quantity: number;

  constructor(private shoppingCartService: ShoppingCartService) {}

  addProduct(): void {
    this.shoppingCartService.addToCart(this.product);
  }

  removeProduct(): void {
    this.shoppingCartService.removeFromCart(this.product);
  }
}
