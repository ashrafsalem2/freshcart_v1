import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  // myToken: any = localStorage.getItem("usertoken") // of any to handle null error
  constructor(private _httpClient: HttpClient) { }

  checkout(id: string, data: object): Observable<any> {
    return this._httpClient.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${id}?url=http://localhost:4200`, data)
  }
}
