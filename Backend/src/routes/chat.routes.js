import { Router } from 'express'
import { accessTokenValidator } from '../middlewares/users.middlewares.js'
import { wrapAsync } from '../utils/handle.js'
import { createNewChatController, fetchExistedChatsController, fetchMessagesController, sendMessagesController } from '../controllers/chat.controllers.js'

const chatRouter = Router()

//Order Detail
chatRouter.get('/',accessTokenValidator ,wrapAsync(fetchExistedChatsController))
chatRouter.post('/create/:receiverID',accessTokenValidator ,wrapAsync(createNewChatController))
chatRouter.post('/message/send/:receiverID',accessTokenValidator ,wrapAsync(sendMessagesController))
chatRouter.get('/message/get/:receiverID',accessTokenValidator ,wrapAsync(fetchMessagesController))

export default chatRouter
