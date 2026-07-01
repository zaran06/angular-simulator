import { Injectable } from "@angular/core";
import { MessageType } from "../../enums/MessageType";
import { IMessage } from "../../interfaces/IMessage";
import { BehaviorSubject } from "rxjs";

@Injectable({ providedIn: 'root' })
export class MessageService {

  private messageSubject = new BehaviorSubject<IMessage[]>([]);
  public messages$ = this.messageSubject.asObservable();

  private addMessage(text: string, type: MessageType): void {
    const id = Date.now()

    const newMessage: IMessage = {
      id: id,
      text: text,
      type: type
    };

    const currentMessages = this.messageSubject.getValue();

    this.messageSubject.next([newMessage, ...currentMessages])

    setTimeout(() => {
      this.closeMessage(id);
    },5000);
  }

  public closeMessage(id: number): void {
    const currentMessages = this.messageSubject.getValue();
    const filteredMessages = currentMessages.filter((msg) => msg.id !==id);
    this.messageSubject.next(filteredMessages);
  }

  public showSuccess(text: string): void {
    this.addMessage(text, MessageType.Success);
  }
  
  public showInfo(text: string): void {
  this.addMessage(text, MessageType.Info);
  }
  
  public showWarn(text: string): void {
  this.addMessage(text, MessageType.Warn);
  }
  
  public showError(text: string): void {
  this.addMessage(text, MessageType.Error);
  }
}




