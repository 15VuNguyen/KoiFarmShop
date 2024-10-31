import bcrypt from 'bcrypt'
import { ObjectId } from 'mongodb'
import databaseService from './database.service.js'
import KoiSchema from '../models/schemas/Koi.schema.js'
import UserSchema from '../models/schemas/User.schema.js'
import ConsignSchema from '../models/schemas/Consign.schema.js'
import { hashPassword } from '../utils/crypto.js'
import nodemailer from 'nodemailer'
// import usersService from './users.services.js'

class KoisService {
  async createNewKoi(payload) {
    const KoiID = new ObjectId()
    const result = await databaseService.kois.insertOne(new KoiSchema({ ...payload, _id: KoiID }))
    console.log(payload)
    console.log(result)
    return result
  }

  //test createNewKoiKiGui với payload full thông tin cần thiết từ người dùng
  async createNewKoiKiGui(payload) {
    // Tạo mật khẩu ngẫu nhiên
    // const password = Math.random().toString(36).slice(-8)
    // const hashedPassword = await bcrypt.hash(password, 10)

    // Tạo người dùng mới
    let user_id = new ObjectId()

    const password = `User@${user_id.toString()}`

    //tạo mật khẩu theo của mình rồi gửi password vào mail cho họ
    const hashedPassword = hashPassword(password)

    //check xem email đó đã có trong db chưa
    //nếu có rồi tức là đã có người dùng này rồi
    //thì sẽ không tạo mới user nữa mà lấy id của user đó
    //để tạo consign
    const userCheck = await databaseService.users.findOne({ email: payload.email })

    let userResult

    if (userCheck) {
      user_id = userCheck._id

      const userPayload = {
        _id: user_id,
        email: payload.email || userCheck.email,
        name: payload.name || userCheck.name,
        address: payload.address || userCheck.address,
        phone_number: payload.phone_number || userCheck.phone_number,
        username: `user${user_id.toString()}` || userCheck.username,
        roleid: 1
      }
      userResult = await databaseService.users.updateOne({ _id: user_id }, {$set: userPayload})

    } else {
      const userPayload = {
        _id: user_id,
        email: payload.email,
        name: payload.name,
        address: payload.address,
        phone_number: payload.phone_number,
        password: hashedPassword,
        username: `user${user_id.toString()}`,
        roleid: 1
      }
      userResult = await databaseService.users.insertOne(new UserSchema(userPayload))
      //test register khi tạo mới user
      //chỗ này để gửi mail
      let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_APP, // Thay thế bằng email của bạn
          pass: process.env.EMAIL_PASSWORD_APP // Thay thế bằng mật khẩu của bạn
        }
      })

      // Cấu hình và gửi email
      // const verifyURL = `http://localhost:${process.env.PORT}/users/verify-email?email_verify_token=${email_verify_token}` // Đường dẫn xác nhận email
      let mailOptions = {
        from: process.env.EMAIL_APP, // Thay thế bằng email của bạn
        to: payload.email, // Địa chỉ email của người nhận (người dùng đăng ký)
        subject: 'Xác nhận đăng ký',
        text: 'Nội dung email xác nhận đăng ký...', // Hoặc sử dụng `html` để tạo nội dung email dạng HTML
        html: `
  <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
    <div style="max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px; background-color: #f9f9f9;">
      <h2 style="text-align: center; color: #4CAF50;">Chào mừng bạn đến với IKOI FARM!</h2>
      <p>Xin chào,</p>
      <p>Bạn vừa trở thành thành viên của IKOI FARM.</p>
      <p><strong>Email:</strong> ${payload.email}</p>
      <p><strong>Password:</strong> ${password}</p>
      <p>Chúng tôi rất vui mừng chào đón bạn. Nếu bạn có bất kỳ câu hỏi nào, vui lòng liên hệ với chúng tôi.</p>
      <p>Trân trọng,</p>
      <p>Đội ngũ IKOI FARM</p>
    </div>
  </div>
` // Sử dụng HTML để tạo nội dung email
      }

      // Gửi email
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error)
          // Xử lý lỗi gửi email ở đây
        } else {
          console.log('Email sent: ' + info.response)
          // Xử lý thành công gửi email ở đây
        }
      })
      // userResult = await usersService.register(userPayload)
    }

    const userId = user_id.toString()

    // Tạo bản ghi mới trong bảng kois
    const koiID = new ObjectId()
    const koiPayload = {
      CategoryID: payload.CategoryID,
      KoiName: payload.KoiName,
      Age: payload.Age,
      Origin: payload.Origin,
      Gender: payload.Gender,
      Size: payload.Size,
      Breed: payload.Breed,
      Description: payload.Description,
      DailyFoodAmount: payload.DailyFoodAmount,
      FilteringRatio: payload.FilteringRatio,
      CertificateID: payload.CertificateID,
      Price: payload.Price,
      Image: payload.Image,
      Video: payload.Video,
      Status: 4, // Đặt status là 4
      _id: koiID
    }
    const koiResult = await databaseService.kois.insertOne(new KoiSchema(koiPayload))

    // Tạo bản ghi mới trong bảng consigns
    const consignID = new ObjectId()
    const consignPayload = {
      PositionCare: payload.PositionCare,
      Method: payload.Method,
      UserID: userId,
      KoiID: koiID.toString(),
      _id: consignID,
      State: 1
    }
    const consignResult = await databaseService.consigns.insertOne(new ConsignSchema(consignPayload))

    // Trả về kết quả
    return {
      user: userResult || userCheck._id,
      consign: consignResult,
      koi: koiResult
    }
  }
}

const koisService = new KoisService()
export default koisService
