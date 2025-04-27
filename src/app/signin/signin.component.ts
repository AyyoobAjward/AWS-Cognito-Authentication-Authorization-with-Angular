import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [
    CommonModule,
    NzFormModule,
    ReactiveFormsModule,
    NzInputModule,
    NzButtonModule,
  ],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss',
})
export class SigninComponent implements OnInit {
  signinForm: FormGroup;
  isAuthenticated = false;
  accessToken = '';
  userData = '';

  constructor(
    private fb: FormBuilder,
    private oidcSecurityService: OidcSecurityService,
    private httpClient: HttpClient
  ) {
    this.signinForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    // Subscribe to authentication state
    this.oidcSecurityService.isAuthenticated$.subscribe(({ isAuthenticated }) => {
      this.isAuthenticated = isAuthenticated;
      console.warn('Authenticated:', isAuthenticated);

      if (isAuthenticated) {
        this.getTokens();
      }
    });
  }

  onSubmit(): void {
    // Trigger OIDC login
    this.oidcSecurityService.authorize();
    this.getTokens();
  }

  private getTokens(): void {
    this.oidcSecurityService.getAccessToken().subscribe((token) => {
      this.accessToken = token;
      console.log('Access Token:', this.accessToken);
  
      // Now you can call the protected API after getting the token
      this.callProtectedApi();
    });
  
    this.oidcSecurityService.getIdToken().subscribe((idToken) => {
      console.log('ID Token:', idToken);
    });
  }
  

  private callProtectedApi(): void {
    if (!this.accessToken) {
      console.error('Access Token is not available.');
      return;
    }

    this.httpClient.get('https://ap-southeast-1pj3qdg6s4.auth.ap-southeast-1.amazoncognito.com/oauth2/token', {
      headers: {
        Authorization: `Bearer ${this.accessToken}`
      }
    }).subscribe({
      next: (response) => {
        console.log('Protected API Response:', response);
      },
      error: (error) => {
        console.error('Error calling protected API:', error);
      }
    });
  }
}
