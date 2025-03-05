import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart/cart.service';
import { ICart } from '../../shared/interfaces/cart/icart';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-cart',
  imports: [CurrencyPipe, RouterLink, TranslatePipe],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit{

  cartDetails:ICart = {} as ICart


  private readonly _cartService = inject(CartService)
  private readonly toastr=inject(ToastrService)

  ngOnInit(): void {
    this.getCardData();
  }

  getCardData(){
    this._cartService.getLoggedUserCart().subscribe({
      next:(res)=>{
        console.log("ashraf   " + res.data.totalCartPrice)
        console.log(res)
        this.cartDetails = res.data;
        console.log(this.cartDetails)
      }
    })
  }

  deleteCartItem(id:string):void{
    Swal.fire({
      title: "Do you want to Delete this Item?",
      showDenyButton: true,
      confirmButtonText: "Delete",
      denyButtonText: `Cancel`
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this._cartService.removeSpecificCartItem(id).subscribe({
          next:(res)=>{
            console.log(res)
            // set new list in our property
            this.cartDetails = res.data
            this._cartService.cartCounter.set(res.numOfCartItems)
          }
        })

        Swal.fire("Deleted!", "", "success");
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
    
  }

  updateProductCount(id:string, count:number):void{
    this._cartService.updateCartProductCategory(id, count).subscribe({
      next:(res)=>{
        this.cartDetails = res.data
        this.toastr.info("quantity Changed Successfully", 'Fresh Market');
      }
    })
  }

  clearCart():void{
    Swal.fire({
      title: "Do you want to Delete The Cart?",
      showDenyButton: true,
      confirmButtonText: "Delete",
      denyButtonText: `Cancel`
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this._cartService.clearUserCart().subscribe({
          next:(res)=>{
            console.log(res )
            if(res.message === 'success'){
              this.cartDetails = {} as ICart;
              this._cartService.cartCounter.set(0);
              
            }
          }
        })

        Swal.fire("Deleted!", "", "success");
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
    
  }
}
