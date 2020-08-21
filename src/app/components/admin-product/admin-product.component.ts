import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { IProduct } from 'src/app/models/product';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';
import { ICategory } from '../../models/category';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-admin-product',
  templateUrl: './admin-product.component.html',
  styleUrls: ['./admin-product.component.scss'],
})
export class AdminProductComponent implements OnInit {
  formProduct: FormGroup;
  categories$: Observable<ICategory[]>;

  private productKey: string;

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.categories$ = this.categoryService.getCategories();

    this.productKey = this.route.snapshot.paramMap.get('key');

    if (this.productKey) {
      this.productService.getProduct(this.productKey).subscribe((p) => {
        this.initForm(p.name, p.price, p.category, p.pictureUrl);
      });
    } else {
      this.initForm('', null, null, '');
    }
  }

  private initForm(
    name: string,
    price: number | null,
    category: ICategory,
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

  compareByKey(item1: ICategory, item2: ICategory): boolean {
    return item1?.key === item2?.key;
  }

  save(): void {
    if (this.formProduct.valid) {
      const product: IProduct = this.formProduct.value;

      if (this.productKey) {
        product.key = this.productKey;
        this.productService.updateProduct(product);
      } else {
        this.productService.addProduct(product);
      }

      this.router.navigate(['/admin/products']);
    }
  }

  delete(): void {
    if (this.productKey) {
      const modalRef = this.modalService.open(ConfirmationDialogComponent);
      modalRef.componentInstance.title = 'Delete product';
      modalRef.componentInstance.content = [
        'Do you want to delete the product?',
      ];

      modalRef.result.then((res: boolean) => {
        if (res) {
          this.productService.deleteProduct(this.productKey);
          this.router.navigate(['/admin/products']);
        }
      });
    }
  }
}
