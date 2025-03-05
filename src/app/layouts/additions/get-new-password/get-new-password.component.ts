
import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth/auth.service';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-get-new-password',
  imports: [ReactiveFormsModule, TranslatePipe],
  templateUrl: './get-new-password.component.html',
  styleUrl: './get-new-password.component.scss'
})
export class GetNewPasswordComponent {
// variables
  isloading!:boolean
  errorMsg!:string

  private readonly _router=inject(Router);
  // constructor
  constructor(private _authService:AuthService){}

newPasswordForm:FormGroup = new FormGroup({
  email: new FormControl(null, [
    Validators.required,
    Validators.email
  ]),
  newPassword: new FormControl(null, [
    Validators.required
  ])
})

submitNewPasswordForm(){
  if(this.newPasswordForm.valid){
    this.isloading = true;
    // console.log(this.newPasswordForm.value.email);
    this._authService.getNewPassword(this.newPasswordForm.value).subscribe({
      next:(res)=>{
        console.log(res);
        this.errorMsg = res.message;
        setTimeout(() => {
          // navigate to the login to test the new password
          this._router.navigate(['/login']);
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
