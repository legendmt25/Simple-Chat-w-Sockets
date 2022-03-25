export interface IUser {
  username: string;
}

export class User implements IUser {
  username: string;
  constructor(username: string) {
    this.username = username;
  }
}
