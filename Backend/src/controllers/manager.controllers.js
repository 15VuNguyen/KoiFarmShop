import { MANAGER_MESSAGES } from '../constants/managerMessage.js'
import consignsService from '../services/consigns.services.js'
import groupKoisService from '../services/groupKoi.services.js'
import invoicesService from '../services/invoices.services.js'
import koisService from '../services/kois.services.js'
import suplliersService from '../services/suppliers.services.js'

import usersService from '../services/users.services.js'
import adminService from '../services/admin.service.js'
import databaseService from '../services/database.service.js'
import { ObjectId } from 'mongodb'
import ordersService from '../services/orders.Service.js'

export const getAllUserController = async (req, res) => {
  try {
    const result = await usersService.getAllUser()
    return res.json({
      message: MANAGER_MESSAGES.GET_ALL_USERS_SUCCESS,
      result
    })
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

export const getAllOrderController = async (req, res) => {
  const result = await adminService.getOrder()
  res.json({
    result
  })
}

export const getKoiAllController = async (req, res) => {
  const result = await databaseService.kois.find().toArray()
  res.json({
    result
  })
}

export const getAllKoiController = async (req, res) => {
  try {
    const result = await databaseService.kois.find().toArray()
    const categoryList = await databaseService.category.find().toArray()

    const consigns = await databaseService.consigns.find({ State: 4 }).toArray()
    const consignIds = consigns.map((consign) => new ObjectId(consign.KoiID))
    const filteredResult = result.filter(
      (koi) =>
        (koi.Status === 4 && consignIds.some((id) => id.equals(koi._id))) ||
        koi.Status === 1 ||
        koi.Status === 2 ||
        koi.Status === 3
    )

    res.json({
      result: filteredResult,
      categoryList
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

export const createNewKoiController = async (req, res) => {
  try {
    const result = await koisService.createNewKoi(req.body)
    return res.json({
      message: MANAGER_MESSAGES.CREATE_NEW_KOI_SUCCESS,
      result
    })
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

export const getAllConsignController = async (req, res) => {
  try {
    const result = await consignsService.getAllConsign()
    return res.json({
      message: MANAGER_MESSAGES.GET_ALL_CONSIGNS_SUCCESS,
      result
    })
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

export const updateKoiController = async (req, res) => {
  try {
    const { KoiID } = req.params
    const result = await adminService.updateKoi(KoiID, req.body)
    // result trả về success "true" nếu thành công và ngược lại trả về false khi validate dữ liệu đầu vào fail
    // message do Joi trả về khi validate
    if (!result.success) {
      return res.status(400).json({
        message: result.message
      })
    }
    res.json({
      message: result.message,
      result
    })
  } catch (error) {
    console.log(error)
  }
}

export const updateStatusKoiController = async (req, res) => {
  try {
    const { KoiID } = req.params
    const result = await adminService.updateStatusKoi(KoiID)
    // result trả về success "true" nếu thành công và ngược lại trả về false khi validate dữ liệu đầu vào fail
    // message do Joi trả về khi validate
    if (!result.success) {
      return res.status(400).json({
        message: result.message
      })
    }
    res.json({
      message: result.message,
      result
    })
  } catch (error) {
    console.log(error)
  }
}

export const updateUserController = async (req, res) => {
  try {
    const { UserID } = req.params
    console.log(UserID)
    const result = await adminService.updateUser(UserID, req.body)
    // result trả về success "true" nếu thành công và ngược lại trả về false khi validate dữ liệu đầu vào fail
    // message do Joi trả về khi validate
    console.log(result)
    if (!result.success) {
      return res.status(400).json({
        message: result.message
      })
    }
    res.json({
      message: result.message,
      result
    })
  } catch (error) {
    console.log(error)
  }
}

export const updateStatusUserController = async (req, res) => {
  try {
    const { UserID } = req.params
    const result = await adminService.updateStatusUser(UserID)
    // result trả về success "true" nếu thành công và ngược lại trả về false khi validate dữ liệu đầu vào fail
    // message do Joi trả về khi validate
    if (!result.success) {
      return res.status(400).json({
        message: result.message
      })
    }
    res.json({
      message: result.message,
      result
    })
  } catch (error) {
    console.log(error)
  }
}

export const createCategoryController = async (req, res) => {
  try {
    const category = await adminService.addCategory(req.body)
    // nếu tạo thành công category trả về json success: true và ngược lại
    if (!category.success) {
      return res.status(400).json({ message: 'Lỗi khi tạo category' })
    }

    return res.status(200).json({ message: 'Create Categort Successfully' })
  } catch (error) {
    console.log('Error at create new Category')
  }
}

export const getConsignDetailController = async (req, res) => {
  //tìm user theo username
  const { _id } = req.params
  const consign = await consignsService.getConsignDetail(_id)
  return res.json({
    message: MANAGER_MESSAGES.GET_CONSIGN_DETAIL_SUCCESS,
    result: consign
  })
}

export const updateConsignDetailController = async (req, res) => {
  //tìm user theo username
  const { _id } = req.params
  const consign = await consignsService.updateConsignDetail(_id, req.body)
  return res.json({
    message: MANAGER_MESSAGES.UPDATE_CONSIGN_DETAIL_SUCCESS,
    result: consign
  })
}

export const updateInvoiceController = async (req, res) => {
  const { _id } = req.params
  const result = await invoicesService.updateInvoice(_id, req.body)
  return res.json({
    message: MANAGER_MESSAGES.UPDATE_INVOICE_SUCCESS,
    result: result
  })
}

export const createNewServiceController = async (req, res) => {
  try {
    const newService = await adminService.createNewService(req.body)
    if (!newService.success) {
      return res.status(400).json({ message: newService.message })
    }

    return res.status(200).json({ message: newService.message })
  } catch (error) {
    console.log(error + 'Error at create new Category')
  }
}

export const updateServiceController = async (req, res) => {
  const { ServiceID } = req.params
  const Service = await adminService.updateService(ServiceID, req.body)
  if (!Service.success) {
    return res.status(400).json({ message: Service.message })
  }

  return res.status(200).json({ message: Service.message })
}

export const updateOrderStatusController = async (req, res) => {
  const { OrderID } = req.params
  const Order = await adminService.updateOrderStatus(OrderID)
  if (!Order.success) {
    return res.status(400).json({ message: Order.message })
  }

  return res.status(200).json({ message: Order.message })
}
export const createNewSupplierController = async (req, res) => {
  try {
    const result = await suplliersService.createNewSupplier(req.body)
    return res.json({
      message: MANAGER_MESSAGES.CREATE_NEW_SUPPLIER_SUCCESS,
      result
    })
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

export const getAllSupplierController = async (req, res) => {
  try {
    const result = await suplliersService.getAllSupplier()
    return res.json({
      message: MANAGER_MESSAGES.GET_ALL_SUPPLIER_SUCCESS,
      result
    })
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

export const getRevenueController = async (req, res) => {
  try {
    const Orders = await databaseService.order.find({ Status: 2 }).toArray()

    const orderDetailIds = Orders.map((order) => new ObjectId(order.OrderDetailID))

    const OrderDetails = await databaseService.orderDetail
      .find({
        _id: { $in: orderDetailIds }
      })
      .toArray()

    console.log(OrderDetails)

    const dailyRevenue = Orders.reduce((accumulator, order) => {
      const orderDate = new Date(order.OrderDate).toISOString().split('T')[0]
      const detail = OrderDetails.find((d) => d._id.equals(new ObjectId(order.OrderDetailID)))
      const orderTotal = detail ? detail.TotalPrice : 0

      if (accumulator[orderDate]) {
        accumulator[orderDate] += orderTotal
      } else {
        accumulator[orderDate] = orderTotal
      }

      return accumulator
    }, {})

    const dailyRevenueArray = Object.entries(dailyRevenue).map(([Date, TotalPrice]) => ({
      Date,
      TotalPrice
    }))

    console.log(dailyRevenueArray)

    return res.json(dailyRevenueArray)
  } catch (error) {
    console.error('Có lỗi xảy ra:', error)
  }
}

export const getProfitController = async (req, res) => {
  try {
    const Orders = await databaseService.order.find({ Status: 2 }).toArray()
    if (Orders.length === 0) {
      return res.json('order rỗng' + [])
    }

    const orderDetailIds = Orders.map((order) => new ObjectId(order.OrderDetailID))

    const OrderDetails = await databaseService.orderDetail
      .find({
        _id: { $in: orderDetailIds }
      })
      .toArray()
    if (OrderDetails.length === 0) {
      return res.json('orderDetail rỗng' + [])
    }

    console.log(OrderDetails)

    // Lấy tất cả các KoiID từ tất cả các đối tượng trong Items
    const koiIds = OrderDetails.flatMap((detail) => detail.Items.map((item) => new ObjectId(item.KoiID)))

    console.log(koiIds)

    // Truy vấn thông tin cá Koi từ bảng koi
    const Kois = await databaseService.kois
      .find({
        _id: { $in: koiIds },
        Status: 0
      })
      .toArray()
    if (Kois.length === 0) {
      console.log('Koi rỗng', koiIds)
      return res.json('Koi rỗng' + [])
    }

    console.log(Kois)

    // Truy vấn thông tin consign từ bảng consign
    const Consigns = await databaseService.consigns
      .find({
        KoiID: { $in: koiIds.map((id) => id.toString()) }
      })
      .toArray()

    const calculateProfit = (koi, detail) => {
      // Kiểm tra nếu là groupKoi
      if (koi.GroupKoiID && ObjectId.isValid(koi.GroupKoiID)) {
        return 700000 // Lãi 700000 cho mỗi con groupKoi
      }

      // Kiểm tra nếu là consign
      const consign = Consigns.find((c) => c.KoiID === koi._id.toString())
      if (consign) {
        return detail.Price - (consign.TotalPrice || 0) // Lấy giá bán trừ đi totalprice của bảng consign
      }

      // Nếu không phải là groupKoi và không phải là consign
      return detail.Price // Tiền lãi cũng chính là tiền bán
    }

    const dailyProfit = Orders.reduce((accumulator, order) => {
      const orderDate = new Date(order.OrderDate).toISOString().split('T')[0]

      const detail = OrderDetails.find((d) => d._id.equals(new ObjectId(order.OrderDetailID)))
      if (!detail) {
        console.log(`OrderDetail not found for OrderDetailID: ${order.OrderDetailID}`)
        return accumulator
      }

      detail.Items.forEach((item) => {
        const koi = Kois.find((k) => k._id.equals(new ObjectId(item.KoiID))) // Lấy KoiID từ Items
        console.log('koi')
        console.log(koi)
        if (!koi) {
          console.log(`Koi not found for KoiID: ${item.KoiID}`)
          return
        }

        const profit = calculateProfit(koi, detail)

        if (accumulator[orderDate]) {
          accumulator[orderDate] += profit
        } else {
          accumulator[orderDate] = profit
        }
      })

      return accumulator
    }, {})

    const dailyProfitArray = Object.entries(dailyProfit).map(([Date, TotalProfit]) => ({
      Date,
      TotalProfit
    }))

    console.log(dailyProfitArray)

    return res.json(dailyProfitArray)
  } catch (error) {
    console.error('Có lỗi xảy ra:', error)
    return res.status(500).json({ error: error.message })
  }
}
// export const getProfitController = async (req, res) => {
//   try {
//     const orders = await databaseService.order.find({ Status: 5 }).toArray()

//     if (orders.length > 0) {
//       const orderDetailIDs = orders.map((order) => new ObjectId(order.OrderDetailID))
//       const orderDetails = await databaseService.orderDetail.find({ _id: { $in: orderDetailIDs } }).toArray()

//       if (orderDetails.length > 0) {
//         const dailyProfitStats = {} // Đối tượng để lưu lợi nhuận theo từng ngày
//         const dailyCostStats = {} // Đối tượng để lưu tổng vốn theo từng ngày

//         for (const orderDetail of orderDetails) {
//           const items = orderDetail.Items
//           const koiID = items.map((item) => new ObjectId(item.KoiID))

//           const checkKoi = await databaseService.kois.find({ _id: { $in: koiID } }).toArray()
//           if (checkKoi.length > 0) {
//             const statuses = checkKoi.map((koi) => koi.Status)
//             const koiPrices = checkKoi.map((koi) => koi.TotalPrice) // Lưu giá từ bảng kois

//             for (let i = 0; i < statuses.length; i++) {
//               const status = statuses[i]
//               const orderDate = new Date(orderDetail.OrderDate)
//               const formattedDate = `${orderDate.getUTCDate().toString().padStart(2, '0')}/${(orderDate.getUTCMonth() + 1).toString().padStart(2, '0')}/${orderDate.getUTCFullYear()}`

//               if (status === 4) {
//                 const consign = await databaseService.consigns.findOne({ KoiID: koiID[i] })
//                 if (consign) {
//                   dailyProfitStats[formattedDate] =
//                     (dailyProfitStats[formattedDate] || 0) + (koiPrices[i] - (consign.TotalPrice || 0))
//                 }
//               } else {
//                 const invoice = await databaseService.invoice.findOne({ KoiID: koiID[i] })
//                 if (invoice) {
//                   dailyCostStats[formattedDate] = (dailyCostStats[formattedDate] || 0) + (invoice.TotalPrice || 0)
//                 }
//               }
//             }
//           }
//         }

//         for (const order of orders) {
//           const orderDate = new Date(order.OrderDate)
//           const formattedDate = `${orderDate.getUTCDate().toString().padStart(2, '0')}/${(orderDate.getUTCMonth() + 1).toString().padStart(2, '0')}/${orderDate.getUTCFullYear()}`
//           const orderDetail = orderDetails.find((detail) => detail._id.equals(order.OrderDetailID))

//           if (orderDetail) {
//             dailyProfitStats[formattedDate] = (dailyProfitStats[formattedDate] || 0) + orderDetail.TotalPrice
//           }
//         }

//         const finalDailyProfitStats = {}
//         for (const date in dailyProfitStats) {
//           const totalRevenue = dailyProfitStats[date]
//           const totalCost = dailyCostStats[date] || 0 // Nếu không có chi phí thì là 0
//           finalDailyProfitStats[date] = totalRevenue - totalCost // Lợi nhuận = Doanh thu - Chi phí
//         }

//         // Trả về lợi nhuận cho từng ngày
//         res.send(finalDailyProfitStats)
//       } else {
//         res.status(404).json({ message: 'Order Detail not found' })
//       }
//     } else {
//       res.status(404).json({ message: 'Order not found' })
//     }
//   } catch (error) {
//     console.error(error)
//     res.status(500).json({ message: 'An error occurred', error: error.message })
//   }
// }

export const updateSupplierController = async (req, res) => {
  //tìm user theo username
  const { _id } = req.params
  const supplier = await suplliersService.updateSupplier(_id, req.body)
  return res.json({
    message: MANAGER_MESSAGES.UPDATE_SUPPLIER_SUCCESS,
    result: supplier
  })
}
export const getSupplierController = async (req, res) => {
  try {
    const { _id } = req.params
    const result = await suplliersService.getSupplier(_id)
    return res.json({
      message: MANAGER_MESSAGES.GET_SUPPLIER_SUCCESS,
      result
    })
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

export const deleteSupplierController = async (req, res) => {
  try {
    const { _id } = req.params
    const result = await suplliersService.deleteSupplier(_id)
    return res.json({
      message: MANAGER_MESSAGES.DELETE_SUPPLIER_SUCCESS,
      result
    })
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

export const createNewInvoiceGroupKoiController = async (req, res) => {
  try {
    const result = await invoicesService.createNewInvoiceGroupKoi(req.body)
    return res.json({
      message: MANAGER_MESSAGES.CREATE_NEW_INVOICE_GROUP_KOI_SUCCESS,
      result
    })
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

export const getAllGroupKoiController = async (req, res) => {
  try {
    const groupKoi = await groupKoisService.getAllGroupKoi()
    return res.json({
      message: MANAGER_MESSAGES.GET_ALL_GROUP_KOI_SUCCESS,
      groupKoi
    })
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

export const getAllInvoiceController = async (req, res) => {
  try {
    const invoices = await invoicesService.getAllInvoice()
    return res.json({
      message: MANAGER_MESSAGES.GET_ALL_INVOICE_SUCCESS,
      invoices
    })
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

export const getInvoiceController = async (req, res) => {
  try {
    const { _id } = req.params
    const result = await invoicesService.getInvoice(_id)
    return res.json({
      message: MANAGER_MESSAGES.GET_INVOICE_SUCCESS,
      result
    })
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

export const getgroupKoiController = async (req, res) => {
  try {
    const { _id } = req.params
    const result = await groupKoisService.getGroupKoi(_id)
    return res.json({
      message: MANAGER_MESSAGES.GET_GROUP_KOI_SUCCESS,
      result
    })
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

export const getOrdeDetails = async (req, res) => {
  try {
    const { orderID } = req.params
    const result = await databaseService.order.findOne({ _id: new ObjectId(orderID) })

    const orderDetail = await databaseService.orderDetail.findOne({ _id: result.OrderDetailID })
    res.json({ orderDetail })
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

export const getLoyalUserListController = async (req, res) => {
  try {
    const result = await ordersService.getLoyalUserList()
    return res.json({
      // message: MANAGER_MESSAGES.GET_ALL_INVOICE_SUCCESS,
      result
    })
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}
