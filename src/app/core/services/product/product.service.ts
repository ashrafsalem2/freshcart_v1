import { environment } from './../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { Injectable, signal, WritableSignal } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

 productWished:WritableSignal<string[]> = signal([])

  constructor(private _httpClient:HttpClient) { }

  getAllProduct():Observable<any>
  {
    return this._httpClient.get(`${environment.baseUrl}/api/v1/products`)
  }

  getSpecificProduct(id:string):Observable<any>
  {
    return this._httpClient.get(`${environment.baseUrl}/api/v1/products/${id}`)
  }

  addProductToWishList(id:string):Observable<any>{
    return this._httpClient.post(`${environment.baseUrl}/api/v1/wishlist`,{
      "productId": id
  })
  }
}
