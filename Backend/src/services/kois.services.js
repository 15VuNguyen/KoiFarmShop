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
  async getNameCategoryByID(id) {
    const result = await databaseService.category.findOne({ _id: new ObjectId(id) })
    return result.CategoryName
  }

  formatDate(date) {
    const d = new Date(date)
    const day = String(d.getDate()).padStart(2, '0')
    const month = String(d.getMonth() + 1).padStart(2, '0') // Tháng bắt đầu từ 0
    const year = d.getFullYear()
    return `${day}-${month}-${year}`
  }

  formatDateTime(date) {
    const d = new Date(date)
    const day = String(d.getDate()).padStart(2, '0')
    const month = String(d.getMonth() + 1).padStart(2, '0') // Tháng bắt đầu từ 0
    const year = d.getFullYear()
    const hours = String(d.getHours()).padStart(2, '0')
    const minutes = String(d.getMinutes()).padStart(2, '0')
    const seconds = String(d.getSeconds()).padStart(2, '0')
    return `${hours}:${minutes}:${seconds} ${day}-${month}-${year}`
  }

  getField(field, fieldName, isDate = false, isDateTime = false, unit = '') {
    if (!field) {
      return `<span style="color: tomato;">chưa có ${fieldName}</span>`
    }
    if (isDate) {
      return this.formatDate(field)
    }
    if (isDateTime) {
      return this.formatDateTime(field)
    }
    return `${field}${unit}`
  }

  async generateConsignUpdateInformation(userResult, koiResult, consignResult, titleEmail) {
    const nameCategory = await this.getNameCategoryByID(koiResult.CategoryID)

    const getStateDescription = (state) => {
      switch (state) {
        case 1:
          return '<span style="color: orange;">Yêu cầu ký gửi</span>'
        case 2:
          return '<span style="color: blue;">Đang kiểm tra Koi</span>'
        case 3:
          return '<span style="color: purple;">Đang thương thảo hợp đồng</span>'
        case 4:
          return '<span style="color: green;">Đang tìm người mua</span>'
        case 5:
          return '<span style="color: gold;">Đã bán thành công</span>'
        case -1:
          return '<span style="color: red;">Đã hủy</span>'
        default:
          return '<span style="color: gray;">Trạng thái không xác định</span>'
      }
    }

    return `
      <div style="font-family: Arial, sans-serif; line-height: 1.8; color: #333;  font-size: 14px;">
        <div style="max-width: 1000px; margin: 0 auto; padding: 40px; border: 1px solid #ddd; border-radius: 20px; background-color: #f9f9f9;">
          <h2 style="text-align: center; color: #4CAF50;">${titleEmail}</h2>
          <p>Xin chào,</p>
          <p>Dưới đây là thông tin chi tiết về việc ${titleEmail}:</p>
          <div style="display: flex; justify-content: space-between; border: 1px solid #ddd; padding: 10px; border-radius: 10px; background-color: #fff;">
            <div style="flex: 1; margin-right: 20px;">
              <h3 style="text-align: center; color: #4CAF50;  font-size: 18px;">1. Thông Tin Liên Hệ</h3>
              <ul>
                <li><strong>Email:</strong> ${this.getField(userResult.email, 'email')}</li>
                <li><strong>Tên:</strong> ${this.getField(userResult.name, 'tên')}</li>
                <li><strong>Địa chỉ:</strong> ${this.getField(userResult.address, 'địa chỉ')}</li>
                <li><strong>Số điện thoại:</strong> ${this.getField(userResult.phone_number, 'số điện thoại')}</li>
              </ul>
              <h3 style="text-align: center; color: #4CAF50; font-size: 18px;">3. Thông Tin Về Đơn Ký Gửi</h3>
              <ul>
                <li><strong>Ngày Koi được nhận tại cửa hàng:</strong> ${this.getField(consignResult.ShippedDate, 'ngày Koi được nhận tại cửa hàng', true)}</li>
                <li><strong>Ngày nhận lại Koi:</strong> ${this.getField(consignResult.ReceiptDate, 'ngày nhận lại Koi', true)}</li>
                <li><strong>Ngày tạo đơn ký gửi Koi:</strong> ${this.getField(consignResult.ConsignCreateDate, 'ngày tạo đơn ký gửi Koi', false, true)}</li>
                <li><strong>Địa chỉ thực hiện của đơn kí gửi Koi:</strong> ${this.getField(consignResult.AddressConsignKoi, 'địa chỉ thực hiện của đơn kí gửi Koi')}</li>
                <li><strong>Số điện thoại thực hiện của đơn kí gửi Koi:</strong> ${this.getField(consignResult.PhoneNumberConsignKoi, 'số điện thoại thực hiện của đơn kí gửi Koi')}</li>
                <li><strong>Vị trí chăm sóc:</strong> ${this.getField(consignResult.PositionCare, 'vị trí chăm sóc')}</li>
                <li><strong>Phương thức kí gửi:</strong> ${this.getField(consignResult.Method, 'phương thức kí gửi')}</li>
                <li><strong>Chi tiết về đơn ký gửi:</strong> ${this.getField(consignResult.Detail, 'chi tiết')}</li>
                <li><strong>Trạng thái:</strong> ${getStateDescription(consignResult.State)}</li>
                <li><strong>Hoa hồng IKOI FARM nhận được cho đơn hàng (%):</strong> <span style="color: blue;">${this.getField(consignResult.Commission, 'hoa hồng', false, false, '%')}</span></li>
                <li><strong>Tổng tiền mà khách hàng sẽ nhận được cho đơn ký gửi (đ):</strong> <span style="color: blue;">${this.getField(consignResult.TotalPrice, 'tổng tiền', false, false, 'đ')}</span></li>
              </ul>
            </div>
           <div style="flex: 1; margin-left: 20px;">
              <h3 style="text-align: center; color: #4CAF50; font-size: 18px;">2. Thông Tin Cá Koi Ký Gửi</h3>
              <ul>
                <li><strong>Loài Koi:</strong> ${this.getField(nameCategory, 'loài Koi')}</li>
                <li><strong>Tên Koi:</strong> ${this.getField(koiResult.KoiName, 'tên Koi')}</li>
                <li><strong>Tuổi:</strong> ${this.getField(koiResult.Age, 'tuổi Koi')}</li>
                <li><strong>Xuất xứ:</strong> ${this.getField(koiResult.Origin, 'xuất xứ Koi')}</li>
                <li><strong>Giới tính:</strong> ${this.getField(koiResult.Gender, 'giới tính Koi')}</li>
                <li><strong>Kích thước (cm):</strong> ${this.getField(koiResult.Size, 'kích thước Koi', false, false, ' cm')}</li>
                <li><strong>Giống:</strong> ${this.getField(koiResult.Breed, 'giống Koi')}</li>
                <li><strong>Mô tả:</strong> ${this.getField(koiResult.Description, 'mô tả Koi')}</li>
                <li><strong>Lượng thức ăn hàng ngày (g/ngày):</strong> ${this.getField(koiResult.DailyFoodAmount, 'lượng thức ăn hàng ngày Koi', false, false, ' g/ngày')}</li>
                <li><strong>Tỷ lệ lọc (%):</strong> ${this.getField(koiResult.FilteringRatio, 'tỷ lệ lọc Koi', false, false, '%')}</li>
                <li><strong>ID chứng nhận:</strong> ${this.getField(koiResult.CertificateID, 'ID chứng nhận Koi')}</li>
                <li><strong>Giá (đ):</strong> <span style="color: blue;">${this.getField(koiResult.Price, 'giá Koi', false, false, 'đ')}</span></li>
                <li><strong>Hình ảnh:</strong> ${this.getField(koiResult.Image, 'hình ảnh Koi')}</li>
                <li><strong>Video:</strong> ${this.getField(koiResult.Video, 'video Koi')}</li>
              </ul>
            </div>
          </div>
          <p>Chúng tôi rất vui mừng chào đón bạn. Nếu bạn có bất kỳ câu hỏi nào, vui lòng liên hệ với chúng tôi.</p>
          <p>Trân trọng,</p>
          <p>Đội ngũ IKOI FARM</p>
        </div>
      </div>
    `
  }

  async generateKoiRequestEmail(userResult, koiResult, consignResult, titleEmail) {
    const nameCategory = await this.getNameCategoryByID(koiResult.CategoryID)

    const getStateDescription = (state) => {
      switch (state) {
        case 1:
          return '<span style="color: orange;">Yêu cầu ký gửi</span>'
        case 2:
          return '<span style="color: blue;">Đang kiểm tra Koi</span>'
        case 3:
          return '<span style="color: purple;">Đang thương thảo hợp đồng</span>'
        case 4:
          return '<span style="color: green;">Đang tìm người mua</span>'
        case 5:
          return '<span style="color: gold;">Đã bán thành công</span>'
        case -1:
          return '<span style="color: red;">Đã hủy</span>'
        default:
          return '<span style="color: gray;">Trạng thái không xác định</span>'
      }
    }

    const confirmURL = `http://localhost:${process.env.PORT}/confirm_consign_information/consignId?consignId=${consignResult._id}`

    return `
      <div style="font-family: Arial, sans-serif; line-height: 1.8; color: #333;  font-size: 14px;">
        <div style="max-width: 1000px; margin: 0 auto; padding: 40px; border: 1px solid #ddd; border-radius: 20px; background-color: #f9f9f9;">
          <h2 style="text-align: center; color: #4CAF50;">${titleEmail}</h2>
          <p>Xin chào,</p>
          <p>Dưới đây là thông tin chi tiết về việc ${titleEmail}:</p>
          <p><a href="${confirmURL}" style="display: inline-block; padding: 10px 20px; font-size: 16px; color: #fff; background-color: #4CAF50; text-align: center; text-decoration: none; border-radius: 5px;">Xác nhận thông tin</a></p>
          <div style="display: flex; justify-content: space-between; border: 1px solid #ddd; padding: 10px; border-radius: 10px; background-color: #fff;">
            <div style="flex: 1; margin-right: 20px;">
              <h3 style="text-align: center; color: #4CAF50;  font-size: 18px;">1. Thông Tin Liên Hệ</h3>
              <ul>
                <li><strong>Email:</strong> ${this.getField(userResult.email, 'email')}</li>
                <li><strong>Tên:</strong> ${this.getField(userResult.name, 'tên')}</li>
                <li><strong>Địa chỉ:</strong> ${this.getField(userResult.address, 'địa chỉ')}</li>
                <li><strong>Số điện thoại:</strong> ${this.getField(userResult.phone_number, 'số điện thoại')}</li>
              </ul>
              <h3 style="text-align: center; color: #4CAF50; font-size: 18px;">3. Thông Tin Về Đơn Ký Gửi</h3>
              <ul>
                <li><strong>Ngày Koi được nhận tại cửa hàng:</strong> ${this.getField(consignResult.ShippedDate, 'ngày Koi được nhận tại cửa hàng', true)}</li>
                <li><strong>Ngày nhận lại Koi:</strong> ${this.getField(consignResult.ReceiptDate, 'ngày nhận lại Koi', true)}</li>
                <li><strong>Ngày tạo đơn ký gửi Koi:</strong> ${this.getField(consignResult.ConsignCreateDate, 'ngày tạo đơn ký gửi Koi', false, true)}</li>
                 <li><strong>Địa chỉ thực hiện của đơn kí gửi Koi:</strong> ${this.getField(consignResult.AddressConsignKoi, 'địa chỉ thực hiện của đơn kí gửi Koi')}</li>
                <li><strong>Số điện thoại thực hiện của đơn kí gửi Koi:</strong> ${this.getField(consignResult.PhoneNumberConsignKoi, 'số điện thoại thực hiện của đơn kí gửi Koi')}</li>
                <li><strong>Vị trí chăm sóc:</strong> ${this.getField(consignResult.PositionCare, 'vị trí chăm sóc')}</li>
                <li><strong>Phương thức kí gửi:</strong> ${this.getField(consignResult.Method, 'phương thức kí gửi')}</li>
                <li><strong>Chi tiết về đơn ký gửi:</strong> ${this.getField(consignResult.Detail, 'chi tiết')}</li>
                <li><strong>Trạng thái:</strong> ${getStateDescription(consignResult.State)}</li>
                <li><strong>Hoa hồng IKOI FARM nhận được cho đơn hàng (%):</strong> <span style="color: blue;">${this.getField(consignResult.Commission, 'hoa hồng', false, false, '%')}</span></li>
                <li><strong>Tổng tiền mà khách hàng sẽ nhận được cho đơn ký gửi (đ):</strong> <span style="color: blue;">${this.getField(consignResult.TotalPrice, 'tổng tiền', false, false, 'đ')}</span></li>
              </ul>
            </div>
           <div style="flex: 1; margin-left: 20px;">
              <h3 style="text-align: center; color: #4CAF50; font-size: 18px;">2. Thông Tin Cá Koi Ký Gửi</h3>
              <ul>
                <li><strong>Loài Koi:</strong> ${this.getField(nameCategory, 'loài Koi')}</li>
                <li><strong>Tên Koi:</strong> ${this.getField(koiResult.KoiName, 'tên Koi')}</li>
                <li><strong>Tuổi:</strong> ${this.getField(koiResult.Age, 'tuổi Koi')}</li>
                <li><strong>Xuất xứ:</strong> ${this.getField(koiResult.Origin, 'xuất xứ Koi')}</li>
                <li><strong>Giới tính:</strong> ${this.getField(koiResult.Gender, 'giới tính Koi')}</li>
                <li><strong>Kích thước (cm):</strong> ${this.getField(koiResult.Size, 'kích thước Koi', false, false, ' cm')}</li>
                <li><strong>Giống:</strong> ${this.getField(koiResult.Breed, 'giống Koi')}</li>
                <li><strong>Mô tả:</strong> ${this.getField(koiResult.Description, 'mô tả Koi')}</li>
                <li><strong>Lượng thức ăn hàng ngày (g/ngày):</strong> ${this.getField(koiResult.DailyFoodAmount, 'lượng thức ăn hàng ngày Koi', false, false, ' g/ngày')}</li>
                <li><strong>Tỷ lệ lọc (%):</strong> ${this.getField(koiResult.FilteringRatio, 'tỷ lệ lọc Koi', false, false, '%')}</li>
                <li><strong>ID chứng nhận:</strong> ${this.getField(koiResult.CertificateID, 'ID chứng nhận Koi')}</li>
                <li><strong>Giá (đ):</strong> <span style="color: blue;">${this.getField(koiResult.Price, 'giá Koi', false, false, 'đ')}</span></li>
                <li><strong>Hình ảnh:</strong> ${this.getField(koiResult.Image, 'hình ảnh Koi')}</li>
                <li><strong>Video:</strong> ${this.getField(koiResult.Video, 'video Koi')}</li>
              </ul>
            </div>
          </div>
          <p>Chúng tôi rất vui mừng chào đón bạn. Nếu bạn có bất kỳ câu hỏi nào, vui lòng liên hệ với chúng tôi.</p>
          <p>Trân trọng,</p>
          <p>Đội ngũ IKOI FARM</p>
        </div>
      </div>
    `
  }

  async generateKoiInformationToManager(userResult, koiResult, consignResult, titleEmail) {
    const nameCategory = await this.getNameCategoryByID(koiResult.CategoryID)

    const getStateDescription = (state) => {
      switch (state) {
        case 1:
          return '<span style="color: orange;">Yêu cầu ký gửi</span>'
        case 2:
          return '<span style="color: blue;">Đang kiểm tra Koi</span>'
        case 3:
          return '<span style="color: purple;">Đang thương thảo hợp đồng</span>'
        case 4:
          return '<span style="color: green;">Đang tìm người mua</span>'
        case 5:
          return '<span style="color: gold;">Đã bán thành công</span>'
        case -1:
          return '<span style="color: red;">Đã hủy</span>'
        default:
          return '<span style="color: gray;">Trạng thái không xác định</span>'
      }
    }

    const getStatusDescription = (status) => {
      switch (status) {
        case 1:
          return '<span style="color: orange;">Đơn nhập khẩu Nhật</span>'
        case 2:
          return '<span style="color: green;">Đơn cá Koi F1 của IKOI</span>'
        case 3:
          return '<span style="color: purple;">Đơn cá Koi Việt của IKOI</span>'
        case 4:
          return '<span style="color: blue;">Đơn ký gửi</span>'
        case 0:
          return '<span style="color: gold;">Đơn đã bán</span>'
        default:
          return '<span style="color: gray;">hiện trạng đơn không xác định</span>'
      }
    }

    return `
      <div style="font-family: Arial, sans-serif; line-height: 1.8; color: #333;  font-size: 14px;">
        <div style="max-width: 1000px; margin: 0 auto; padding: 40px; border: 1px solid #ddd; border-radius: 20px; background-color: #f9f9f9;">
          <h2 style="text-align: center; color: #4CAF50;">${titleEmail}</h2>
          <p>Xin chào,</p>
          <p>Dưới đây là thông tin về việc ${titleEmail}:</p>
          <div style="display: flex; justify-content: space-between; border: 1px solid #ddd; padding: 10px; border-radius: 10px; background-color: #fff;">
            <div style="flex: 1; margin-right: 20px;">
              <h3 style="text-align: center; color: #4CAF50;  font-size: 18px;">1. Thông Tin Liên Hệ</h3>
              <ul>
                <li><strong>Email:</strong> ${this.getField(userResult.email, 'email')}</li>
                <li><strong>Tên:</strong> ${this.getField(userResult.name, 'tên')}</li>
                <li><strong>Địa chỉ:</strong> ${this.getField(userResult.address, 'địa chỉ')}</li>
                <li><strong>Số điện thoại:</strong> ${this.getField(userResult.phone_number, 'số điện thoại')}</li>
              </ul>
              <h3 style="text-align: center; color: #4CAF50; font-size: 18px;">3. Thông Tin Về Đơn Ký Gửi</h3>
              <ul>
                <li><strong>Ngày Koi được nhận tại cửa hàng:</strong> ${this.getField(consignResult.ShippedDate, 'ngày Koi được nhận tại cửa hàng', true)}</li>
                <li><strong>Ngày nhận lại Koi:</strong> ${this.getField(consignResult.ReceiptDate, 'ngày nhận lại Koi', true)}</li>
                <li><strong>Ngày tạo đơn ký gửi Koi:</strong> ${this.getField(consignResult.ConsignCreateDate, 'ngày tạo đơn ký gửi Koi', false, true)}</li>
                <li><strong>Địa chỉ thực hiện của đơn kí gửi Koi:</strong> ${this.getField(consignResult.AddressConsignKoi, 'địa chỉ thực hiện của đơn kí gửi Koi')}</li>
                <li><strong>Số điện thoại thực hiện của đơn kí gửi Koi:</strong> ${this.getField(consignResult.PhoneNumberConsignKoi, 'số điện thoại thực hiện của đơn kí gửi Koi')}</li>
                <li><strong>Vị trí chăm sóc:</strong> ${this.getField(consignResult.PositionCare, 'vị trí chăm sóc')}</li>
                <li><strong>Phương thức kí gửi:</strong> ${this.getField(consignResult.Method, 'phương thức kí gửi')}</li>
                <li><strong>Chi tiết về đơn ký gửi:</strong> ${this.getField(consignResult.Detail, 'chi tiết')}</li>
                <li><strong>Trạng thái:</strong> ${getStateDescription(consignResult.State)}</li>
                <li><strong>Hoa hồng IKOI FARM nhận được cho đơn hàng (%):</strong> <span style="color: blue;">${this.getField(consignResult.Commission, 'hoa hồng', false, false, '%')}</span></li>
                <li><strong>Tổng tiền mà khách hàng sẽ nhận được cho đơn ký gửi (đ):</strong> <span style="color: blue;">${this.getField(consignResult.TotalPrice, 'tổng tiền', false, false, 'đ')}</span></li>
              </ul>
            </div>
           <div style="flex: 1; margin-left: 20px;">
              <h3 style="text-align: center; color: #4CAF50; font-size: 18px;">2. Thông Tin Cá Koi Ký Gửi</h3>
               <ul>
                <li><strong>Loài Koi:</strong> ${this.getField(nameCategory, 'loài Koi')}</li>
                <li><strong>Tên Koi:</strong> ${this.getField(koiResult.KoiName, 'tên Koi')}</li>
                <li><strong>Tuổi:</strong> ${this.getField(koiResult.Age, 'tuổi Koi')}</li>
                <li><strong>Xuất xứ:</strong> ${this.getField(koiResult.Origin, 'xuất xứ Koi')}</li>
                <li><strong>Giới tính:</strong> ${this.getField(koiResult.Gender, 'giới tính Koi')}</li>
                <li><strong>Kích thước (cm):</strong> ${this.getField(koiResult.Size, 'kích thước Koi', false, false, ' cm')}</li>
                <li><strong>Giống:</strong> ${this.getField(koiResult.Breed, 'giống Koi')}</li>
                <li><strong>Mô tả:</strong> ${this.getField(koiResult.Description, 'mô tả Koi')}</li>
                <li><strong>Lượng thức ăn hàng ngày (g/ngày):</strong> ${this.getField(koiResult.DailyFoodAmount, 'lượng thức ăn hàng ngày Koi', false, false, ' g/ngày')}</li>
                <li><strong>Tỷ lệ lọc (%):</strong> ${this.getField(koiResult.FilteringRatio, 'tỷ lệ lọc Koi', false, false, '%')}</li>
                <li><strong>Hiện trạng:</strong> ${getStatusDescription(koiResult.Status)}</li>
                <li><strong>ID chứng nhận:</strong> ${this.getField(koiResult.CertificateID, 'ID chứng nhận Koi')}</li>
                <li><strong>Giá (đ):</strong> <span style="color: blue;">${this.getField(koiResult.Price, 'giá Koi', false, false, 'đ')}</span></li>
                <li><strong>Hình ảnh:</strong> ${this.getField(koiResult.Image, 'hình ảnh Koi')}</li>
                <li><strong>Video:</strong> ${this.getField(koiResult.Video, 'video Koi')}</li>
              </ul>
            </div>
          </div>
          <p>Chúng tôi rất vui mừng thông báo rằng thông tin ký gửi Koi đã được xác nhận. Nếu bạn có bất kỳ câu hỏi nào, vui lòng liên hệ với chúng tôi.</p>
          <p>Trân trọng,</p>
          <p>Đội ngũ IKOI FARM</p>
        </div>
      </div>
    `
  }

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
    let userPayload

    if (userCheck) {
      user_id = userCheck._id

      userPayload = {
        _id: user_id,
        email: payload.email || userCheck.email,
        name: payload.name || userCheck.name,
        address: payload.address || userCheck.address,
        phone_number: payload.phone_number || userCheck.phone_number,
        username: `user${user_id.toString()}` || userCheck.username,
        roleid: 1
      }
      userResult = await databaseService.users.updateOne({ _id: user_id }, { $set: userPayload })
    } else {
      userPayload = {
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

    const currentDate = new Date()
    const vietnamTimezoneOffset = 7 * 60 // UTC+7 in minutes
    const localTime = new Date(currentDate.getTime() + vietnamTimezoneOffset * 60 * 1000)

    const consignCreateDate = localTime.toISOString().replace('Z', '+07:00')

    // Tạo bản ghi mới trong bảng consigns
    const consignID = new ObjectId()
    const consignPayload = {
      ShippedDate: payload.ShippedDate,
      ReceiptDate: payload.ReceiptDate,
      ConsignCreateDate: consignCreateDate,
      Detail: payload.Detail,
      PositionCare: payload.PositionCare,
      Method: payload.Method,
      AddressConsignKoi: payload.AddressConsignKoi,
      PhoneNumberConsignKoi: payload.PhoneNumberConsignKoi,
      UserID: userId,
      KoiID: koiID.toString(),
      _id: consignID,
      State: 1
    }
    const consignResult = await databaseService.consigns.insertOne(new ConsignSchema(consignPayload))

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
    const titleEmail = 'Yêu Cầu Kí Gửi Koi Tại IKOI FARM'
    const emailContent = await this.generateKoiRequestEmail(userPayload, koiPayload, consignPayload, titleEmail)

    let mailOptions = {
      from: process.env.EMAIL_APP, // Thay thế bằng email của bạn
      to: payload.email, // Địa chỉ email của người nhận (người dùng đăng ký)
      subject: 'Yêu Cầu Kí Gửi Koi Tại IKOI FARM',
      text: 'Nội dung Yêu Cầu Kí Gửi Koi Tại IKOI FARM...', // Hoặc sử dụng `html` để tạo nội dung email dạng HTML
      html: emailContent
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
