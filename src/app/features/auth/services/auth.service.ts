import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IAuth } from '../interfaces/IAuth';
import { BehaviorSubject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);

  private readonly apiUrl = 'https://dummyjson.com/auth';

  private currentUserSubject = new BehaviorSubject<IAuth | null>(null);

  public currentUser$ = this.currentUserSubject.asObservable();

  login(username: string, password: string) {
    return this.http
      .post<IAuth>(`${this.apiUrl}/login`, {
        username,
        password,
      })
      .pipe(
        tap((response) => {
          this.saveTokens(response.accessToken, response.refreshToken);
          this.currentUserSubject.next(response);
        }),
      );
  }

  saveTokens(accessToken: string, refreshToken: string): void {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
  }

  getAccessToken(): string | null {
    return localStorage.getItem('accessToken');
  }

  getRefreshToken(): string | null {
    return localStorage.getItem('refreshToken');
  }

  isAuthenticated(): boolean {
    return !!this.getAccessToken();
  }

  refreshToken() {
    const refreshToken = this.getRefreshToken();

    return this.http
      .post<IAuth>(`${this.apiUrl}/refresh`, {
        refreshToken,
      })
      .pipe(
        tap((response) => {
          this.saveTokens(response.accessToken, response.refreshToken);
        }),
      );
  }

  logout(): void {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');

    this.currentUserSubject.next(null);
  }

  getCurrenUser() {
    return this.http.get<IAuth>(`${this.apiUrl}/me`);
  }

  initAuth() {
    const token = this.getAccessToken();

    if (!token) {
      return;
    }

    this.getCurrenUser().subscribe({
      next: (user) => {
        this.currentUserSubject.next(user);
      },

      error: () => {
        this.logout();
      },
    });
  }
}
