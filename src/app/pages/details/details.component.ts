import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../core/services/product/product.service';
import { Products } from '../../shared/interfaces/products/iproducts';
import { TranslatePipe } from '@ngx-translate/core';
import { CartService } from '../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-details',
  imports: [TranslatePipe],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit {
  private readonly _activatedRoute = inject(ActivatedRoute);
  private readonly _productService = inject(ProductService);
  private readonly _cartService = inject(CartService);

  productId!: string
  productDetails: Products = {} as Products

  constructor(private toastr: ToastrService) { }

  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe({
      next: (res) => {
        this.productId = res.get('id') || '';
        this._productService.getSpecificProduct(this.productId).subscribe({
          next: (res) => {
            this.productDetails = res.data
          },
          error: (err) => {
            console.log(err)
          }
        })
      }
    })
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

}