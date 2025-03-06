import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  // myToken: any = localStorage.getItem("usertoken") // of any to handle null error
  constructor(private _httpClient: HttpClient) { }

  checkout(id: string, data: object): Observable<any> {
    return this._httpClient.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${id}?url=http://localhost:4200`, data)
  }

  getAllOrders():Observable<any>{
    return this._httpClient.get(`${environment.baseUrl}/api/v1/orders/`)
  }
}
