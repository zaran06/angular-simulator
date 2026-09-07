import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IAuth } from '../interfaces/IAuth';
import { BehaviorSubject, catchError, of, tap } from 'rxjs';
import { APP_CONFIG } from '../../../app-config';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  config = inject(APP_CONFIG);
  private http = inject(HttpClient);

  private readonly apiUrl = 'https://dummyjson.com/auth';

  private currentUserSubject = new BehaviorSubject<IAuth | null>(null);

  currentUser$ = this.currentUserSubject.asObservable();

  login(username: string, password: string) {
    return this.http
      .post<IAuth>(`${this.apiUrl}/login`, {
        username,
        password,
      })
      .pipe(
        tap((response) => {
          this.saveTokens(response.accessToken, response.refreshToken);
          localStorage.setItem('lastLogin', new Date().toISOString());
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
    return !!this.currentUserSubject.value;
  }

  refreshToken() {
    const refreshToken = this.getRefreshToken();

    return this.http
      .post<IAuth>(`${this.apiUrl}/refresh`, {
        refreshToken,
        sessionTimeout: this.config.sessionTimeout,
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

  getCurrentUser() {
    return this.http.get<IAuth>(`${this.apiUrl}/me`);
  }

  initAuth() {
    const token = this.getAccessToken();

    if (!token) {
      return of(null);
    }

    return this.getCurrentUser().pipe(
      tap((user) => {
        this.currentUserSubject.next(user);
      }),
      catchError(() => {
        this.logout();
        return of(null);
      }),
    );
  }

  getCurrentUserFromState(): IAuth | null {
    return this.currentUserSubject.value;
  }

  getLastLogin(): string | null {
    return localStorage.getItem('lastLogin');
  }
}
