import { ObjectId } from 'mongodb'

export default class ConsignSchema {
  _id = new ObjectId()
  UserID = ''
  KoiID = ''
  ShippedDate = ''
  ReceiptDate = ''
  Description = ''
  State = ''
  Method = ''
  PositionCare = ''
  Commission = ''
  TotalPrice = ''

  constructor(consign) {
    this._id = consign?._id ?? new ObjectId() // tự tạo id
    this.UserID = consign.UserID || ''
    this.KoiID = consign.KoiID || ''
    this.ShippedDate = consign.ShippedDate || ''
    this.ReceiptDate = consign.ReceiptDate || ''
    this.Description = consign.Description || ''
    this.State = consign.State || 1
    this.Method = consign.Method || ''
    this.PositionCare = consign.PositionCare || ''
    this.Commission = consign.Commission || ''
    this.TotalPrice = consign.TotalPrice || ''
  }
}
