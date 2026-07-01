import './training';
import { Component, inject } from '@angular/core';
import { StorageService } from './services/storage.service';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { CommonModule } from '@angular/common';
import { MessageService } from './services/message.service';
import { MessageComponent } from "./components/message/message.component";
import { LoaderComponent } from './components/loader/loader.component';
import { LoaderService } from './services/loader.service';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent, CommonModule, MessageComponent, LoaderComponent,],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  
  
  private storageService = inject(StorageService);
  public messageService = inject(MessageService);
  public loaderService = inject(LoaderService);

  constructor() {
    this.saveLastVisitDate();
    this.trackPageVisit();
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
