import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';

@Component({
  selector: 'app-signup',
  imports: [
    CommonModule, 
    ReactiveFormsModule,
    NzInputModule,
    NzButtonModule,
    NzFormModule
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  signupForm: FormGroup;

  constructor(private fb: FormBuilder){
    this.signupForm = this.fb.group({
      name: ['', Validators.required],
      email:['', Validators.required, Validators.email],
      password: ['', Validators.required, Validators.minLength(6)]
    })
  }

  onSubmit(): void {
    console.log(this.signupForm.value);
  }
}
