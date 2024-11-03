import databaseService from './database.service.js'
import KoiSchema from '../models/schemas/Koi.schema.js'
import { koiValidate } from '../middlewares/kois.middleware.js'
import { MESSAGES } from '../constants/message.js'
import { ObjectId } from 'mongodb'
import CategorySchema from '../models/schemas/Category.schema.js'
import ServiceSchema from '../models/schemas/Service.schema.js'
import { serviceValidate } from '../middlewares/service.middlewares.js'

class AdminsService {
  async getUser() {
    const result = await databaseService.users.find().toArray()
    return result
  }

  async getOrder() {
    const result = await databaseService.order.find().toArray()
    return result
  }

  async getKoi() {
    const result = await databaseService.kois.find().toArray()
    return result
  }

  async addKoi(payload) {
    // validate input trước khi insert
    // nếu xảy ra lỗi trả về message
    const { error } = koiValidate(payload)
    if (error) {
      return { success: false, message: error.details[0].message }
    }

    await databaseService.kois.insertOne(
      new KoiSchema({
        ...payload
      })
    )
    return { success: true, message: MESSAGES.ADD_KOI_SUCCESS }
  }

  async updateKoi(KoiID, payload) {
    // validate input trước khi insert
    // nếu xảy ra lỗi trả về message
    try {
      const { error } = koiValidate(payload)
      if (error) {
        return { success: false, message: error.details[0].message }
      }

      const updateKoi = await databaseService.kois.findOneAndUpdate({ _id: new ObjectId(KoiID) }, { $set: payload })

      if (!updateKoi) {
        return { success: false, message: 'Koi not found' }
      }
      return { success: true, message: MESSAGES.UPDATE_KOI_SUCCESS }
    } catch (error) {
      return { success: false, message: 'Koi not found' }
    }
  }

  async updateStatusKoi(KoiIDInput) {
    try {
      const checkKoi = await databaseService.consigns.find({ KoiID: KoiIDInput }).toArray()

      if (checkKoi.length > 0) { 
        const koi = await databaseService.kois.findOne({ _id: new ObjectId(KoiIDInput) }) 
        if (koi.Status === 4) {
          console.log('status 4')
          await databaseService.kois.findOneAndUpdate(
            { _id: new ObjectId(KoiIDInput) },
            { $set: { Status: 0 } },
            { new: true }
          )
        } else {
          await databaseService.kois.findOneAndUpdate(
            { _id: new ObjectId(KoiIDInput) },
            { $set: { Status: 4 } },
            { new: true }
          )
        }
      } else {
        const koi = await databaseService.kois.findOne({ _id: new ObjectId(KoiIDInput) })

        if (!koi) {
          return { success: false, message: 'Koi not found' }
        }

        if (koi.Status === 2 || koi.Status === 3) {
          return { success: false, message: 'Koi có nguồn gốc F1 hoặc thuần việt không thể update' }
        }

        if (koi.Status === 1) {
          await databaseService.kois.findOneAndUpdate(
            { _id: new ObjectId(KoiIDInput) },
            { $set: { Status: 0 } },
            { new: true }
          )
          return { success: true, message: 'Update successfully' }
        } else if (koi.Status === 0) {
          await databaseService.kois.findOneAndUpdate(
            { _id: new ObjectId(KoiIDInput) },
            { $set: { Status: 1 } },
            { new: true }
          )
          return { success: true, message: 'Update successfully' }
        } else {
          return { success: true, message: 'Error' }
        }
      }

      return { success: true, message: MESSAGES.UPDATE_KOI_SUCCESS }
    } catch (error) {
      return { success: false, message: 'Koi not found' }
    }
  }

  async updateUser(UserID, payload) {
    try {
      const result = await databaseService.users.findOneAndUpdate(
        { _id: new ObjectId(UserID) },
        { $set: payload },
        { new: true }
      )

      if (!result) {
        return { success: false, message: 'User not found' }
      }
      return { success: true, message: MESSAGES.UPDATE_USER_SUCCESS }
    } catch (error) {
      return { success: false, message: 'User not found' }
    }
  }

  async updateStatusUser(UserID) {
    try {
      const result = await databaseService.users.findOneAndUpdate(
        { _id: new ObjectId(UserID) },
        { $bit: { Status: { xor: 1 } } },
        { new: true }
      )

      if (!result) {
        return { success: false, message: 'User not found' }
      }

      return { success: true, message: MESSAGES.UPDATE_USER_SUCCESS }
    } catch (error) {
      return { success: false, message: 'User not found' }
    }
  }

  async addCategory(payload) {
    try {
      if (!payload.CategoryName) {
        return { success: false, message: 'Category Name is required' }
      }

      await databaseService.category.insertOne(
        new CategorySchema({
          ...payload
        })
      )
      return { success: true, message: 'Creat Category Success' }
    } catch (error) {
      return { success: false, message: error.message }
    }
  }

  async createNewService(payload) {
    try {
      const { error } = serviceValidate(payload)
      if (error) {
        return { success: false, message: error.details[0].message }
      }

      const checkService = await databaseService.services.findOne({ ServiceName: payload.ServiceName })
      if (checkService) {
        return { success: false, message: 'Service Name đã tồn tại' }
      }

      await databaseService.services.insertOne(
        new ServiceSchema({
          ...payload
        })
      )
      return { success: true, message: 'Creat Service Success' }
    } catch (error) {
      return { success: false, message: error.message }
    }
  }

  async updateService(ServiceID, payload) {
    try {
      const { error } = serviceValidate(payload)
      if (error) {
        return { success: false, message: error.details[0].message }
      }

      const result = await databaseService.services.findOneAndUpdate(
        { _id: new ObjectId(ServiceID) },
        { $set: payload },
        { new: true }
      )

      if (!result) {
        return { success: false, message: 'Service not found' }
      }

      return { success: true, message: 'Update Service Successfully' }
    } catch (error) {
      return { success: false, message: 'Service not found' }
    }
  }

  async updateOrderStatus(orderID) {
    try {
      await databaseService.order.findOneAndUpdate(
        { _id: new ObjectId(orderID) },
        { $inc: { Status: 1 } },
        { new: true }
      )

      return { success: true, message: 'Update Order Status Successfully' }
    } catch (error) {
      return { success: false, message: 'OderID not found' }
    }
  }
}

const adminService = new AdminsService()
export default adminService
