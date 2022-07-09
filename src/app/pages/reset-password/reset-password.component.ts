import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AccountService } from 'src/app/account/private/services/account.service';
import { checkPasswords } from 'src/app/shared/utils/check-passwords';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent implements OnInit {
  resetPwdForm!: FormGroup;
  errorMessage!: string;
  token!: string;
  isSuccess = false;

  constructor(
    private fb: FormBuilder,
    private accountService: AccountService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.buildForm();
    this.getTokenParam();
  }
  getTokenParam() {
    this.route.queryParams.subscribe((params) => {
      this.token = params['token'];
    });
  }

  buildForm() {
    this.resetPwdForm = this.fb.group(
      {
        password: ['', [Validators.required, Validators.minLength(6)]],
        checkPassword: ['', [Validators.required]],
      },
      { validators: checkPasswords }
    );
  }

  cleanForm() {
    for (const controlName in this.resetPwdForm.controls) {
      if (
        Object.prototype.hasOwnProperty.call(
          this.resetPwdForm.controls,
          controlName
        )
      ) {
        const control = this.resetPwdForm.controls[controlName];
        control.setValue('');
      }
    }
  }

  submit = () => {
    this.isSuccess = false;
    const { password } = this.resetPwdForm.value;
    this.accountService.resetPassword(this.token, password).subscribe({
      next: () => {
        this.cleanForm();
        this.isSuccess = true;
      },
      error: (errorMessage: string) => {
        this.cleanForm();
        this.errorMessage = errorMessage;
      },
    });
  };
}
