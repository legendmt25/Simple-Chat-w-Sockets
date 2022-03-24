export interface IMessage {
  data: string;
}

export class Message implements IMessage {
  data: string;
  constructor(data: string) {
    this.data = data;
  }
}
