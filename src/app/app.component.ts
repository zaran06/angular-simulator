import { FormsModule } from '@angular/forms';
import { Color } from '../enums/Color';
import './training';
import { Component, inject } from '@angular/core';
import { Collection } from './collection';
import { IProgram } from '../interfaces/IProgram';
import { IDestinations } from '../interfaces/IDestinations';
import { ITravel } from '../interfaces/ITravel';
import { MessageService } from './services/message.service';
import { MessageType } from '../enums/MessageType';
import { CommonModule } from '@angular/common';
import { StorageService } from './services/storage.service';

@Component({
  selector: 'app-root',
  imports: [FormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent  {

  public messageService = inject(MessageService);
  private storageService = inject(StorageService);
  
  public MessageType = MessageType;
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
      description: 'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.',
      icon: '/images/guide-icon.svg'
    },
    {
      id: 2,
      title: 'Безопасный поход',
      description: 'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.',
      icon: '/images/safety-icon.svg'
    },
    {
      id: 3,
      title: 'Лояльные цены',
      description: 'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.',
      icon: '/images/price-icon.svg'
    }
  ];

  readonly programImages: string[] = [
    '/images/program-photo-1.jpg',
    '/images/program-photo-2.jpg',
    '/images/program-photo-3.jpg',
    '/images/program-photo-4.jpg'
  ];

  readonly destinations: IDestinations[] = [
    {
      id: 1,
      image: '/images/stretching-in-the-mountains.png',
      rating: '4.9',
      title: 'Озеро возле гор',
      description: 'романтическое приключение',
      price: '480 $'
    },
    {
      id: 2,
      image: '/images/night-in-the-mountains.png',
      rating: '4.5',
      title: 'Ночь в горах',
      description: 'в компании друзей',
      price: '500 $'
    },
    {
      id: 3,
      image: '/images/lake-near-the-mountains.png',
      rating: '5.0',
      title: 'Растяжка в горах',
      description: 'для тех, кто забоится о себе',
      price: '230 $'
    }
  ];

  readonly travel: ITravel[] = [
    {
      id: 1,
      image: '/images/italy.png',
      title: "Красивая Италия, какая она в реальности?",
      description: "Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации",
      date: "01/04/2023"
    },
    {
      id: 2,
      image: '/images/clouds.png',
      title: "Долой сомнения! Весь мир открыт для вас!",
      description: "Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации ... независимые способы реализации соответствующих...",
      date: "01/04/2023"
    },
    {
      id: 3,
      image: '/images/street.png',
      title: "Как подготовиться к путешествию в одиночку? ",
      description: "Для современного мира базовый вектор развития предполагает.",
      date: "01/04/2023"
    },
    {
      id: 4,
      image: '/images/india.png',
      title: "Индия ... летим?",
      description: "Для современного мира базовый.",
      date: "01/04/2023"
    }
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

  public get messages() {
    return this.messageService.getMessages();
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
    this.storageService.setItem('lastVisit', currentDate);
  }

  private trackPageVisit(): void {
    const savedVisits = this.storageService.getItem<number>('visitCount');

    if (savedVisits === null) {
      this.storageService.setItem('visitCount', 1);
    } else {
      this.storageService.setItem('visitCount', savedVisits +1);
    }
  }
}
