import { environment } from './../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { jwtDecode } from "jwt-decode";
import { Router } from '@angular/router';
import { codeData, emailData, resetPassword } from '../../../shared/interfaces/auth/userData';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userData:any = null;
  private readonly _router = inject(Router)

  constructor(private _HttpClient:HttpClient) { }

  sendRegisterForm(data:object): Observable<any>
  {
    return this._HttpClient.post(`${environment.baseUrl}/api/v1/auth/signup`, data);
  }

  sendLoginForm( data:object): Observable<any>
  {
    return this._HttpClient.post(`${environment.baseUrl}/api/v1/auth/signin`, data);
  }

  decodeUSerData():void{
    const token = localStorage.getItem('usertoken');
    this.userData = jwtDecode(token || '');
  }

  logout():void{
    // 1 - clear local storage
    localStorage.removeItem('usertoken')

    // 2 - clear user data object
    this.userData = null;

    // 3 - redirect back to Login
    this._router.navigate(['/login'])
  }

  // for reset password logic
  forgetPassword(data:emailData):Observable<any>{
    return this._HttpClient.post(`${environment.baseUrl}/api/v1/auth/forgotPasswords`, data);
  }

  // for reset code
  resetCode(data:codeData):Observable<any>{
    return this._HttpClient.post(`${environment.baseUrl}/api/v1/auth/verifyResetCode`, data)
  }

  // get new password
  getNewPassword(data:resetPassword):Observable<any>{
    return this._HttpClient.put(`${environment.baseUrl}/api/v1/auth/resetPassword`,data)
  }
}
