import { Component, inject } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTelegram, faVk, faPinterestP, faSkype } from '@fortawesome/free-brands-svg-icons';
import { APP_CONFIG } from '../../app-config';

@Component({
  selector: 'app-footer',
  imports: [FontAwesomeModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  private config = inject(APP_CONFIG);

  readonly companyName = this.config.companyName;

  faTelegram = faTelegram;
  faVk = faVk;
  faPinterestP = faPinterestP;
  faSkype = faSkype;
}
