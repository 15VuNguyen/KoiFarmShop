import { ObjectId } from 'mongodb'
import HTTP_STATUS from '../constants/httpStatus.js'
import { MANAGER_MESSAGES } from '../constants/managerMessage.js'
import { ErrorWithStatus } from '../models/Errors.js'
import databaseService from './database.service.js'

class ConsignsService {
  async getAllConsign() {
    try {
      const consigns = await databaseService.consigns.find({}).toArray()
      return consigns
    } catch (error) {
      console.error('Error fetching consigns:', error)
      throw error
    }
  }
  async getConsignDetail(consignID) {
    //tìm consign dựa vào consignID
    const consignObjectID = new ObjectId(consignID)
    const consign = await databaseService.consigns.findOne({ _id: consignObjectID })
    if (consign == null) {
      throw new ErrorWithStatus({
        message: MANAGER_MESSAGES.CONSIGN_NOT_FOUND,
        status: HTTP_STATUS.NOT_FOUND
      })
    }
    const koiObjectID = new ObjectId(consign.KoiID)
    const koi = await databaseService.kois.findOne({ _id: koiObjectID })
    if (koi == null) {
      throw new ErrorWithStatus({
        message: MANAGER_MESSAGES.KOI_NOT_FOUND,
        status: HTTP_STATUS.NOT_FOUND
      })
    }
    const userObjectID = new ObjectId(consign.UserID)
    const user = await databaseService.users.findOne(
      { _id: userObjectID },
      {
        projection: {
          password: 0,
          email_verify_token: 0,
          forgot_password_token: 0
        }
      }
    )
    if (user == null) {
      throw new ErrorWithStatus({
        message: MANAGER_MESSAGES.KOI_NOT_FOUND,
        status: HTTP_STATUS.NOT_FOUND
      })
    }
    return {
      user: user,
      consign: consign,
      koi: koi
    }
  }
  //update
  async updateConsignDetail(consignID, payload) {
    //tìm consign dựa vào consignID
    const consignObjectID = new ObjectId(consignID)
    const consign = await databaseService.consigns.findOne({ _id: consignObjectID })
    if (consign == null) {
      throw new ErrorWithStatus({
        message: MANAGER_MESSAGES.CONSIGN_NOT_FOUND,
        status: HTTP_STATUS.NOT_FOUND
      })
    }
    const koiObjectID = new ObjectId(consign.KoiID)
    const koi = await databaseService.kois.findOne({ _id: koiObjectID })
    if (koi == null) {
      throw new ErrorWithStatus({
        message: MANAGER_MESSAGES.KOI_NOT_FOUND,
        status: HTTP_STATUS.NOT_FOUND
      })
    }
    const userObjectID = new ObjectId(consign.UserID)
    const user = await databaseService.users.findOne(
      { _id: userObjectID },
      {
        projection: {
          password: 0,
          email_verify_token: 0,
          forgot_password_token: 0
        }
      }
    )
    if (user == null) {
      throw new ErrorWithStatus({
        message: MANAGER_MESSAGES.KOI_NOT_FOUND,
        status: HTTP_STATUS.NOT_FOUND
      })
    }
    // cập nhật lại các thông tin kí gửi
    //cập nhật user, nếu có thay đổi thì cập nhật cái mới, không thì giữ nguyên
    const userUpdate = await databaseService.users.updateOne({ _id: new ObjectId(user._id) }, [
      {
        $set: {
          name: payload.name || user.name || '',
          address: payload.address || user.address || '',
          phone_number: payload.phone_number || user.phone_number || ''
        }
      }
    ])
    //cập nhật lại thông tin koi, nếu có thay đổi thì cập nhật cái mới, không thì giữ nguyên
    const koiPrice = payload.Price || koi.Price || 0
    const koiUpdate = await databaseService.kois.updateOne({ _id: new ObjectId(koi._id) }, [
      {
        $set: {
          CategoryID: payload.CategoryID || koi.CategoryID || '',
          KoiName: payload.KoiName || koi.KoiName || '',
          Age: payload.Age || koi.Age || '',
          Origin: payload.Origin || koi.Origin || '',
          Gender: payload.Gender || koi.Gender || '',
          Size: payload.Size || koi.Size || '',
          Breed: payload.Breed || koi.Breed || '',
          Description: payload.Description || koi.Description || '',
          DailyFoodAmount: payload.DailyFoodAmount || koi.DailyFoodAmount || '',
          FilteringRatio: payload.FilteringRatio || koi.FilteringRatio || '',
          Status: payload.Status || koi.Status || '',
          CertificateID: payload.CertificateID || koi.CertificateID || '',
          Price: koiPrice,
          Image: payload.Image || koi.Image || '',
          Video: payload.Video || koi.Video || ''
        }
      }
    ])
    //cập nhật lại thông tin kí gửi, nếu có thay đổi thì cập nhật cái mới, không thì giữ nguyên
    const commissionConsign = payload.Commission ?? consign.Commission ?? 10
    const consignUpdate = await databaseService.consigns.updateOne({ _id: new ObjectId(consign._id) }, [
      {
        $set: {
          ShippedDate: payload.ShippedDate || consign.ShippedDate || '',
          ReceiptDate: payload.ReceiptDate || consign.ReceiptDate || '',
          Description: payload.Description || consign.Description || '',
          State: payload.State || consign.State || '',
          Method: payload.Method || consign.Method || '',
          PositionCare: payload.PositionCare || consign.PositionCare || '',
          Commission: commissionConsign,
          TotalPrice: koiPrice - (koiPrice * commissionConsign) / 100 || ''
        }
      }
    ])
    return {
      user: userUpdate,
      consign: consignUpdate,
      koi: koiUpdate
    }
  }

  async getAllConsign(userid) {
    //tìm consign dựa vào userid
    // const userObjectId = new ObjectId(userid)
    const consigns = await databaseService.consigns.find({ UserID: userid }).toArray()

    // Lấy tất cả các KoiID từ consigns
    const koiIDFromConsigns = consigns.map((consign) => consign.KoiID)

    // Tìm tất cả các koi dựa vào KoiID
    const kois = await databaseService.kois
      .find({ _id: { $in: koiIDFromConsigns.map((id) => new ObjectId(id)) } })
      .toArray()

    // Trả về mảng consign và koi tương ứng
    const data = consigns.map((consign) => {
      const koi = kois.find((k) => k._id.toString() === consign.KoiID.toString())
      return {
        consign,
        koi
      }
    })

    return {
      data
    }
  }
}

const consignsService = new ConsignsService()
export default consignsService
