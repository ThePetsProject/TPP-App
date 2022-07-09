import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BackendErrorHandlerService } from 'src/app/services/backend-error-handler.service';
import { LoginService } from 'src/app/services/login.service';
import { AccountService } from '../private/services/account.service';

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
  recoverPwdForm!: FormGroup;

  errorMessage!: string;
  recoverPwdErrorMessage!: string;

  successMessage = '¡Registrado con éxito!';
  seconds = 5;
  showModal = false;
  isPwdRecoverySuccess = false;

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private accountService: AccountService,
    private router: Router,
    private backendErrorHandler: BackendErrorHandlerService
  ) {}

  ngOnInit(): void {
    this.buildForm();
    this.buildRecoverPwdForm();
  }

  buildForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  buildRecoverPwdForm() {
    this.recoverPwdForm = this.fb.group({
      recoverPwdEmail: ['', [Validators.email, Validators.required]],
    });
  }

  onLoginError(error: any) {
    this.errorMessage = this.backendErrorHandler.handleUserErrorMessage(error);
  }

  onLoginSuccess(response: LoginResponse) {
    const { accToken, refToken } = response;
    this.loginService.login(accToken, refToken);
    this.router.navigate(['/account/account-data']);
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

  onRecoverPwdSubmit() {
    this.recoverPwdForm.get('recoverPwdEmail')?.setValue('');
    this.isPwdRecoverySuccess = true;
  }

  recoverPwdSubmit = (): void => {
    this.isPwdRecoverySuccess = false;
    const { recoverPwdEmail } = this.recoverPwdForm.value;
    this.accountService.requestPasswordRecovery(recoverPwdEmail).subscribe({
      next: () => this.onRecoverPwdSubmit(),
      error: () => this.onRecoverPwdSubmit(),
    });
  };

  closeModal() {
    this.showModal = false;
    this.isPwdRecoverySuccess = false;
  }

  openModal() {
    this.showModal = true;
  }
}
