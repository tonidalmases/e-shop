import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { ICategory } from 'src/app/models/category';
import { IProduct } from 'src/app/models/product';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';
import { ShoppingCartService } from '../../services/shopping-cart.service';
import { ICartProduct } from 'src/app/models/cart-product';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  products$: Observable<IProduct[]>;

  categories$: Observable<ICategory[]>;
  categoryAll: ICategory;
  activeCategory: string;

  cartSubscription: Subscription;
  cartProducts: ICartProduct[];

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private shoppingCartService: ShoppingCartService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.categories$ = this.categoryService.getCategories();
    this.categoryAll = this.categoryService.getCategoryAll();
    this.activeCategory = this.categoryAll.key;

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

    this.shoppingCartService.getShoppingCart().then((cart$) => {
      this.cartSubscription = cart$.subscribe(
        (cart) => (this.cartProducts = cart.products)
      );
    });
  }

  ngOnDestroy(): void {
    this.cartSubscription.unsubscribe();
  }

  private filterProductsByCategory(
    allProducts: IProduct[],
    categoryName: string
  ): IProduct[] {
    return allProducts.filter((p) => p.category.name === categoryName);
  }

  getCartProductQuantity(product: IProduct): number {
    if (!this.cartProducts) {
      return 0;
    }

    const cartProduct = this.cartProducts.find((p) => p.key === product.key);
    return cartProduct ? cartProduct.quantity : 0;
  }
}
