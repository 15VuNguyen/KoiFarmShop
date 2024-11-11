import { ObjectId } from 'mongodb'
import { UserVerifyStatus } from '../../constants/enums.js'

export default class UserSchema {
  _id = new ObjectId()
  email = ''
  password = ''
  email_verify_token = ''
  forgot_password_token = ''
  verify = UserVerifyStatus.Unverified
  website = ''
  username = ''
  picture = ''
  created_at = new Date()
  updated_at = new Date()
  roleid = 1
  name = ''
  address = ''
  phone_number = ''
  constructor(user) {
    const currentDate = new Date()
    const vietnamTimezoneOffset = 7 * 60 // UTC+7 in minutes
    const localTime = new Date(currentDate.getTime() + vietnamTimezoneOffset * 60 * 1000)

    // const date = localTime.toISOString().replace('Z', '+07:00')
    this._id = user?._id ?? new ObjectId() // tự tạo id
    this.email = user.email
    this.password = user.password
    this.email_verify_token = user.email_verify_token || ''
    this.forgot_password_token = user.forgot_password_token || ''
    this.verify = user.verify || UserVerifyStatus.Unverified
    this.website = user.website || ''
    this.username = user.username || ''
    this.picture = user.picture || ''
    this.created_at = localTime || user.created_at
    this.updated_at = localTime || user.updated_at
    this.roleid = 1
    this.name = user.name || '' // nếu người dùng tạo mà k truyền ta sẽ để rỗng
    this.address = user.address || ''
    this.phone_number = user.phone_number || ''
  }
}
