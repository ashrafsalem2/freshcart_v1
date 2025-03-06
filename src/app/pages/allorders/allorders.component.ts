import { CurrencyPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { Iorder } from '../../shared/interfaces/orders/iorder';
import { OrdersService } from '../../core/services/orders/orders.service';

@Component({
  selector: 'app-allorders',
  imports: [CurrencyPipe, TranslatePipe],
  templateUrl: './allorders.component.html',
  styleUrl: './allorders.component.scss'
})
export class AllordersComponent implements OnInit{
  allOrders!:number
  orders:Iorder[] = []

  private readonly _ordersService=inject(OrdersService)

  ngOnInit(): void {
    this.getCardData();
  }

  getCardData(){
    this._ordersService.getAllOrders().subscribe({
      next:(res)=>{
        console.log("ashraf   " + res.data.totalCartPrice)
        console.log(res)
        this.allOrders = res.results
        this.orders = res.data;
        console.log(this.orders)
      }
    })
  }
}
