import {
  ApplicationConfig,
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

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideZoneChangeDetection(),

    provideHttpClient(withInterceptors([loggingInterceptor, loaderInterceptor, errorInterceptor])),

    providePrimeNG({
      theme: {
        preset: Aura,
      },
    }),
  ],
};
