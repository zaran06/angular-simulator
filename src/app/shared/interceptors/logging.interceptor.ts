import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { tap } from 'rxjs';

export const loggingInterceptor: HttpInterceptorFn = (req, next) => {
  console.log('HTTP method:', req.method);
  console.log('HTTP URL:', req.url);

  const startTime = Date.now();

  return next(req).pipe(
    tap({
      next: (event) => {
        if (event instanceof HttpResponse) {
          const requestTime = Date.now() - startTime;

          console.log('HTTP time:', `${ requestTime } ms`);
          console.log('HTTP status:', event.status);
        }
      },

      error: (error) => {
        const requestTime = Date.now() - startTime;

        console.log('HTTP error:', error);
        console.log('HTTP error status:', error.status);
        console.log('HTTP time:', `${ requestTime } ms`);
      },
    }),
  );
};
