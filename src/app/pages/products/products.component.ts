import { codeData } from './../../shared/interfaces/auth/userData';
import { UpperCasePipe, CurrencyPipe } from '@angular/common';
import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../core/services/cart/cart.service';
import { ProductService } from '../../core/services/product/product.service';
import { Products } from '../../shared/interfaces/products/iproducts';
import { SearchPipe } from '../../shared/pipes/search/search.pipe';

@Component({
  selector: 'app-products',
  imports: [CarouselModule, UpperCasePipe, CurrencyPipe, FormsModule, SearchPipe, RouterLink, TranslatePipe],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {

  private readonly _cartService = inject(CartService);

  products: Products[] = [];

  // for search pipe
  result: string = ''

  // string array of wished products id's
  wishedProductsIDS: string[] = [];

  constructor(private _productService: ProductService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getData();
    this.addToWishList("6428ebc6dc1175abc65ca0b9") // for start to get all wished
  }

  getData(): void {
    this._productService.getAllProduct().subscribe({
      next: (res) => {
        console.log(res.data);
        this.products = res.data;
      }
    });
  }

  addToCart(id: string) {
    this._cartService.addProductToCart(id).subscribe({
      next: (res) => {

        if (res.status === 'success') {
          this.toastr.success(res.message, 'Fresh Market');
          this._cartService.cartCounter.set(res.numOfCartItems)
        }
      }
    })
  }

  addToWishList(id: string): void {
    this._productService.addProductToWishList(id).subscribe({
      next: (res) => {
        if (res.status === 'success') {
          console.log(res)
          this.toastr.success(res.message, 'Fresh Market');
      
          // set all wished product's id's
          this.wishedProductsIDS = res.data
          console.log(this.wishedProductsIDS)
        }
      },
    })
  }

  checkForProductIsWished(id: string): boolean {
    let exist = false;

    for (let index = 0; index < this.wishedProductsIDS.length; index++) {
      if (id === this.wishedProductsIDS[index]) {
        exist = true;
        break;
      }
    }
    return exist;
  }

}
