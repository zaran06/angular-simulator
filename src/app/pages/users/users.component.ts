import { Component, inject } from '@angular/core';
import { UserService } from '../../services/user.service';
import { AsyncPipe } from '@angular/common';
import { UserCardComponent } from '../../components/user-card/user-card.component';
import { IUser } from '../../../interfaces/IUser';
import { UserCreateComponent } from '../../components/user-create/user-create.component';
import { UsersFilterComponent } from '../../components/users-filter/users-filter.component';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { map, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { PluralPipe } from '../../shared/pipes/plural.pipe';

@Component({
  selector: 'app-users',
  imports: [AsyncPipe, UserCardComponent, UserCreateComponent, UsersFilterComponent, PluralPipe],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
})
export class UsersComponent {
  private userService = inject(UserService);

  private filterSubject = new BehaviorSubject<string>('');

  public filteredUsers$ = combineLatest([
    this.userService.users$,
    this.filterSubject.asObservable().pipe(debounceTime(200), distinctUntilChanged()),
  ]).pipe(
    map(([users, filter]) => {
      const searchString = filter.toLowerCase().trim();
      return users.filter((user) => user.name.toLowerCase().includes(searchString));
    }),
    takeUntilDestroyed(),
  );

  ngOnInit(): void {
    this.userService.loadUsers();
  }

  handleDelete(id: number): void {
    this.userService.deleteUser(id);
  }

  addUser(newUser: IUser): void {
    this.userService.addUser(newUser);
  }

  handleFilter(filterString: string): void {
    this.filterSubject.next(filterString);
  }
}
