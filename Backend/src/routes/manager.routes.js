import {
  createNewInvoiceGroupKoiController,
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
  updateSupplierController
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

managerRouter.get(
  '/manage-supplier/get-all',
  accessTokenValidator,
  isAdminValidator,
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


export default managerRouter
