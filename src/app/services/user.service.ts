import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, catchError, finalize, of, tap } from 'rxjs';
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

  private saveToStorage(users: IUser[]): void {
    localStorage.setItem('users', JSON.stringify(users));
  }

  setUsers(users: IUser[]): void {
    this.usersSubject.next(users);
  }

  loadUsers(): void {
    const localData = localStorage.getItem('users');

    if (localData) {
      this.setUsers(JSON.parse(localData));
      return;
    }


    this.loaderService.showLoader();

    this.userApi
      .getUsers()
      .pipe(
        tap((users) => {
          this.saveToStorage(users);
          this.setUsers(users);
        }),
        catchError(() => {
          this.messageService.showError('Ошибка загрузки пользователей');
          return of([]);
        }),
        finalize(() => {
          this.loaderService.hideLoader();
        }),
      )
      .subscribe();
  }

  deleteUser(id: number): void {
    const updateUsers = this.usersSubject.value.filter(u => u.id !== id);
    this.setUsers(updateUsers);
    this.saveToStorage(updateUsers);
  }

  addUser(user: IUser): void {
    const updateUsers = [...this.usersSubject.value, user];
    this.setUsers(updateUsers);
    this.saveToStorage(updateUsers);
  }
}
