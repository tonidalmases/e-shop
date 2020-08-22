import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { combineLatest, Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Product } from 'src/app/models/product';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss'],
})
export class AdminProductsComponent implements OnInit {
  products$: Observable<Product[]>;
  filter = new FormControl('');

  page = 1;
  pageSize = 5;
  itemsPerPage = [5, 10, 20];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.products$ = combineLatest([
      this.productService.getProducts(),
      (this.filter.valueChanges as Observable<string>).pipe(startWith('')),
    ]).pipe(
      map(([allProducts, value]) =>
        value !== ''
          ? this.filterProducts(allProducts, value.toLowerCase())
          : allProducts
      )
    );
  }

  private filterProducts(allProducts: Product[], value: string): Product[] {
    return allProducts.filter((p) => p.name.toLowerCase().includes(value));
  }
}
