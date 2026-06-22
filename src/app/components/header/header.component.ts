import { Component } from '@angular/core';
import { RouterModule } from "@angular/router";

@Component({
  selector: 'app-header',
  imports: [RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  readonly companyName = 'РУМТИБЕТ';
  public showTask4: boolean = true;
  public counter: number = 0;
  public currentTime: string = '';

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
    constructor() {
    setInterval(() => this.updateTime(), 1000);
  }

     private updateTime(): void {
    const now = new Date();
    const date = now.toLocaleDateString('ru-RU');
    const time = now.toLocaleTimeString('ru-RU', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
    this.currentTime = `${date} ${time}`;
  }

  public navLinks = [
    { label: 'Главная', path: '/' },
    { label: 'Пользователи', path: '/users' }
  ];
}

