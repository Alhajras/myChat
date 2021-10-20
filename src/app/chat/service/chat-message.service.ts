import {Injectable} from '@angular/core'
import {ChatMessage} from "../models/model";

@Injectable({
  providedIn: 'root',
})
export class ChatMessageService {
  getMessages(): ChatMessage[] {
    return [
      {
        message: 'Hello there',
        timestamp: '22:42',
        seen: true,
        channel: 'Facebook'
      },
      {
        message: 'How are you?',
        timestamp: '22:42',
        seen: true,
        channel: 'Facebook'
      },
      {
        message: 'I am fine thanks',
        timestamp: '22:42',
        seen: true,
        channel: 'Local'
      },
    ]
  }
}
