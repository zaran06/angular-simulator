import { Injectable, inject } from '@angular/core';
import { MessageType } from '../../enums/MessageType';
import { IMessage } from '../../interfaces/IMessage';
import { BehaviorSubject } from 'rxjs';
import { APP_CONFIG } from '../app-config';

@Injectable({ providedIn: 'root' })
export class MessageService {
  private config = inject(APP_CONFIG);

  private messageSubject = new BehaviorSubject<IMessage[]>([]);

  messages$ = this.messageSubject.asObservable();

  private addMessage(text: string, type: MessageType): void {
    if (!this.config.enableNotifications) {
      return;
    }

    const id = Date.now();

    const newMessage: IMessage = {
      id: id,
      text: text,
      type: type,
    };

    const currentMessages = this.messageSubject.getValue();

    this.messageSubject.next([newMessage, ...currentMessages]);

    setTimeout(() => {
      this.closeMessage(id);
    }, 5000);
  }

  closeMessage(id: number): void {
    const currentMessages = this.messageSubject.getValue();
    const filteredMessages = currentMessages.filter((msg) => msg.id !== id);
    this.messageSubject.next(filteredMessages);
  }

  showSuccess(text: string): void {
    this.addMessage(text, MessageType.SUCCESS);
  }

  showInfo(text: string): void {
    this.addMessage(text, MessageType.INFO);
  }

  showWarn(text: string): void {
    this.addMessage(text, MessageType.WARN);
  }

  showError(text: string): void {
    this.addMessage(text, MessageType.ERROR);
  }
}
