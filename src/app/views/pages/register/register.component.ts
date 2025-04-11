import { Component } from '@angular/core';
import { IconDirective } from '@coreui/icons-angular';
import { ContainerComponent, RowComponent, ColComponent, TextColorDirective, CardComponent, CardBodyComponent, InputGroupComponent, InputGroupTextDirective, FormControlDirective, ButtonDirective } from '@coreui/angular';
import {AuthService} from "../auth.service"
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss'],
    imports: [ContainerComponent, RowComponent, ColComponent, TextColorDirective, CardComponent, CardBodyComponent, InputGroupComponent, InputGroupTextDirective, IconDirective, FormControlDirective, ButtonDirective,ReactiveFormsModule],
    providers:[AuthService]
})
export class RegisterComponent {
  registerForm: FormGroup;
  constructor(private fb: FormBuilder,private authService:AuthService ,private router:Router) {

    this.registerForm = this.fb.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      repeatPassword: ['', [Validators.required]],
    }, {
    })
  }
  onSubmit(): void {
    if (this.registerForm.valid) {
      const data = this.registerForm.getRawValue()
      this.authService.saveUser(data).then((res)=>{
        this.router.navigate(['/login']);
      })
    }
  }
}
