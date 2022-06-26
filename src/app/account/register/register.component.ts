import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import { BackendErrorHandlerService } from 'src/app/services/backend-error-handler.service';
import { RegisterService } from 'src/app/services/register.service';
import { BackendResponse } from 'src/app/shared/interfaces/backend-response';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  errorMessage!: string;

  constructor(
    private fb: FormBuilder,
    private registerService: RegisterService,
    private backendErrorHandler: BackendErrorHandlerService
  ) {}

  ngOnInit(): void {
    this.buildForm();
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
        password: ['', [Validators.required]],
        checkPassword: ['', [Validators.required]],
      },
      { validators: this.checkPasswords }
    );
  }

  submit() {
    const { email, password } = this.registerForm.value;
    this.registerService.register(email, password).subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (error) => {
        this.errorMessage =
          this.backendErrorHandler.handleUserErrorMessage(error);
      },
    });
  }
}
