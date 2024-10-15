import { Router } from 'express'
import { getKoiPriceController, getOrderDetailController, makeOrderDetailController, updateOrderDetailController } from '../controllers/orderDetailController.js'
import { createOrderController } from '../controllers/order.controllers.js'
import { accessTokenValidator } from '../middlewares/users.middlewares.js'

const orderRouter = Router()

//Order Detail
orderRouter.post('/detail/make',accessTokenValidator, makeOrderDetailController)
orderRouter.get('/detail/:orderID', getOrderDetailController)
orderRouter.patch('/detail/edit/:orderID',updateOrderDetailController)
orderRouter.post('/detail/price',getKoiPriceController) 
//Order
orderRouter.post('/create/:orderDTID', createOrderController)

export default orderRouter