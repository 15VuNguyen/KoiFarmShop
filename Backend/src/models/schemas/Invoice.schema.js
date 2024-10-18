import { ObjectId } from 'mongodb'

export default class InvoiceSchema {
  _id = new ObjectId()
  GroupKoiIDInvoice = ''
  InvoiceDate = new Date()
  Status = ''
  Discount = ''
  TotalPrice = ''

  constructor(invoice) {
    const date = new Date()
    this._id = invoice?._id ?? new ObjectId() // tự tạo id
    this.GroupKoiIDInvoice = invoice.GroupKoiIDInvoice || ''
    this.InvoiceDate = invoice.InvoiceDate || date
    this.Status = invoice.Status || ''
    this.Discount = invoice.Discount || ''
    this.TotalPrice = invoice.TotalPrice || ''
  }
}
