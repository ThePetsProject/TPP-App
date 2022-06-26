import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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

  constructor(
    private loginService: LoginService,
    private fb: FormBuilder,
    private jwtService: JwtService,
    private router: Router
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

  submit() {
    const { email, password } = this.loginForm.value;
    this.loginService.login(email, password).subscribe({
      next: (response) => {
        const { accToken, refToken } = response as LoginResponse;
        this.jwtService.saveJWT('accToken', accToken);
        this.jwtService.saveJWT('refToken', refToken);
        this.router.navigate(['/account/my-account']);
      },
      error: (error) => {
        // TODO: Handle errors
      },
    });
  }
}
