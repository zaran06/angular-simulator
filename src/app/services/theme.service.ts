import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { usePreset } from '@primeuix/themes';
import Aura from '@primeuix/themes/aura';
import Lara from '@primeuix/themes/lara';
import Nora from '@primeuix/themes/nora';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {

  private modeSubject = new BehaviorSubject<string>(localStorage.getItem('mode') ?? 'light');

  mode$ = this.modeSubject.asObservable();

  private themeSubject = new BehaviorSubject<string>(localStorage.getItem('theme') ?? 'Aura');

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
    this.modeSubject.next(newMode);
    localStorage.setItem('mode', newMode);

    if (newMode === 'dark') {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }

  changeTheme(newTheme: string): void {
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
