import { Injectable } from "@angular/core";
import { MessageType } from "../../enums/MessageType";
import { IMessage } from "../../interfaces/IMessage";

@Injectable({ providedIn: 'root' })
export class MessageService {

  private messages: IMessage[] = [];
  
  public getMessages(): IMessage[] {
    return this.messages;
  }

  private addMessage(text: string, type: MessageType): void {
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




