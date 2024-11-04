import HTTP_STATUS from '../constants/httpStatus.js'
import { MESSAGES } from '../constants/message.js'
import { USERS_MESSAGES } from '../constants/userMessages.js'
import { ErrorWithStatus } from '../models/Errors.js'
import databaseService from '../services/database.service.js'
import koisService from '../services/kois.services.js'
import { ObjectId } from 'mongodb'
import suplliersService from '../services/suppliers.services.js'
import usersService from '../services/users.services.js'
import chatService from '../services/chat.Service.js'
import nodemailer from 'nodemailer'

export const createNewKoiKiGuiController = async (req, res) => {
  try {
    const result = await koisService.createNewKoiKiGui(req.body)
    return res.json({
      message: MESSAGES.CREATE_NEW_KOI_KI_GUI_SUCCESS,
      result
    })
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

export const authorizationController = async (req, res) => {
  try {
    const { user_id } = req.decoded_authorization
    const user = await databaseService.users.findOne({ _id: new ObjectId(user_id) })
    if (user === null) {
      throw new ErrorWithStatus({
        message: USERS_MESSAGES.USER_NOT_FOUND,
        status: HTTP_STATUS.NOT_FOUND
      })
    }
    const result = user.roleid
    return res.json({
      message: USERS_MESSAGES.CHECK_AUTHORIZATION_SUCCESS,
      result
    })
  } catch (error) {
    res.status(error.status || HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      message: error.message || 'Internal Server Error'
    })
  }
}

export const getAllServiceController = async (req, res) => {
  try {
    const result = await databaseService.services.find().toArray()
    res.json({
      result
    })
  } catch (error) {
    res.status(error.status || HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      message: error.message || 'Internal Server Error'
    })
  }
}

export const getKoiByIDController = async (req, res) => {
  try {
    const { KoiID } = req.params
    const result = await databaseService.kois.find({ _id: new ObjectId(KoiID) })
    res.json({
      result
    })
  } catch (error) {
    res.status(404).json({ messga: 'Koi not found' })
  }
}

export const guestGetAllSupplierController = async (req, res) => {
  try {
    const result = await suplliersService.guestGetAllSupplier()
    return res.json({
      message: MESSAGES.GET_ALL_SUPPLIER_SUCCESS,
      result
    })
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

export const guestGetSupplierController = async (req, res) => {
  try {
    const { _id } = req.params
    const result = await suplliersService.guestGetSupplier(_id)
    return res.json({
      message: MESSAGES.GET_SUPPLIER_SUCCESS,
      result
    })
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

export const getKoiGroupIDController = async (req, res) => {
  try {
    const koiInGroupKOI = await databaseService.groupKois.find().toArray()

    const GroupKoi = koiInGroupKOI.map((groupKoi) => groupKoi._id.toString())

    const Koi = await databaseService.kois.find({ GroupKoiID: { $in: GroupKoi } }).toArray()

    const groupedKoi = Koi.reduce((accumulator, koi) => {
      const groupId = koi.GroupKoiID

      if (!accumulator[groupId]) {
        accumulator[groupId] = { groupId, kois: [] }
      }

      accumulator[groupId].kois.push(koi)

      return accumulator
    }, {})

    const groupedKoiArray = Object.values(groupedKoi).map((item) => ({
      groupId: item.groupId,
      result: item.kois
    }))

    res.json(groupedKoiArray)
  } catch (error) {
    res.json('lỗi tại lấy koi theo groupkoiid ' + error.message)
  }
}

export const getManagerInfoForChatController = async (req, res) => {
  try {
    const result = await usersService.getManagerInfoForChat()
    return res.json({
      message: MESSAGES.GET_MANAGER_SUCCESS,
      result
    })
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

export const getUserInfoForChatController = async (req, res) => {
  try {
    const result = await usersService.getUserInfoForChat(req.params)
    return res.json({
      message: MESSAGES.GET_USER_SUCCESS,
      result
    })
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

export const checkCartController = async (req, res) => {
  try {
    const reqOrderDTCookie = req.cookies && req.cookies.orderDT ? JSON.parse(req.cookies.orderDT) : {}

    const KoiIDs = reqOrderDTCookie.Items.map((item) => item.KoiID)

    for (const koiID of KoiIDs) {
      const check = await databaseService.kois.findOne({ _id: new ObjectId(koiID) })

      if (check.Status === 0) {
        return res.status(410).json({
          message: `${check.KoiName} đã hết hàng`
        })
      }
    }

    return res.status(200).json({
      message: 'Available'
    })
  } catch (error) {
    return res.status(500).json({
      message: 'An error occurred while processing your request.'
    })
  }
}

export const confirmConsignInformationController = async (req, res) => {
  const { consignId } = req.query

  try {
    // Cập nhật trạng thái trong bảng consign
    const result = await databaseService.consigns.updateOne({ _id: new ObjectId(consignId) }, { $set: { State: 2 } })

    if (result.modifiedCount === 1) {
      // Lấy thông tin chi tiết về đơn ký gửi
      const consign = await databaseService.consigns.findOne({ _id: new ObjectId(consignId) })
      const user = await databaseService.users.findOne({ _id: new ObjectId(consign.UserID) })
      const koi = await databaseService.kois.findOne({ _id: new ObjectId(consign.KoiID) })
      // Gửi email thông báo cho manager
      let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_APP,
          pass: process.env.EMAIL_PASSWORD_APP
        }
      })

      const titleEmail = 'Xác nhận thông tin ký gửi Koi'
      const emailContent = await koisService.generateKoiInformationToManager(user, koi, consign, titleEmail)

      let mailOptions = {
        from: process.env.EMAIL_APP,
        to: process.env.EMAIL_APP, // Địa chỉ email của manager
        subject: titleEmail,
        text: 'Người dùng đã xác nhận thông tin ký gửi Koi.',
        html: emailContent
      }

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error)
        } else {
          console.log('Email sent: ' + info.response)
        }
      })

      res.send('Thông tin đã được xác nhận thành công.')
    } else {
      res.status(400).send('Không tìm thấy đơn ký gửi hoặc không thể cập nhật trạng thái.')
    }
  } catch (error) {
    console.error(error)
    res.status(500).send('Đã xảy ra lỗi khi xử lý yêu cầu.')
  }
}
