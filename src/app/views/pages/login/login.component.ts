import { Component, OnInit } from '@angular/core';
import { NgStyle } from '@angular/common';
import { IconDirective } from '@coreui/icons-angular';
import {
  ContainerComponent,
  RowComponent,
  ColComponent,
  CardGroupComponent,
  TextColorDirective,
  CardComponent,
  CardBodyComponent,
  FormDirective,
  InputGroupComponent,
  InputGroupTextDirective,
  FormControlDirective,
  ButtonDirective,
} from '@coreui/angular';
import { Router } from '@angular/router';
import Cookies from 'js-cookie';
import { AuthService } from '../auth.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [
    ContainerComponent,
    RowComponent,
    ColComponent,
    CardGroupComponent,
    TextColorDirective,
    CardComponent,
    CardBodyComponent,
    InputGroupComponent,
    InputGroupTextDirective,
    IconDirective,
    FormControlDirective,
    ButtonDirective,
    NgStyle,
    ReactiveFormsModule,
  ],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errorMessage: string = '';
  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.loginForm = this.createForm();
  }
  ngOnInit(): void {
  }
  createForm(): FormGroup {
    return (this.loginForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    }));
  }
  routeRegister() {
    this.router.navigate(['/register']);
  }

  login() {
    const data = this.loginForm?.getRawValue();
    this.authService
      .login(data)
      .then((response: any) => {
        Cookies.set('auth_token', response.token, { expires: 1 / 24 });

        this.router.navigate(['/dashboard']);
      })
      .catch((err) => {
        this.errorMessage = 'Giriş başarısız!';
      });
  }
}
