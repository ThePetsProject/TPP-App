import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import { Router } from '@angular/router';
import { BackendErrorHandlerService } from 'src/app/services/backend-error-handler.service';
import { RegisterService } from 'src/app/services/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  errorMessage!: string;
  baseSeconds = 5;
  timerSeconds!: number;
  success = false;
  timerInterval!: ReturnType<typeof setInterval>;

  constructor(
    private fb: FormBuilder,
    private registerService: RegisterService,
    private backendErrorHandler: BackendErrorHandlerService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.buildForm();
    this.startCountDown();
  }

  checkPasswords: ValidatorFn = (
    group: AbstractControl
  ): ValidationErrors | null => {
    let pass = group.get('password')?.value;
    let confirmPass = group.get('checkPassword')?.value;
    return pass === confirmPass ? null : { notSame: true };
  };

  buildForm() {
    this.registerForm = this.fb.group(
      {
        email: ['', [Validators.email, Validators.required]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        checkPassword: ['', [Validators.required]],
      },
      { validators: this.checkPasswords }
    );
  }

  startCountDown(): void {
    this.timerInterval = setInterval(() => {
      this.timerSeconds =
        this.timerSeconds > 0 ? this.timerSeconds - 1 : this.clearCountDown();
    }, 1000);
  }

  clearCountDown(): number {
    clearInterval(this.timerInterval);
    return 0;
  }

  onRegisterSuccess() {
    this.success = true;
    this.timerSeconds = this.baseSeconds;
    this.startCountDown();
    setTimeout(() => {
      this.router.navigate(['/login']);
    }, this.baseSeconds * 1000);
  }

  onRegisterError(error: any) {
    this.errorMessage = this.backendErrorHandler.handleUserErrorMessage(error);
    this.registerForm.get('email')?.setValue('');
    this.registerForm.get('password')?.setValue('');
    this.registerForm.get('checkPassword')?.setValue('');
  }

  submit = (): void => {
    this.errorMessage = '';
    const { email, password } = this.registerForm.value;
    this.registerService.register(email, password).subscribe({
      next: () => {
        this.onRegisterSuccess();
      },
      error: (error) => {
        this.onRegisterError(error);
      },
    });
  };
}
