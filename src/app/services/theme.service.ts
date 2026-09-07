import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { usePreset } from '@primeuix/themes';
import Aura from '@primeuix/themes/aura';
import Lara from '@primeuix/themes/lara';
import Nora from '@primeuix/themes/nora';
import { inject } from '@angular/core';
import { APP_CONFIG } from '../app-config';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  config = inject(APP_CONFIG);
  private modeSubject = new BehaviorSubject<string>(
    this.config.enableTheming ? (localStorage.getItem('mode') ?? 'light') : 'light',
  );

  mode$ = this.modeSubject.asObservable();

  private themeSubject = new BehaviorSubject<string>(
    this.config.enableTheming ? (localStorage.getItem('theme') ?? 'Aura') : 'Aura',
  );

  theme$ = this.themeSubject.asObservable();

  constructor() {
    const currentMode = this.modeSubject.getValue();

    if (currentMode === 'dark') {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }

    const currentTheme = this.themeSubject.getValue();
    this.changeTheme(currentTheme);
  }

  changeMode(newMode: string): void {
    if (!this.config.enableTheming) {
      return;
    }

    this.modeSubject.next(newMode);
    localStorage.setItem('mode', newMode);
  }

  changeTheme(newTheme: string): void {
    if (!this.config.enableTheming) {
      return;
    }
    
    this.themeSubject.next(newTheme);
    localStorage.setItem('theme', newTheme);

    if (newTheme === 'Aura') {
      usePreset(Aura);
    } else if (newTheme === 'Lara') {
      usePreset(Lara);
    } else if (newTheme === 'Nora') {
      usePreset(Nora);
    }
  }
}
