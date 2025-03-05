import { Component, inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth/auth.service';
import { Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, TranslatePipe],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  private readonly _authService = inject(AuthService);
  private readonly _router = inject(Router);


  isLoading: boolean = false;
  msgError: string = ""
  isSuccess:boolean = false;
  success: string = "User Created Successfully"

  registerForm: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.pattern(/^[A-Z]\w{7,}$/)]),
    rePassword: new FormControl(null, [Validators.required]),
    phone: new FormControl(null, [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)])
  }, { validators: this.confirmPassword });

  submitForm(): void {

    if (this.registerForm.valid) {
      this.isLoading = true;
      this._authService.sendRegisterForm(this.registerForm.value).subscribe({
        next: (res) => {
          if (res.message === 'success') {
            this.isSuccess = true;
            this.success = res.message;
            console.log(res);
            setTimeout(() => {
              this._router.navigateByUrl('/login');
              this.isSuccess = false;

            }, 500);
            this.isLoading = false;
          }

        },
        error: (err) => {
          this.isLoading = false;
        }
      });
    } else {
      this.registerForm.get('rePassword')?.setErrors({required:true});
      this.registerForm.markAllAsTouched();
    }
  }

  confirmPassword(group: AbstractControl) {
    const password = group.get('password')?.value;
    const rePassword = group.get('rePassword')?.value;

    return password === rePassword ? null : { mismatch: true };
  }
}
