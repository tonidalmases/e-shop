import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';
import { MockCategoryService } from '../../testing/mock-category.service';
import { MockProductService } from '../../testing/mock-product.service';
import { AdminProductComponent } from './admin-product.component';

describe('AdminProductComponent: Integrated', () => {
  let component: AdminProductComponent;
  let fixture: ComponentFixture<AdminProductComponent>;
  let debugElement: DebugElement;

  let productService: MockProductService;
  let categoryService: MockCategoryService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AdminProductComponent],
      providers: [
        MockProductService,
        { provide: ProductService, useClass: MockProductService },
        MockCategoryService,
        { provide: CategoryService, useClass: MockCategoryService },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: convertToParamMap({
                id: 'fakeProductId',
              }),
            },
          },
        },
      ],
      imports: [ReactiveFormsModule, RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminProductComponent);
    debugElement = fixture.debugElement;
    component = fixture.componentInstance;

    productService = TestBed.inject(MockProductService);
    categoryService = TestBed.inject(MockCategoryService);
  }));

  it('should create', () => {
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });
});
