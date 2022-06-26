import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import { RegisterService } from 'src/app/services/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private registerService: RegisterService
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
        // TODO: Redirect to account
      },
      error: (error) => {
        console.error(error);
      },
      complete: () => {
        console.log('COMPLETE SUBCSRIP');
      },
    });
  }
}
