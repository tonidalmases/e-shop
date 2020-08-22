import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { CartProduct } from 'src/app/models/cart-product';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit, OnDestroy {
  products$: Observable<Product[]>;

  cartSubscription: Subscription;
  cartProducts: CartProduct[];

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private shoppingCartService: ShoppingCartService
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
    this.shoppingCartService.getShoppingCart().then((cart$) => {
      this.cartSubscription = cart$.subscribe(
        (cart) => (this.cartProducts = cart.products)
      );
    });
  }

  getCartProductQuantity(product: CartProduct): number {
    if (!this.cartProducts) {
      return 0;
    }

    const cartProduct = this.cartProducts.find((p) => p.id === product.id);
    return cartProduct ? cartProduct.quantity : 0;
  }
}
