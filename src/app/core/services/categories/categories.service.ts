import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor( private _httpClient:HttpClient ) { }

  getAllCategories():Observable<any>
  {
    return this._httpClient.get(`${environment.baseUrl}/api/v1/categories`)
  }

  getSpecifiecCatrgory(id:string):Observable<any>
  {
    return this._httpClient.get(`${environment.baseUrl}/api/v1/categories/${id}`);
  }
}


