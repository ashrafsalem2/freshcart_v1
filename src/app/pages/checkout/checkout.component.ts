import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { OrdersService } from '../../core/services/orders/orders.service';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-checkout',
  imports: [ReactiveFormsModule, TranslatePipe],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent implements OnInit{

  cardId!:string

  private readonly _activatedRoute=inject(ActivatedRoute)
  private readonly _ordersService=inject(OrdersService)

  private readonly _formBuilder=inject(FormBuilder)

  checkoutFormGroup!:FormGroup

  ngOnInit(): void {
    // this.checkoutFormGroup = new FormGroup({
    //   details: new FormControl(null, [Validators.required]),
    //   phone: new FormControl(null, [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]),
    //   city: new FormControl(null, [Validators.required])
    // })

    this.initCheckForm()
    this.getCardId()
  }

  initCheckForm():void{
    this.checkoutFormGroup = this._formBuilder.group({
      details:[null, [Validators.required]],
      phone:[null, [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]],
      city:[null, [Validators.required]]
    })
  }

  getCardId():void{
    this._activatedRoute.paramMap.subscribe({
      next:(res)=>{
        this.cardId = res.get('id') !
     
      }
    })
  }

  submitCheckoutForm():void{
    this._ordersService.checkout(this.cardId, this.checkoutFormGroup.value).subscribe({
      next:(res)=>{
         if(res.status){
          // redirect to payment page strips
          // throw open function, window.open
          open(res.session.url, '_self')
         }
        console.log(res.status)
      }
    })
  }
}
