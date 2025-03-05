import { Component, inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth/auth.service';
import { Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';


@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, TranslatePipe],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
 private readonly _authService = inject(AuthService);
  private readonly _router = inject(Router);


  isLoading: boolean = false;
  msgError: string = ""
  isSuccess:boolean = false;
  success: string = "User Created Successfully"
  userData:any;


  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.pattern(/^[A-Z]\w{7,}$/)]),
  });

  submitForm(): void {

    if (this.loginForm.valid) {
      this.isLoading = true;
      this._authService.sendLoginForm(this.loginForm.value).subscribe({
        next: (res) => {
          if (res.message === 'success') {
            this.isSuccess = true;
            this.success = res.message;
            setTimeout(() => {
              localStorage.setItem('usertoken', res.token);
              this._router.navigateByUrl('/home');
              //todo: let's decode the token when the internet avaliable
              this._authService.decodeUSerData();

              //display decoded data
              console.log(this._authService.userData);
              this.isSuccess = false;
            }, 500);
            this.isLoading = false;
          }

        },
        error: (err) => {
          this.isLoading = false;
        }
      });
    }
  }

  goToForget():void{
    this._router.navigate(['./forgetPassword'])
  }

}
