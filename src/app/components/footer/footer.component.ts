import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTelegram, faVk, faPinterestP, faSkype } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-footer',
  imports: [FontAwesomeModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  faTelegram = faTelegram;
  faVk = faVk;
  faPinterestP = faPinterestP;
  faSkype = faSkype;
}
