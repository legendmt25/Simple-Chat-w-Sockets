import { IUser } from "./User";

export interface IMessage {
  data: string;
  from: IUser;
}

export class Message implements IMessage {
  data: string;
  from: IUser;
  constructor(data: string, from: IUser) {
    this.data = data;
    this.from = from;
  }
}
