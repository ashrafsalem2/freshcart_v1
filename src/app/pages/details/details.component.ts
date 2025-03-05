import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../core/services/product/product.service';
import { Products } from '../../shared/interfaces/products/iproducts';

@Component({
  selector: 'app-details',
  imports: [],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit{
  private readonly _activatedRoute = inject(ActivatedRoute);
  private readonly _productService=inject(ProductService);
  
  productId!:string
  productDetails: Products = {} as Products

  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe({
      next:(res) =>{
        this.productId = res.get('id') || '';
        this._productService.getSpecificProduct(this.productId).subscribe({
            next:(res) =>{
              this.productDetails = res.data
            },
            error:(err) =>{
              console.log(err)
            }
          })
      }
    })
  }
}
