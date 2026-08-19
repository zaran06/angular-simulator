import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  private loaderSubject = new BehaviorSubject<boolean>(false);

  public loader$ = this.loaderSubject.asObservable();

  private activeRequests = 0;

  showLoader(): void {
    this.activeRequests++;

    this.loaderSubject.next(true);
    document.body.style.overflow = 'hidden';
  }

  hideLoader(): void {
    this.activeRequests--;

    if (this.activeRequests <= 0) {
      this.activeRequests = 0;

      this.loaderSubject.next(false);
      document.body.style.overflow = 'auto';
    }
  }
}
