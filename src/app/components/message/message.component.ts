import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MessageService } from '../../services/message.service';


@Component({
  selector: 'app-message',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './message.component.html',
  styleUrl: './message.component.scss',
})
export class MessageComponent {
  public messageService = inject(MessageService);
  public messages$ = this.messageService.messages$;
}
