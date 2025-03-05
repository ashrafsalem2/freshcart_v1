import { codeData } from './../../../shared/interfaces/auth/userData';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth/auth.service';
import { Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';


@Component({
  selector: 'app-reset-code',
  imports: [ReactiveFormsModule, TranslatePipe],
  templateUrl: './reset-code.component.html',
  styleUrl: './reset-code.component.scss'
})
export class ResetCodeComponent {
// variables
  isloading!:boolean
  errorMsg!:string

  // constructor
  constructor(private _authService:AuthService, private _router:Router){}

codeForm:FormGroup = new FormGroup({
  resetCode: new FormControl(null, [
    Validators.required
  ])
})

submitcodeForm(){
  if(this.codeForm.valid){
    this.isloading = true;
    // console.log(this.codeForm.value.email);
    this._authService.resetCode(this.codeForm.value).subscribe({
      next:(res)=>{
        console.log(res.status);
        this.errorMsg = res.message;
        // // navigate to gteNewPassword
        // this._router.navigate(['/renewPass']);
        setTimeout(() => {
          // navigate to the next page
          this._router.navigate(['/renewPass']);
        }, 1000);
        this.isloading=false;
      },
      error:(err)=>{
        console.log(err);
        this.errorMsg = err.error.message
        this.isloading=false;
      }
    })
  }
}
}
