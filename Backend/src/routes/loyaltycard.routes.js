import { Router } from 'express'
import { checkOrderPriceController, getAllRankAboveController, getLoyaltyCardController, registerLoyaltyCardController, sendOtpCodeController } from '../controllers/order.controllers.js'
import { accessTokenValidator } from '../middlewares/users.middlewares.js'
import { wrapAsync } from '../utils/handle.js'

const loyaltyCardRouter = Router()
//Loyalty Card
loyaltyCardRouter.post('/create',accessTokenValidator, wrapAsync(registerLoyaltyCardController))
loyaltyCardRouter.get('/',accessTokenValidator, wrapAsync(getLoyaltyCardController))
loyaltyCardRouter.post('/otpCode/send', accessTokenValidator ,wrapAsync(sendOtpCodeController))
loyaltyCardRouter.post('/checkPrice', accessTokenValidator ,wrapAsync(checkOrderPriceController))
loyaltyCardRouter.get('/allAbove', accessTokenValidator ,wrapAsync(getAllRankAboveController))


export default loyaltyCardRouter
