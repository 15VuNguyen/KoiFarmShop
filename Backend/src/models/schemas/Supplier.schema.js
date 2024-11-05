import { ObjectId } from 'mongodb'

export default class SupplierSchema {
  _id = new ObjectId()
  SupplierName = ''
  Address = ''
  Country = ''
  PhoneNumber = ''
  SupplierDescription = ''
  SupplierImage = ''
  SupplierVideo = ''
  SupplierWebsite = ''
  SupplierCreateDate = new Date()

  constructor(supplier) {
    const dateCreate = new Date()
    this._id = supplier?._id ?? new ObjectId() // tự tạo id
    this.SupplierName = supplier.SupplierName || ''
    this.Address = supplier.Address || ''
    this.Country = supplier.Country || ''
    this.PhoneNumber = supplier.PhoneNumber || ''
    this.SupplierDescription = supplier.SupplierDescription || ''
    this.SupplierImage = supplier.SupplierImage || ''
    this.SupplierVideo = supplier.SupplierVideo || ''
    this.SupplierWebsite = supplier.SupplierWebsite || ''
    this.SupplierCreateDate = supplier.SupplierCreateDate || dateCreate
  }
}
