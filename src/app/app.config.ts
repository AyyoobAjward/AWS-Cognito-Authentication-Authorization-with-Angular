import { AuthModule } from 'angular-auth-oidc-client';
import { ApplicationConfig, provideZoneChangeDetection, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { en_US, provideNzI18n } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule } from '@angular/forms';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';

registerLocaleData(en);

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideNzI18n(en_US), importProvidersFrom(FormsModule), provideAnimationsAsync(), provideHttpClient(), importProvidersFrom(AuthModule.forRoot({
    config: {
      authority: 'https://cognito-idp.ap-southeast-1.amazonaws.com/ap-southeast-1_pj3QdG6s4',
      redirectUrl: 'http://localhost:4200/sign-in',
      clientId: 'ao9865cisfb0c1koh5ak1h1lc',
      scope: 'phone openid email',
      responseType: 'code'
    }
  }))]
};
