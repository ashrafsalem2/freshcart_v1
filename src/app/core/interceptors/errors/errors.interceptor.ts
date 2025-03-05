import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';

export const errorsInterceptor: HttpInterceptorFn = (req, next) => {
  //using toastr service inside the function
  const _toastrService=inject(ToastrService)


  return next(req).pipe(  catchError( (err) => {

    console.log("Interceptor error", err)
    _toastrService.error(err.error.message, 'FreshCart')
    

    return throwError(() => err)
  }) );
};
