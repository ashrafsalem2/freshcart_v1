import { Component, OnInit } from '@angular/core';
import { CategoryPipe } from '../../shared/pipes/category/category.pipe';
import { Category } from '../../shared/interfaces/cart/icart';
import { CategoriesService } from '../../core/services/categories/categories.service';
import { TranslatePipe } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-categories',
  imports: [CategoryPipe, TranslatePipe, FormsModule, UpperCasePipe],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit{
  result:string  = ''

  categories:Category[] = []

  constructor(private _categoriesService:CategoriesService){}

  ngOnInit(): void {
    this.getAllCategory();
  }

  getAllCategory(): void {
    this._categoriesService.getAllCategories().subscribe({
      next: (res) => {
        console.log(res.data);
        this.categories = res.data;
      }
    });
  }
}
