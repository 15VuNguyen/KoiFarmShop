import { getReceiverSocketId } from '../Socket/socket.js'
import databaseService from './database.service.js'
import { ObjectId } from 'mongodb'

class ChatService {
    async fetchChats(userID) {
        const chats = await databaseService.chats.find({
            Participants: new ObjectId(userID)
        }).toArray()

        if(!chats){
            return []
        }

        const populateChat = await Promise.all(chats.map(async (chat) => {
            const otherParticipant = chat.Participants.find(participant => participant.toString() !== userID.toString())
            // const participants = await databaseService.users.find({
            //     _id: { $in: chat.Participants}
            // }).toArray()
            const messages = await databaseService.messages.find({
                ChatId: chat._id
            }).toArray()

            return {
                _id: chat._id,
                OtherUser: otherParticipant,
                Messages: messages
            }
        }))

        console.log("populate chat: ", populateChat)
        return populateChat
    }

    async createNewChat(userID, reqParams) {
        let chat = await databaseService.chats.findOne({
            Participants: {
                $all: [
                    new ObjectId(userID),
                    new ObjectId(reqParams.receiverID)
                ]
            }
        })
        if (chat) {
            const messages = await databaseService.messages.find({
                ChatId: chat._id
            }).toArray()
            return {
                ...chat,
                Messages: messages
            }
        }
        chat = {
            _id: new ObjectId(),
            Participants: [
                new ObjectId(userID),
                new ObjectId(reqParams.receiverID)
            ],
            Messages: []
        }
        const insertedChat = await databaseService.chats.insertOne(chat)
        console.log("insert chat: ", insertedChat)
        chat._id = insertedChat.insertedId
        return chat
    }

    async sendMessage(userID, payload, reqParams) {
        let chat = await databaseService.chats.findOne({
            Participants: { $all: [
                new ObjectId(userID), 
                new ObjectId(reqParams.receiverID)
            ] }
        })

        if (!chat) {
            chat = {
                _id: new ObjectId(),
                Participants: [
                    new ObjectId(userID), 
                    new ObjectId(reqParams.receiverID)
                ]
            }
            const newChat = await databaseService.chats.insertOne(chat)
            chat._id = newChat.insertedId
        }

        const newMessage = {
            SenderId: userID,
            ReceiverId: reqParams.receiverID,
            Content: payload.content,
            ChatId: chat._id
        }

        const insertedMessage = await databaseService.messages.insertOne(newMessage)

        console.log("first")

        await databaseService.chats.findOneAndUpdate(
            { _id: new ObjectId(chat._id) },
            { $push: { Messages: insertedMessage.insertedId } },
            {new: true}
        );

        // SOCKET IO function
        const reciverSocketId = getReceiverSocketId(reqParams.receiverID);
        if (reciverSocketId) {
            io.to(reciverSocketId).emit("newMessage", newMessage)
        }
        return newMessage
    }

    async fetchMessage(userID, reqParams) {
        const chat = await databaseService.chats.findOne({
            Participants: { $all: [userID, reqParams.receiverID] }
        })

        if (!chat) {
            return []
        }

        const message = await databaseService.messages.find({
            ChatId: chat._id
        }).toArray()
        return message
    }
}

const chatService = new ChatService()
export default chatService

