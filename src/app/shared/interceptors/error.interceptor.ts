import { HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { inject } from '@angular/core';
import { MessageService } from '../../services/message.service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const messageService = inject(MessageService);

  return next(req).pipe(
    catchError((error) => {
      if (error.status >= 500 && error.status < 600) {
        messageService.showError('Ошибка сервера попробуйте позже.');
      }

      return throwError(() => error);
    }),
  );
};
