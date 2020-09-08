import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { Product } from 'src/app/models/product';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';
import { Category } from '../../models/category';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-admin-product',
  templateUrl: './admin-product.component.html',
  styleUrls: ['./admin-product.component.scss'],
})
export class AdminProductComponent implements OnInit {
  formProduct: FormGroup;
  categories$: Observable<Category[]>;

  productId: string;

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.categories$ = this.categoryService.getCategories();

    this.productId = this.getProductId();

    if (this.productId) {
      this.productService.getProduct(this.productId).subscribe((p) => {
        this.initForm(p.name, p.price, p.category, p.pictureUrl);
      });
    } else {
      this.initForm('', null, null, '');
    }
  }

  getProductId(): string {
    return this.route.snapshot.paramMap.get('id');
  }

  initForm(
    name: string,
    price: number | null,
    category: Category,
    pictureUrl: string
  ): void {
    this.formProduct = new FormGroup({
      name: new FormControl(name, Validators.required),
      price: new FormControl(price, [Validators.required, Validators.min(0)]),
      category: new FormControl(category, Validators.required),
      pictureUrl: new FormControl(
        pictureUrl,
        Validators.pattern(
          '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?'
        )
      ),
    });
  }

  compareById(item1: Category, item2: Category): boolean {
    return item1?.id === item2?.id;
  }

  save(): void {
    if (this.formProduct.valid) {
      const product: Product = this.formProduct.value;

      if (this.productId) {
        product.id = this.productId;
        this.productService.updateProduct(product);
      } else {
        this.productService.addProduct(product);
      }

      this.router.navigate(['/admin/products']);
    }
  }

  delete(): void {
    if (this.productId) {
      const modalRef = this.modalService.open(ConfirmationDialogComponent);
      modalRef.componentInstance.title = 'Delete product';
      modalRef.componentInstance.content = [
        'Do you want to delete the product?',
      ];

      modalRef.result.then((res: boolean) => {
        if (res) {
          this.productService.deleteProduct(this.productId);
          this.router.navigate(['/admin/products']);
        }
      });
    }
  }
}
