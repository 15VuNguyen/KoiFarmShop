// import OrderSchema from '../models/schemas/Order.schema.js'
import { USERS_MESSAGES } from '../constants/userMessages.js';
import { saveOrderToDatabase } from '../services/callback.service.js';
import chatService from '../services/chat.Service.js';
import databaseService from '../services/database.service.js';
import { ObjectId } from 'mongodb';
import usersService from '../services/users.services.js';
import { MESSAGES } from '../constants/message.js';

export const fetchExistedChatsController = async (req, res) => {
  try {
    const { user_id } = req.decoded_authorization
    const user = await databaseService.users.findOne({ _id: new ObjectId(user_id) })
    if (user === null) {
      throw new ErrorWithStatus({
        message: USERS_MESSAGES.USER_NOT_FOUND,
        status: HTTP_STATUS.NOT_FOUND
      })
    }
    const result = await chatService.fetchChats(user_id)
    if(result && result.length > 0){
      return res.json({
        message: MESSAGES.FETCH_CHAT_SUCCESS,
        result
      })
    }else{
      return res.json({
        message: MESSAGES.NO_CHAT_FOUND,
        result
      })
    }
    
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}
export const createNewChatController = async (req, res) => {
  try {
    const { user_id } = req.decoded_authorization
    const user = await databaseService.users.findOne({ _id: new ObjectId(user_id) })
    if (user === null) {
      throw new ErrorWithStatus({
        message: USERS_MESSAGES.USER_NOT_FOUND,
        status: HTTP_STATUS.NOT_FOUND
      })
    }
    const result = await chatService.createNewChat(user_id, req.params)
    console.log("chat: ", result)
    return res.json({
    //   message: USERS_MESSAGES.CREATE_ORDER_SUCCESS,
      result
    })
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}
export const sendMessagesController = async (req, res) => {
  try {
    const { user_id } = req.decoded_authorization
    const user = await databaseService.users.findOne({ _id: new ObjectId(user_id) })
    if (user === null) {
      throw new ErrorWithStatus({
        message: USERS_MESSAGES.USER_NOT_FOUND,
        status: HTTP_STATUS.NOT_FOUND
      })
    }
    const result = await chatService.sendMessage(user_id, req.body, req.params)
    return res.json({
    //   message: USERS_MESSAGES.CREATE_ORDER_SUCCESS,
      result
    })
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}
export const fetchMessagesController = async (req, res) => {
  try {
    const { user_id } = req.decoded_authorization
    const user = await databaseService.users.findOne({ _id: new ObjectId(user_id) })
    if (user === null) {
      throw new ErrorWithStatus({
        message: USERS_MESSAGES.USER_NOT_FOUND,
        status: HTTP_STATUS.NOT_FOUND
      })
    }
    const result = await chatService.fetchMessage(user_id, req.params)
    return res.json({
    //   message: USERS_MESSAGES.CREATE_ORDER_SUCCESS,
      result
    })
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

export const getUserByRoleController = async (req, res) => {
  try {
    const result = await usersService.getUserByRole()
    return res.json({
      message: USERS_MESSAGES.GET_ALL_CONSIGNS_SUCCESS,
      result
    })
  } catch (error) {
    res.status(error.status || HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      message: error.message || 'Internal Server Error'
    })
  }
}