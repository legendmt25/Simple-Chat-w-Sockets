import { IMessage, Message } from './Message';
import { IUser } from './User';

export interface IChat {
  users: IUser[];
  messages: Message[];
}

export class Chat implements IChat {
  users: IUser[];
  messages: Message[];
  constructor() {
    this.users = [];
    this.messages = [];
  }

  addMessage(message: IMessage) {
    this.messages.push(message);
  }

  getMessages() {
    return this.messages;
  }

  addUser(user: IUser) {
    this.users.push(user);
  }
}
