import {
  ApplicationConfig,
  inject,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

import { routes } from './app.routes';

import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';

import { loggingInterceptor } from './shared/interceptors/logging.interceptor';
import { loaderInterceptor } from './shared/interceptors/loader.interceptor';
import { errorInterceptor } from './shared/interceptors/error.interceptor';
import { authInterceptor } from './features/auth/interceptors/auth.interceptor';
import { AuthService } from './features/auth/services/auth.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideZoneChangeDetection(),

    provideHttpClient(
      withInterceptors([loggingInterceptor, loaderInterceptor, authInterceptor, errorInterceptor]),
    ),

    providePrimeNG({
      theme: {
        preset: Aura,
      },
    }),

    provideAppInitializer(() => {
      const authService = inject(AuthService);

      return authService.initAuth();
    }),
  ],
};
