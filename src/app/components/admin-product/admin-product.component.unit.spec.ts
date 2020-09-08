import { fakeAsync, tick } from '@angular/core/testing';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { Category } from 'src/app/models/category';
import { Product } from 'src/app/models/product';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';
import { FakeModels } from 'src/app/testing/fake-models';
import { AdminProductComponent } from './admin-product.component';

describe('AdminProductComponent: Unit', () => {
  let component: AdminProductComponent;

  let productServiceSpy: jasmine.SpyObj<ProductService>;
  let categoryServiceSpy: jasmine.SpyObj<CategoryService>;
  let routeSpy: any;
  let routerSpy: jasmine.SpyObj<Router>;
  let modalServiceSpy: jasmine.SpyObj<NgbModal>;

  beforeEach(() => {
    productServiceSpy = jasmine.createSpyObj<ProductService>([
      'getProduct',
      'updateProduct',
      'addProduct',
      'deleteProduct',
    ]);
    categoryServiceSpy = jasmine.createSpyObj<CategoryService>([
      'getCategories',
    ]);
    routeSpy = jasmine.createSpy();
    routerSpy = jasmine.createSpyObj<Router>(['navigate']);
    modalServiceSpy = jasmine.createSpyObj<NgbModal>(['open']);

    component = new AdminProductComponent(
      productServiceSpy,
      categoryServiceSpy,
      routeSpy,
      routerSpy,
      modalServiceSpy
    );
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Function: ngOnInit', () => {
    let fakeCategories: Category[];
    let fakeProduct: Product;

    beforeEach(() => {
      fakeCategories = FakeModels.getCategories();
      categoryServiceSpy.getCategories.and.returnValue(of(fakeCategories));

      fakeProduct = FakeModels.getProduct();
      productServiceSpy.getProduct.and.returnValue(of(fakeProduct));
    });

    it('should get an existing product', () => {
      const fakeProductId = 'fakeProductId';
      spyOn(component, 'getProductId').and.returnValue(fakeProductId);

      component.ngOnInit();

      expect(categoryServiceSpy.getCategories).toHaveBeenCalled();
      component.categories$.subscribe((result) =>
        expect(result).toEqual(fakeCategories)
      );
      expect(productServiceSpy.getProduct).toHaveBeenCalledWith(fakeProductId);
      expect(component.formProduct).toBeTruthy();
      expect(component.formProduct.get('name').value).toEqual(fakeProduct.name);
      expect(component.formProduct.get('price').value).toEqual(
        fakeProduct.price
      );
      expect(component.formProduct.get('category').value).toEqual(
        fakeProduct.category
      );
      expect(component.formProduct.get('pictureUrl').value).toEqual(
        fakeProduct.pictureUrl
      );
    });

    it('should create a new product', () => {
      const fakeProductId = null;
      spyOn(component, 'getProductId').and.returnValue(fakeProductId);

      component.ngOnInit();

      expect(categoryServiceSpy.getCategories).toHaveBeenCalled();
      component.categories$.subscribe((result) =>
        expect(result).toEqual(fakeCategories)
      );
      expect(productServiceSpy.getProduct).not.toHaveBeenCalled();
      expect(component.formProduct).toBeTruthy();
      expect(component.formProduct.get('name').value).toEqual('');
      expect(component.formProduct.get('price').value).toEqual(null);
      expect(component.formProduct.get('category').value).toEqual(null);
      expect(component.formProduct.get('pictureUrl').value).toEqual('');
    });
  });

  describe('Function: compareById', () => {
    it('should compare by id and return true', () => {
      const item1 = FakeModels.getCategory();
      item1.id = 'itemId';
      const item2 = FakeModels.getCategory();
      item2.id = 'itemId';

      const result = component.compareById(item1, item2);

      expect(result).toBeTrue();
    });

    it('should compare by id and return false', () => {
      const item1 = FakeModels.getCategory();
      item1.id = 'itemId1';
      const item2 = FakeModels.getCategory();
      item2.id = 'itemId2';

      const result = component.compareById(item1, item2);

      expect(result).toBeFalse();
    });
  });

  describe('Function: save', () => {
    it('should not save because of invalid form product', () => {
      component.initForm('', null, null, '');

      component.save();

      expect(component.formProduct.valid).toBeFalse();
      expect(productServiceSpy.updateProduct).not.toHaveBeenCalled();
      expect(productServiceSpy.addProduct).not.toHaveBeenCalled();
      expect(routerSpy.navigate).not.toHaveBeenCalled();
    });

    it('should add a new product', () => {
      initFakeForm();

      component.save();

      expect(component.formProduct.valid).toBeTrue();
      expect(productServiceSpy.addProduct).toHaveBeenCalled();
      expect(routerSpy.navigate).toHaveBeenCalled();
    });

    it('should update a product', () => {
      initFakeForm();
      component.productId = 'fakeProductId';

      component.save();

      expect(component.formProduct.valid).toBeTrue();
      expect(productServiceSpy.updateProduct).toHaveBeenCalled();
      expect(routerSpy.navigate).toHaveBeenCalled();
    });

    function initFakeForm(): void {
      component.initForm(
        'fakeName',
        1,
        FakeModels.getCategory(),
        'http://fakepicture.com'
      );
    }
  });

  describe('Function: delete', () => {
    it('should not delete because of no product id', () => {
      component.delete();

      expect(modalServiceSpy.open).not.toHaveBeenCalled();
      expect(productServiceSpy.deleteProduct).not.toHaveBeenCalled();
      expect(routerSpy.navigate).not.toHaveBeenCalled();
    });

    it('should ask for confirmation and delete when true', fakeAsync(() => {
      const modalRef = getFakeModalRef(true);

      component.productId = 'fakeProductId';
      modalServiceSpy.open.and.returnValue(modalRef);

      component.delete();
      tick();

      expect(modalServiceSpy.open).toHaveBeenCalled();
      expect(productServiceSpy.deleteProduct).toHaveBeenCalled();
      expect(routerSpy.navigate).toHaveBeenCalled();
    }));

    it('should ask for confirmation and not delete when false', fakeAsync(() => {
      const modalRef = getFakeModalRef(false);

      component.productId = 'fakeProductId';
      modalServiceSpy.open.and.returnValue(modalRef);

      component.delete();
      tick();

      expect(modalServiceSpy.open).toHaveBeenCalled();
      expect(productServiceSpy.deleteProduct).not.toHaveBeenCalled();
      expect(routerSpy.navigate).not.toHaveBeenCalled();
    }));

    function getFakeModalRef(result: boolean): any {
      return {
        componentInstance: {
          title: '',
          content: '',
        },
        result: Promise.resolve(result),
      };
    }
  });
});
