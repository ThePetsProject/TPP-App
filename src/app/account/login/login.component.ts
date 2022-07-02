import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { interval, map } from 'rxjs';
import { BackendErrorHandlerService } from 'src/app/services/backend-error-handler.service';
import { JwtService } from 'src/app/services/jwt.service';
import { LoginService } from 'src/app/services/login.service';

interface LoginResponse {
  accToken: string;
  refToken: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  errorMessage!: string;
  successMessage = '¡Registrado con éxito!';
  seconds = 5;

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router,
    private backendErrorHandler: BackendErrorHandlerService
  ) {}

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  onLoginError(error: any) {
    this.errorMessage = this.backendErrorHandler.handleUserErrorMessage(error);
  }

  onLoginSuccess(response: LoginResponse) {
    const { accToken, refToken } = response;
    this.loginService.login(accToken, refToken);
    this.router.navigate(['/account']);
  }

  submit = (): void => {
    this.errorMessage = '';
    const { email, password } = this.loginForm.value;
    this.loginService.callLogin(email, password).subscribe({
      next: (response) => {
        this.onLoginSuccess(response as LoginResponse);
      },
      error: (error) => {
        this.onLoginError(error);
      },
    });
  };
}
