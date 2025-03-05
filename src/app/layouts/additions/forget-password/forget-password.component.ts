import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth/auth.service';
import { Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-forget-password',
  imports: [ReactiveFormsModule, TranslatePipe],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.scss'
})
export class ForgetPasswordComponent {
// variables
  isloading!:boolean
  errorMsg!:string

  private readonly _router=inject(Router);
  // constructor
  constructor(private _authService:AuthService){}

forgetPasswordForm:FormGroup = new FormGroup({
  email: new FormControl(null, [
    Validators.required,
    Validators.email
  ])
})

submitForgetPasswordForm(){
  if(this.forgetPasswordForm.valid){
    this.isloading = true;
    // console.log(this.forgetPasswordForm.value.email);
    this._authService.forgetPassword(this.forgetPasswordForm.value).subscribe({
      next:(res)=>{
        console.log(res);
        this.errorMsg = res.message;
        setTimeout(() => {
          // navigate to the next page
          this._router.navigate(['/resetCode']);
        }, 1000);
        this.isloading=false;
      },
      error:(err)=>{
        console.log(err);
        this.errorMsg = err
        this.isloading=false;
      }
    })
  }
}

}
