import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { tap } from 'rxjs';
import { inject } from '@angular/core';
import { APP_CONFIG } from '../../app-config';

export const loggingInterceptor: HttpInterceptorFn = (req, next) => {
  const config = inject(APP_CONFIG);

  if (config.enableLogs) {
    console.log('HTTP method:', req.method);
    console.log('HTTP URL:', req.url);
  }

  const startTime = Date.now();

  return next(req).pipe(
    tap({
      next: (event) => {
        if (event instanceof HttpResponse) {
          const requestTime = Date.now() - startTime;

          if (config.enableLogs) {
            console.log('HTTP time:', `${requestTime} ms`);
            console.log('HTTP status:', event.status);
          }
        }
      },

      error: (error) => {
        const requestTime = Date.now() - startTime;

        if (config.enableLogs) {
          console.log('HTTP error:', error);
          console.log('HTTP error status:', error.status);
          console.log('HTTP time:', `${requestTime} ms`);
        }
      },
    }),
  );
};
