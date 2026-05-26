import { Color } from '../enums/Color';
import './training';
import { Component } from '@angular/core';
import { Collection } from  './collection';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})

export class AppComponent {

  companyName = 'РУМТИБЕТ'
  numberCollection: Collection<number> = new Collection<number>([1,2,3]);
  booleanCollection: Collection<boolean> = new Collection<boolean>([true, false]);

  isPrimaryColor(color: string): boolean {
    return color === Color.Blue || color === Color.Red || color === Color.Green;
  }

  saveLastVisitDate(): void {
    const currentDate = new Date().toISOString();
    localStorage.setItem('lastVisit', currentDate);
  }

  constructor() {
    this.saveLastVisitDate();
    this.trackPageVisit;
  }

  trackPageVisit(): void {
    const savedVisits = localStorage.getItem('visitCount');
    if (savedVisits === null) {
      localStorage.setItem('visitCount', "1")
    } else {
      const currentCount = parseInt(savedVisits);
      const newCount = currentCount + 1;
      localStorage.setItem('visitCount', newCount.toString())
    }
  }
}
