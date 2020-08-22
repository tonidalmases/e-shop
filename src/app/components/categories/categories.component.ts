import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit {
  categories$: Observable<Category[]>;
  categoryAll: Category;
  activeCategory: string;

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.categories$ = this.categoryService.getCategories();
    this.categoryAll = this.categoryService.getCategoryAll();
    this.activeCategory = this.categoryAll.id;
  }
}
