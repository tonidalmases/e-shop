import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { combineLatest, Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Cart } from 'src/app/models/cart';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import { AppState } from 'src/app/store/app.store';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit, OnDestroy {
  products$: Observable<Product[]>;

  cartSubscription: Subscription;
  cart: Cart;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.initProducts();
    this.initCartProducts();
  }

  ngOnDestroy(): void {
    this.cartSubscription.unsubscribe();
  }

  private initProducts(): void {
    this.products$ = combineLatest([
      this.productService.getProducts(),
      this.route.queryParams,
    ]).pipe(
      map(([allProducts, params]) => {
        // tslint:disable-next-line: no-string-literal
        const categoryName = params['category'];
        return categoryName
          ? this.filterProductsByCategory(allProducts, categoryName)
          : allProducts;
      })
    );
  }

  private filterProductsByCategory(
    allProducts: Product[],
    categoryName: string
  ): Product[] {
    return allProducts.filter((p) => p.category.name === categoryName);
  }

  private initCartProducts(): void {
    this.store
      .select((s) => s.cart.cart)
      .subscribe((cart) => (this.cart = cart));
  }

  getCartProductQuantity(product: Product): number {
    if (!this.cart.cartProducts) {
      return 0;
    }

    const cartProduct = this.cart.cartProducts.find((p) => p.id === product.id);
    return cartProduct ? cartProduct.quantity : 0;
  }
}
