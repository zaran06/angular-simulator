import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, catchError, finalize, of, tap} from 'rxjs';
import { IUser } from '../../interfaces/IUser';
import { UserApiService } from './user-api.service';
import { LoaderService } from './loader.service';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  private userApi = inject(UserApiService);
  private loaderService = inject(LoaderService);
  private messageService = inject(MessageService);

  private usersSubject = new BehaviorSubject<IUser[]>([]);
  public users$ = this.usersSubject.asObservable();

  setUsers(users: IUser[]): void {
    this.usersSubject.next(users);
  }

  loadUsers() {
    this.loaderService.showLoader();

    return this.userApi.getUsers().pipe(
      tap((users) => {
        this.setUsers(users);
      }),

      catchError(() => {
        this.messageService.showError('Ошибка загрузки пользователей');
        return of([]);
      }),

      finalize(() => {
        this.loaderService.hideLoader();
      })
    );
  }
}
