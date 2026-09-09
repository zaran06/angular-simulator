import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { ThemeService } from '../../services/theme.service';
import { FormsModule } from '@angular/forms';
import { SelectButtonModule } from 'primeng/selectbutton';
import { AuthService } from '../../features/auth/services/auth.service';
import { AsyncPipe } from '@angular/common';
import { DatePipe } from '@angular/common';
import { APP_CONFIG } from '../../app-config';

@Component({
  selector: 'app-header',
  imports: [RouterModule, ToggleSwitchModule, FormsModule, SelectButtonModule, AsyncPipe, DatePipe],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit, OnDestroy {
  config = inject(APP_CONFIG);

  readonly companyName = this.config.companyName;

  showTask4 = true;

  counter = 0;

  currentTime = '';

  private intervalId: number | undefined;

  themeService = inject(ThemeService);

  isDarkMode = false;

  selectedTheme = 'Aura';

  authService = inject(AuthService);

  private router = inject(Router);

  lastLogin$ = this.authService.lastLogin$;

  ngOnInit(): void {
    this.themeService.mode$.subscribe((mode) => {
      this.isDarkMode = mode === 'dark';
    });
    this.themeService.theme$.subscribe((theme) => {
      this.selectedTheme = theme;
    });
    this.themeService.changeTheme(this.selectedTheme);
    this.updateTime();
    this.intervalId = setInterval(() => this.updateTime(), 1000);
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  toggleTask() {
    this.showTask4 = !this.showTask4;
  }

  increment() {
    this.counter++;
  }

  decrement() {
    if (this.counter > 0) {
      this.counter--;
    }
  }

  private updateTime(): void {
    const now = new Date();
    const date = now.toLocaleDateString('ru-RU');
    const time = now.toLocaleTimeString('ru-RU', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
    this.currentTime = `${date} ${time}`;
  }

  navLinks = [
    { label: 'Главная', path: '/' },
    { label: 'Пользователи', path: '/users' },
  ];

  themes = [
    {
      label: 'Aura',
      value: 'Aura',
    },
    {
      label: 'Lara',
      value: 'Lara',
    },
    {
      label: 'Nora',
      value: 'Nora',
    },
  ];

  onModeChange(): void {
    if (this.isDarkMode) {
      this.themeService.changeMode('dark');
    } else {
      this.themeService.changeMode('light');
    }
  }

  onThemeChange(): void {
    this.themeService.changeTheme(this.selectedTheme);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
