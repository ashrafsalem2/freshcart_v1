
import { HttpInterceptorFn } from '@angular/common/http';


export const headerInterceptor: HttpInterceptorFn = (req, next) => {




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
  


  return next(req);
};
