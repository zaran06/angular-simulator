import { Injectable } from "@angular/core";
import { MessageType } from "../../enums/MessageType";
import { IMessage } from "../../interfaces/IMessage";

@Injectable({ providedIn: 'root' })
export class MessageService {

  private messages: IMessage[] = [];
  
  public getMessages(): IMessage[] {
    return this.messages;
  }

  public addMessage(text: string, type: MessageType): void {
    const id = Date.now()

    const newMessage: IMessage = {
      id: id,
      text: text,
      type: type
    };

    this.messages.unshift(newMessage);

    setTimeout(() => {
      this.closeMessage(id);
    },5000);
  }

  public closeMessage(id: number): void {
    this.messages = this.messages.filter((msg) => msg.id !== id);
  }
}