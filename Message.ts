import { RawData } from "ws";
export interface IMessage {
    data: string;
}

class Message implements IMessage {
    data: string;
    constructor(data: string) {
        this.data = data;
    }
}