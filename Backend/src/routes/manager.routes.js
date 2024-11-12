import {
  createNewInvoiceGroupKoiController,
  createNewServiceController,
  getKoiAllController,
  getLoyalUserListController,
  getOrdeDetails,
  getProfitController,
  getRevenueController,
  updateInvoiceController,
  updateOrderStatusController,
  updateServiceController
} from '../controllers/manager.controllers.js'
import {
  createCategoryController,
  createNewKoiController,
  createNewSupplierController,
  getAllConsignController,
  getAllGroupKoiController,
  getAllInvoiceController,
  getAllSupplierController,
  getAllUserController,
  getConsignDetailController,
  getgroupKoiController,
  getInvoiceController,
  getSupplierController,
  updateConsignDetailController,
  updateSupplierController,
  getAllKoiController,
  getAllOrderController,
  updateKoiController,
  updateStatusKoiController,
  updateStatusUserController,
  updateUserController
} from '../controllers/manager.controllers.js'
import { getProfileController } from '../controllers/users.controllers.js'
import { isAdminValidator, SupplierIDAndCategoryIDValidator } from '../middlewares/manager.middlewares.js'
import { accessTokenValidator } from '../middlewares/users.middlewares.js'
import { wrapAsync } from '../utils/handle.js'
import { Router } from 'express'

const managerRouter = Router()

/** Vu Nguyen thiếu middleware check token và middleware check role
 * lấy tất cả user
 * path: '/manage-user/get-all'
 * method: get
 */
managerRouter.get('/manage-user/get-all', accessTokenValidator, isAdminValidator, wrapAsync(getAllUserController))

/*Vu Nguyen thiếu middleware check token và middleware check role
des: get profile của user khác bằng unsername
path: '/:username'
method: get
không cần header vì, chưa đăng nhập cũng có thể xem
*/
managerRouter.get('/manage-user/:username', accessTokenValidator, isAdminValidator, wrapAsync(getProfileController))

/**Vu Nguyen, thiếu middleware check token và middleware check role
 *
 */
managerRouter.post(
  '/manage-koi/create-new-koi',
  accessTokenValidator,
  isAdminValidator,
  wrapAsync(createNewKoiController)
)

managerRouter.get('/manage-ki-gui/get-all', accessTokenValidator, isAdminValidator, wrapAsync(getAllConsignController))

managerRouter.get('/manage-ki-gui/:_id', accessTokenValidator, isAdminValidator, wrapAsync(getConsignDetailController))

managerRouter.get('/manage-loyalty-card/get-all', accessTokenValidator, isAdminValidator, wrapAsync(getLoyalUserListController))


managerRouter.put(
  '/manage-ki-gui/:_id',
  accessTokenValidator,
  isAdminValidator,
  wrapAsync(updateConsignDetailController)
)
managerRouter.get('/manage-order/get-all', accessTokenValidator, isAdminValidator, wrapAsync(getAllOrderController))

managerRouter.get('/manage-koi/get-all', accessTokenValidator, isAdminValidator, wrapAsync(getKoiAllController))

managerRouter.put(
  '/manage-koi/updateKoi/:KoiID',
  // accessTokenValidator,
  // isAdminValidator,
  wrapAsync(updateKoiController)
)

managerRouter.put(
  '/manage-koi/disable-enable/:KoiID',
  accessTokenValidator,
  accessTokenValidator,
  wrapAsync(updateStatusKoiController)
)

managerRouter.post(
  '/manage-category/createNewCategory',
  accessTokenValidator,
  accessTokenValidator,
  wrapAsync(createCategoryController)
)

managerRouter.post(
  '/manage-user/updateUser/:UserID',
  accessTokenValidator,
  accessTokenValidator,
  wrapAsync(updateUserController)
)

managerRouter.post(
  '/manage-user/disable-enable/:UserID',
  accessTokenValidator,
  isAdminValidator,
  wrapAsync(updateStatusUserController)
)

managerRouter.put(
  '/manage-ki-gui/:_id',
  accessTokenValidator,
  isAdminValidator,
  wrapAsync(updateConsignDetailController)
)

managerRouter.post(
  '/manage-supplier/create-new-supplier',
  accessTokenValidator,
  isAdminValidator,
  wrapAsync(createNewSupplierController)
)

managerRouter.post(
  '/manage-service/create-new-service',
  accessTokenValidator,
  isAdminValidator,
  wrapAsync(createNewServiceController)
)

managerRouter.put(
  '/manage-service/update-service/:ServiceID',
  accessTokenValidator,
  isAdminValidator,
  wrapAsync(updateServiceController)
)

managerRouter.patch(
  '/order/updateOrderStatus/:OrderID',
  accessTokenValidator,
  isAdminValidator,
  wrapAsync(updateOrderStatusController)
)

managerRouter.post(
  '/manage-supplier/create-new-supplier',
  accessTokenValidator,
  isAdminValidator,
  wrapAsync(createNewSupplierController)
)

managerRouter.get('/getRevenue', wrapAsync(getRevenueController))

managerRouter.get('/getProfit', wrapAsync(getProfitController))

// managerRouter.get(
//   '/manage-supplier/get-all',
//   accessTokenValidator,
//   isAdminValidator,
//   wrapAsync(getAllSupplierController)
// )
managerRouter.get(
  '/manage-supplier/get-all',

  wrapAsync(getAllSupplierController)
)

managerRouter.put('/manage-supplier/:_id', accessTokenValidator, isAdminValidator, wrapAsync(updateSupplierController))

managerRouter.get('/manage-supplier/:_id', accessTokenValidator, isAdminValidator, wrapAsync(getSupplierController))

managerRouter.post(
  '/manage-invoice/create-new-invoice-group-koi',
  accessTokenValidator,
  isAdminValidator,
  SupplierIDAndCategoryIDValidator,
  wrapAsync(createNewInvoiceGroupKoiController)
)

managerRouter.get(
  '/manage-group-koi/get-all',
  accessTokenValidator,
  isAdminValidator,
  wrapAsync(getAllGroupKoiController)
)

managerRouter.get('/manage-invoice/get-all', accessTokenValidator, isAdminValidator, wrapAsync(getAllInvoiceController))

managerRouter.get('/manage-invoice/:_id', accessTokenValidator, isAdminValidator, wrapAsync(getInvoiceController))

managerRouter.get('/manage-group-koi/:_id', accessTokenValidator, isAdminValidator, wrapAsync(getgroupKoiController))

managerRouter.get('/manage-order/get-order-detail/:orderID', getOrdeDetails)

managerRouter.put(
  '/manage-invoice/:_id',
  accessTokenValidator,
  isAdminValidator,
  wrapAsync(updateInvoiceController)
)


export default managerRouter
