import { CommonModule, TitleCasePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MessageService } from '../../services/message.service';


@Component({
  selector: 'app-message',
  standalone: true,
  imports: [CommonModule, TitleCasePipe],
  templateUrl: './message.component.html',
  styleUrl: './message.component.scss',
})
export class MessageComponent {
  public messageService = inject(MessageService);

  public get message() {
    return this.messageService.getMessages();
  }
}
