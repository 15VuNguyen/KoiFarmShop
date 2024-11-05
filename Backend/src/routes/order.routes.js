import { Router } from 'express'
import {
    buyNowController,
  filterKoiController,
  getKoiByPriceController,
  getKoiQuantityController,
  getMinMaxPriceController,
  getOrderDetailController,
  makeOrderDetailController,
  makeOrdersDetailController,
  removeAllItemsDetailController,
  removeItemsDetailController,
  updateOrderDetailController
} from '../controllers/orderDetailController.js'
import { createOrderController, getOrderController, saveOrderController } from '../controllers/order.controllers.js'
import { accessTokenValidator } from '../middlewares/users.middlewares.js'
import { wrapAsync } from '../utils/handle.js'
import { checkCartController } from '../controllers/common.controllers.js'

const orderRouter = Router()

//Order Detail
orderRouter.post('/detail/make', makeOrderDetailController)
orderRouter.post('/detail/makes', accessTokenValidator ,wrapAsync(makeOrdersDetailController))
orderRouter.post('/detail/buy', buyNowController)
orderRouter.get('/detail', getOrderDetailController)
orderRouter.post('/detail/edit', updateOrderDetailController)
orderRouter.post('/detail/price', getKoiQuantityController)
orderRouter.post('/detail/remove', removeItemsDetailController)
orderRouter.get('/detail/removeAll', removeAllItemsDetailController)
//Order
orderRouter.post('/create', createOrderController)
orderRouter.get('/',accessTokenValidator, wrapAsync(getOrderController))
//Price
orderRouter.post('/detail/price/minmax', getMinMaxPriceController)
orderRouter.post('/detail/koi', getKoiByPriceController)
//Koi
orderRouter.post('/koi/filter', filterKoiController)
//save
orderRouter.get('/save', saveOrderController)

orderRouter.post('/checkCart', wrapAsync(checkCartController))
export default orderRouter
