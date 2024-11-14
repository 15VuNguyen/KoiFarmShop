import { ObjectId } from 'mongodb'

export default class OrdersSchema {
  _id = new ObjectId()
  UserID = ''
  OrderDetailID = []
  Name = ''
  PhoneNumber = ''
  ShipAddress = ''
  Description = ''
  OrderDate = ''
  TotalPrice = ''
  Type = 'cart' || 'buyNow'
  Status = ''

  constructor(order) {
    this._id = order?._id ?? new ObjectId() // tự tạo id
    this.UserID = order.UserID || ""
    this.OrderDetailID = order.OrderDetailID || []
    this.Name = order.Name || ""
    this.PhoneNumber = order.PhoneNumber || ""
    this.ShipAddress = order.ShipAddress || ""
    this.Description = order.Description || ""
    this.OrderDate = order?.OrderDate ?? new Date()
    this.TotalPrice = order.TotalPrice || 0
    this.Type = order?.Type || 'cart'
    this.Status = order.Status || 1
  }
}
