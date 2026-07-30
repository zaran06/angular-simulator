import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { ThemeService } from '../../services/theme.service';
import { FormsModule } from '@angular/forms';
import { SelectButtonModule } from 'primeng/selectbutton';

@Component({
  selector: 'app-header',
  imports: [RouterModule, ToggleSwitchModule, FormsModule, SelectButtonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit, OnDestroy {
  readonly companyName = 'РУМТИБЕТ';
  public showTask4: boolean = true;
  public counter: number = 0;
  public currentTime: string = '';
  private intervalId: any;
  public themeService = inject(ThemeService);
  public isDarkMode: boolean = false;
  public selectedTheme: string = 'Aura';

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

  public toggleTask() {
    this.showTask4 = !this.showTask4;
  }

  public increment() {
    this.counter++;
  }

  public decrement() {
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

  public navLinks = [
    { label: 'Главная', path: '/' },
    { label: 'Пользователи', path: '/users' },
  ];

  public themes = [
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

  public onModeChange(): void {
    if (this.isDarkMode) {
      this.themeService.changeMode('dark');
    } else {
      this.themeService.changeMode('light');
    }
  }

  public onThemeChange(): void {
    this.themeService.changeTheme(this.selectedTheme);
  }
}
