import {
  ApplicationConfig,
  inject,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import { DATE_PIPE_DEFAULT_OPTIONS } from '@angular/common';
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
import { APP_CONFIG } from './app-config';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideZoneChangeDetection(),

    {
      provide: DATE_PIPE_DEFAULT_OPTIONS,
      useValue: {
        dateFormat: 'dd.MM.yyyy HH:mm',
      },
    },

    {
      provide: APP_CONFIG,
      useValue: {
        companyName: 'РУМТИБЕТ',
        enableLogs: true,
        enableNotifications: true,
        enableTheming: true,
        sessionTimeout: 300000,
      },
    },

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
