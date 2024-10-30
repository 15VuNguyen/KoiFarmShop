import CryptoJS from 'crypto-js'
import databaseService from './database.service.js'
import { ObjectId } from 'mongodb'
import orderDetailService from './orderDetail.services.js'

export const callback = async (req, res) => {
  let result = {}
  console.log(req.body)
  try {
    const config = {
      app_id: '2554',
      key2: 'trMrHtvjo6myautxDUiAcYsVtaeQ8nhf'
    }

    let dataStr = req.body.data
    let reqMac = req.body.mac

    let mac = CryptoJS.HmacSHA256(dataStr, config.key2).toString()

    // Kiểm tra callback hợp lệ
    if (reqMac !== mac) {
      result.returncode = -1
      result.returnmessage = 'mac not equal'
    } else {
      const parsedData = JSON.parse(dataStr)
      const embedData = JSON.parse(parsedData.embed_data) // Phân tích cú pháp embed_data
      const reqOrderDetails = embedData.orderDetails // Thông tin đơn hàng
      const reqOrder = embedData.order // Thông tin đơn hàng

      const koiIDsList = await Promise.all(
        reqOrderDetails.Items.map(async (item) => {
          const samePropertiesKoiList = (await orderDetailService.getSamePropertiesKoi(item.KoiID)).filter(
            (koi) => koi.Status != 0
          )
          const koiList = samePropertiesKoiList.slice(0, item.Quantity).map((koi) => koi._id)
          return koiList
        })
      )

      const flattenedKoiIDs = koiIDsList.flat()


      for (const koiID of flattenedKoiIDs) {

        console.log(koiID)
        await databaseService.kois.findOneAndUpdate({ _id: koiID }, { $set: { Status: 0 } }, { new: true })

        const stringKoiID = koiID.toString()

        console.log('string koiid: ', stringKoiID)

        try {
          const consignkoi = await databaseService.consigns.findOne({ KoiID: stringKoiID })
          console.log('consignkoi: ', consignkoi)

          if (consignkoi) {
            await databaseService.consigns.findOneAndUpdate(
              { KoiID: stringKoiID },
              { $set: { State: 5 } },
              { new: true }
            )
            console.log(`Updated State to 5 for KoiID: ${stringKoiID}`)
          } else {
            console.log(`No consign found for KoiID: ${stringKoiID}`)
          }
        } catch (error) {
          console.error('Error updating consign state: ', error)
        }
      }

      if (!reqOrderDetails) {
        result.returncode = -1
        result.returnmessage = 'No order data found in embed_data'
      } else {
        const result = await saveOrderToDatabase(reqOrderDetails, reqOrder)

        await databaseService.order.findOneAndUpdate(
          { _id: new ObjectId(result.order._id) },
          { $set: { Status: 2 } },
          { new: true }
        )
        if (result.error) {
          result.returncode = -1
          result.returnmessage = result.error
        } else {
          res.clearCookie('order', { path: '/' })
          res.clearCookie('orderDT', { path: '/' })
          result.returncode = 1
          result.returnmessage = 'Payment successful.'
          return res.json({ success: true, message: 'Payment successful.' })
        }
      }
    }
  } catch (ex) {
    result.returncode = 0 // ZaloPay server sẽ callback lại (tối đa 3 lần)
    result.returnmessage = ex.message
  }

  res.json(result)
}

export const saveOrderToDatabase = async (reqOrderDetailCookie, reqOrderCookie) => {
  if (!reqOrderDetailCookie || !reqOrderCookie) {
    return { error: 'No order data found in cookies' }
  }

  const newOrderDT = {
    _id: new ObjectId(),
    Items: reqOrderDetailCookie.Items,
    TotalPrice: reqOrderDetailCookie.TotalPrice
  }

  const orderDT = await databaseService.orderDetail.insertOne(newOrderDT)
  if (orderDT.insertedId) {
    newOrderDT._id = orderDT.insertedId
  } else {
    return 'Fail to save'
  }

  const newOrder = {
    _id: new ObjectId(),
    UserID: reqOrderCookie.UserID,
    // OrderDetailID: newOrderDT._id,
    OrderDetailID: newOrderDT?._id,
    ShipAddress: reqOrderCookie.ShipAddress,
    Description: reqOrderCookie.Description,
    OrderDate: reqOrderCookie.OrderDate || new Date(),
    Status: reqOrderCookie.Status || 1
  }

  const order = await databaseService.order.insertOne(newOrder)
  if (order.insertedId) {
    newOrder._id = order.insertedId
  } else {
    return 'Fail to save'
  }
  return { orderDT, order: newOrder }
}
