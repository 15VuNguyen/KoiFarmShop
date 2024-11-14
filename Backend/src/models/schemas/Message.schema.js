import { ObjectId } from 'mongodb';

export default class MessageSchema {
    _id = new ObjectId();
    SenderId = "";
    ReceiverId = "";
    Content = "";
    ChatId = "";

    constructor(message) {
        this._id = message?._id ?? new ObjectId(); 
        this.SenderId = message?.SenderId ?? ""; 
        this.ReceiverId = message?.ReceiverId ?? ""; 
        this.Content = message?.Content?.trim() ?? "";
        this.ChatId = message?.ChatId ?? ""; 
    }
}