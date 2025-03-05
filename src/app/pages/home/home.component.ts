import { Component, inject, OnInit } from '@angular/core';
import { ProductService } from '../../core/services/product/product.service';
import { Products } from '../../shared/interfaces/products/iproducts';
import { CategoriesService } from '../../core/services/categories/categories.service';
import { Icategory } from '../../shared/interfaces/categories/icategory';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CurrencyPipe, UpperCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SearchPipe } from '../../shared/pipes/search/search.pipe';
import { RouterLink } from '@angular/router';
import { CartService } from '../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { TranslatePipe } from '@ngx-translate/core';
import { ProductsComponent } from "../products/products.component";

@Component({
  selector: 'app-home',
  imports: [CarouselModule,  FormsModule, TranslatePipe, ProductsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  private readonly _catgory = inject(CategoriesService);
  // private readonly _cartService = inject(CartService);

  constructor(private _productService: ProductService,private toastr: ToastrService) { }

  products: Products[] = [];
  categories: Icategory[] = [];



  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    rtl:true,
    dots: false,
    navSpeed: 700,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 6
      }
    },
    nav: true
  }


  customFixedCarsoul: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    rtl:true,
    dots: true,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    navSpeed: 700,
    navText: ['', ''],
    items: 1,
    nav: false
  }

  ngOnInit(): void {
    
    this.getAllCategory();
  }


  getAllCategory(): void {
    this._catgory.getAllCategories().subscribe({
      next: (res) => {
        console.log(res.data);
        this.categories = res.data;
      }
    });
  }

 
}
