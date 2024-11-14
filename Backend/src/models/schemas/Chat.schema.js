import { ObjectId } from 'mongodb';

export default class ChatSchema {
    _id = new ObjectId();
    Participants = [];
    Messages = [];

    constructor(chat) {
        this._id = chat?._id ?? new ObjectId();
        this.Participants = chat?.Participants?.map(participant => participant._id) || [];
        this.Messages = chat?.Messages || []; 
    }
}