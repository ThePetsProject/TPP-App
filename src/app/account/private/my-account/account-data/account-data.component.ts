import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import {
  AccountDataResponse,
  AccountNewData,
  AccountService,
} from '../../services/account.service';

@Component({
  selector: 'app-account-data',
  templateUrl: './account-data.component.html',
  styleUrls: ['./account-data.component.scss'],
})
export class AccountDataComponent implements OnInit {
  errorMessage!: string;
  accountDataForm!: FormGroup;
  emailValue!: string;
  nameValue!: string | undefined;
  surNameValue!: string | undefined;
  isSuccess = false;

  constructor(
    private fb: FormBuilder,
    private accountService: AccountService
  ) {}

  ngOnInit(): void {
    this.buildForm();
    this.getAccountData();
  }

  checkPasswords: ValidatorFn = (
    group: AbstractControl
  ): ValidationErrors | null => {
    let pass = group.get('password')?.value;
    let confirmPass = group.get('checkPassword')?.value;
    return pass === confirmPass ? null : { notSame: true };
  };

  buildForm() {
    this.accountDataForm = this.fb.group(
      {
        name: [''],
        surName: [''],
        email: ['', [Validators.email]],
        password: ['', [Validators.minLength(6)]],
        checkPassword: [''],
      },
      { validators: this.checkPasswords }
    );
  }

  submit = () => {
    let payload = {} as AccountNewData;
    this.isSuccess = false;
    for (const key in this.accountDataForm.controls) {
      if (
        Object.prototype.hasOwnProperty.call(this.accountDataForm.controls, key)
      ) {
        const element = this.accountDataForm.controls[key];
        payload[key as keyof AccountNewData] = element.value || undefined;
      }
    }
    this.accountService.saveAccountData(payload).subscribe({
      next: () => {
        this.accountDataForm.get('password')?.setValue('');
        this.accountDataForm.get('checkPassword')?.setValue('');
        this.isSuccess = true;
      },
      error: () => {
        this.accountDataForm.get('password')?.setValue('');
        this.accountDataForm.get('checkPassword')?.setValue('');
      },
    });
  };

  getAccountData() {
    this.accountService.getAccountData().subscribe({
      next: (response: AccountDataResponse) => {
        const { email, name, surName } = response;
        this.accountDataForm.get('email')?.setValue(email);
        this.accountDataForm.get('name')?.setValue(name);
        this.accountDataForm.get('surName')?.setValue(surName);
      },
      error: (error: HttpErrorResponse) => {
        console.error('Could not get account data: ', error);
      },
    });
  }
}
