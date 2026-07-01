import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  
  private loaderSubject = new BehaviorSubject<boolean>(false);

  public loader$ = this.loaderSubject.asObservable();

  showLoader(): void {
    this.loaderSubject.next(true);
    document.body.style.overflow = 'hidden';
  }

  hideLoader(): void {
    this.loaderSubject.next(false);
    document.body.style.overflow = 'auto';
  }
}
