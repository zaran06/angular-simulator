import { FormsModule } from '@angular/forms';
import { Color } from '../enums/Color';
import './training';
import { Component } from '@angular/core';
import { Collection } from './collection';
import { IProgram } from '../interfaces/IProgram';

@Component({
  selector: 'app-root',
  imports: [FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent  {

  public isLoading: boolean = true;
  public liveText: string = '';
  public showTask4: boolean = true;
  public counter: number = 0;
  public selectedLocation: string = '';
  public selectedDate: string = '';
  public selectedParticipants: string = '';
  public currentTime: string = '';
  readonly companyName = 'РУМТИБЕТ';

  readonly programs: IProgram[] = [
    {
      id: 1,
      title: 'Опытный гид',
      description: 'Для современного мира базовый вектор развития...',
      icon: '/images/guide-icon.svg'
    },
    {
      id: 2,
      title: 'Безопасный поход',
      description: 'Для современного мира базовый вектор развития...',
      icon: '/images/safety-icon.svg'
    },
    {
      id: 3,
      title: 'Лояльные цены',
      description: 'Для современного мира базовый вектор развития...',
      icon: '/images/price-icon.svg'
    }
  ];

  readonly programImages: string[] = [
    '/images/program-photo-1.jpg',
    '/images/program-photo-2.jpg',
    '/images/program-photo-3.jpg',
    '/images/program-photo-4.jpg'
  ];

  private numberCollection: Collection<number> = new Collection<number>([1, 2, 3]);
  private booleanCollection: Collection<boolean> = new Collection<boolean>([true, false]);

  constructor() {
    this.saveLastVisitDate();
    this.trackPageVisit();

    setInterval(() => {
      this.updateTime();
    }, 1000);

    setTimeout(() => {
      this.isLoading = false;
    }, 2000);
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

  public isPrimaryColor(color: string): boolean {
    return color === Color.Blue || color === Color.Red || color === Color.Green;
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

  private saveLastVisitDate(): void {
    const currentDate = new Date().toISOString();
    localStorage.setItem('lastVisit', currentDate);
  }

  private trackPageVisit(): void {
    const savedVisits = localStorage.getItem('visitCount');
    if (savedVisits === null) {
      localStorage.setItem('visitCount', "1");
    } else {
      const currentCount = parseInt(savedVisits);
      const newCount = currentCount + 1;
      localStorage.setItem('visitCount', newCount.toString());
    }
  }
}