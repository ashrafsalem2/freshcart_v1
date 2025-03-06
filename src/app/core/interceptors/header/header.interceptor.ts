
import { isPlatformBrowser } from '@angular/common';
import { HttpInterceptorFn } from '@angular/common/http';
import { inject, PLATFORM_ID } from '@angular/core';


export const headerInterceptor: HttpInterceptorFn = (req, next) => {

    const _pLATFORM_I=inject(PLATFORM_ID)

    if(isPlatformBrowser(_pLATFORM_I)){
      if (localStorage.getItem('usertoken')) {
        // cart , orders, wishlist
        if (req.url.includes('cart') || req.url.includes('orders') || req.url.includes('wishlist')) {
          req = req.clone({
            setHeaders: {
              token: localStorage.getItem('usertoken')!,
              lang: localStorage.getItem('lang')!
            }
          })
        }
      }
    }
   
  


  return next(req);
};
