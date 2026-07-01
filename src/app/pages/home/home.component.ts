import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MessageService } from '../../services/message.service';
import { IProgram } from '../../../interfaces/IProgram';
import { IDestinations } from '../../../interfaces/IDestinations';
import { ITravel } from '../../../interfaces/ITravel';
import { IGalleryItem } from '../../../interfaces/IGalleryItem';
import { Color } from '../../../enums/Color';
import { Collection } from '../../collection';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  public messageService = inject(MessageService);

  public liveText: string = '';
  public selectedLocation: string = '';
  public selectedDate: string = '';
  public selectedParticipants: string = '';

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

  readonly galleryItems: IGalleryItem[] = [
    {
      id: 1,
      image: '/images/balloons.png'
    },
    {
      id: 2,
      image: '/images/map.png'
    },
    {
      id: 3,
      image: '/images/skyscraper.png'
    },
    {
      id: 4,
      image: '/images/boats.png'
    },
    {
      id: 5,
      image: '/images/rocks.png'
    },
    {
      id: 6,
      image: '/images/notebook.png'
    }
  ];

  private numberCollection: Collection<number> = new Collection<number>([1, 2, 3]);
  private booleanCollection: Collection<boolean> = new Collection<boolean>([true, false]);

   public get messages() {
    return this.messageService.messages$;
  }

  public isPrimaryColor(color: string): boolean {
    return color === Color.Blue || color === Color.Red || color === Color.Green;
  }
}
