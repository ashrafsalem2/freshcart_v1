import { HttpClient } from '@angular/common/http';
import { effect, Injectable, signal, WritableSignal } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class CartService {

 cartCounter:WritableSignal<number> = signal(0)

  constructor(private _httpClient:HttpClient) {
    effect( ()=>{
      const x = this.cartCounter()
      console.log(x) // any change in cartCount as signal effect will work
    } )
   }

  // add to cart
  addProductToCart(id:string):Observable<any>{
    return this._httpClient.post(`${environment.baseUrl}/api/v1/cart`,
      {
        "productId": id
      }
    )
  }

  // get data from cart
  getLoggedUserCart():Observable<any>{
    return this._httpClient.get(`${environment.baseUrl}/api/v1/cart`)
  }

  // remove element from cart
  removeSpecificCartItem(id:string):Observable<any>{
    return this._httpClient.delete(`${environment.baseUrl}/api/v1/cart/${id}`)
  }

  // update product count at cart ---- https://ecommerce.routemisr.com
  updateCartProductCategory(id:string, count:number):Observable<any>{
    return this._httpClient.put(`${environment.baseUrl}/api/v1/cart/${id}`,
      {
        
          "count": count
      
      }
    )
  }

    // clear the  cart
    clearUserCart():Observable<any>{
      return this._httpClient.delete(`${environment.baseUrl}/api/v1/cart`)
    }
}
