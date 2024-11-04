import { ObjectId } from 'mongodb'
import databaseService from './database.service.js'
import GroupKoiSchema from '../models/schemas/GroupKoi.schema.js'
import InvoiceSchema from '../models/schemas/Invoice.schema.js'
import KoiSchema from '../models/schemas/Koi.schema.js'
import { ErrorWithStatus } from '../models/Errors.js'
import { MANAGER_MESSAGES } from '../constants/managerMessage.js'
import HTTP_STATUS from '../constants/httpStatus.js'

class InvoicesService {
  async createNewInvoiceGroupKoi(payload) {
    let group_koi_id = new ObjectId()
    const GroupKoiID = group_koi_id.toString()

    const priceOneKoi = payload.PriceOneKoi ?? 0
    const quantity = payload.Quantity ?? 0
    const discount = payload.Discount ?? 0

    const groupKoiPayLoad = {
      _id: group_koi_id,
      SupplierID: payload.SupplierID,
      GroupKoiCategoryID: payload.GroupKoiCategoryID,
      Dimension: payload.Dimension ?? 0,
      BreedGroupKoi: payload.BreedGroupKoi,
      PriceOneKoi: priceOneKoi,
      Quantity: quantity,
      GroupKoiImage: payload.GroupKoiImage,
      GroupKoiVideo: payload.GroupKoiVideo
    }
    const groupKoiResult = await databaseService.groupKois.insertOne(new GroupKoiSchema(groupKoiPayLoad))

    // Tạo ra các con koi dựa vào quantity
    const koiArray = []
    for (let i = 0; i < payload.Quantity; i++) {
      let koi_id = new ObjectId()
      const koiPayload = {
        _id: koi_id,
        GroupKoiID: GroupKoiID,
        CategoryID: payload.GroupKoiCategoryID.toString(),
        Size: payload.Dimension ?? 0,
        Breed: payload.BreedGroupKoi,
        Status: 1,
        Price: priceOneKoi + 700000,
        Image: payload.GroupKoiImage,
        Video: payload.GroupKoiVideo
      }
      koiArray.push(new KoiSchema(koiPayload))
    }
    const koiResult = await databaseService.kois.insertMany(koiArray)

    //tạo hóa đơn
    const InvoiceID = new ObjectId()
    const specificDate = new Date(Date.UTC(2024, 10, 4, 0, 0, 0)); // Tháng 10 là tháng 11 vì tháng trong JavaScript bắt đầu từ 0
    const invoicePayload = {
      _id: InvoiceID,
      GroupKoiIDInvoice: GroupKoiID,
      InvoiceDate: specificDate.toISOString(),
      Status: 1,
      Discount: discount,
      TotalPrice: quantity * priceOneKoi - quantity * priceOneKoi * (discount / 100)
    }
    const invoiceResult = await databaseService.invoices.insertOne(new InvoiceSchema(invoicePayload))

    return {
      groupKoi: groupKoiResult,
      kois: koiResult,
      invoice: invoiceResult
    }
  }

  async getAllInvoice() {
    try {
      const invoices = await databaseService.invoices.find({}).toArray()
      return invoices
    } catch (error) {
      console.error('Error fetching invoices:', error)
      throw error
    }
  }

  async getInvoice(invoiceid) {
    const invoiceObjectID = new ObjectId(invoiceid)
    const invoice = await databaseService.invoices.findOne({ _id: invoiceObjectID })
    if (invoice == null) {
      throw new ErrorWithStatus({
        message: MANAGER_MESSAGES.INVOICE_NOT_FOUND,
        status: HTTP_STATUS.NOT_FOUND
      })
    }
    return invoice
  }

  async updateInvoice(invoiceID, payload) {
    //tìm consign dựa vào consignID
    const invoiceObjectID = new ObjectId(invoiceID)
    const invoice = await databaseService.invoices.findOne({ _id: invoiceObjectID })
    if (invoice == null) {
      throw new ErrorWithStatus({
        message: MANAGER_MESSAGES.INVOICE_NOT_FOUND,
        status: HTTP_STATUS.NOT_FOUND
      })
    }
    const groupKoiObjectID = new ObjectId(invoice.GroupKoiIDInvoice)
    const groupKoi = await databaseService.groupKois.findOne({ _id: groupKoiObjectID })
    if (groupKoi == null) {
      throw new ErrorWithStatus({
        message: MANAGER_MESSAGES.GROUP_KOI_NOT_FOUND,
        status: HTTP_STATUS.NOT_FOUND
      })
    }
    const groupKoiString = groupKoiObjectID.toString()
    const kois = await databaseService.kois.find({ GroupKoiID: groupKoiString }).toArray()
    console.log(kois)
    if (kois == null) {
      throw new ErrorWithStatus({
        message: MANAGER_MESSAGES.KOIS_NOT_FOUND,
        status: HTTP_STATUS.NOT_FOUND
      })
    }
    const quantityGroupKoi = payload.Quantity ?? groupKoi.Quantity ?? 0
    const priceOneKoiGroupKoi = payload.PriceOneKoi ?? groupKoi.PriceOneKoi ?? 0
    const discountInvoice = payload.Discount ?? invoice.Discount ?? 0
    // cập nhật lại các thông tin invoice
    const invoiceUpdate = await databaseService.invoices.updateOne({ _id: new ObjectId(invoice._id) }, [
      {
        $set: {
          InvoiceDate: payload.InvoiceDate || invoice.InvoiceDate || '',
          Status: payload.Status || invoice.Status || '',
          Discount: discountInvoice,
          TotalPrice:
            quantityGroupKoi * priceOneKoiGroupKoi - quantityGroupKoi * priceOneKoiGroupKoi * (discountInvoice / 100) ??
            invoice.TotalPrice ??
            0
        }
      }
    ])
    //cập nhật lại thông tin GroupKoi, nếu có thay đổi thì cập nhật cái mới, không thì giữ nguyên
    const groupKoiUpdate = await databaseService.groupKois.updateOne({ _id: new ObjectId(groupKoi._id) }, [
      {
        $set: {
          SupplierID: payload.SupplierID || groupKoi.SupplierID || '',
          GroupKoiCategoryID: payload.GroupKoiCategoryID || groupKoi.GroupKoiCategoryID || '',
          Dimension: payload.Dimension ?? groupKoi.Dimension ?? 0,
          BreedGroupKoi: payload.BreedGroupKoi || groupKoi.BreedGroupKoi || '',
          PriceOneKoi: priceOneKoiGroupKoi,
          Quantity: quantityGroupKoi,
          GroupKoiImage: payload.GroupKoiImage || groupKoi.GroupKoiImage || '',
          GroupKoiVideo: payload.GroupKoiVideo || groupKoi.GroupKoiVideo || ''
        }
      }
    ])

    // Cập nhật mảng các con Koi liên quan đến GroupKoiID
    const koiUpdatePayload = {
      CategoryID: payload.GroupKoiCategoryID || groupKoi.GroupKoiCategoryID,
      Size: payload.Dimension ?? groupKoi.Dimension ?? 0,
      Breed: payload.BreedGroupKoi || groupKoi.BreedGroupKoi,
      Price: priceOneKoiGroupKoi + 700000 || groupKoi.PriceOneKoi,
      Image: payload.GroupKoiImage || groupKoi.GroupKoiImage,
      Video: payload.GroupKoiVideo || groupKoi.GroupKoiVideo
    }

    const koiUpdateResult = await databaseService.kois.updateMany(
      { GroupKoiID: groupKoiString },
      { $set: koiUpdatePayload }
    )

    const currentQuantity = kois.length
    const newQuantity = payload.Quantity || groupKoi.Quantity

    if (newQuantity > currentQuantity) {
      // Tạo thêm các con Koi mới
      const koiArray = []
      for (let i = 0; i < newQuantity - currentQuantity; i++) {
        let koi_id = new ObjectId()
        const koiPayload = {
          _id: koi_id,
          GroupKoiID: groupKoiString,
          CategoryID: payload.GroupKoiCategoryID || groupKoi.GroupKoiCategoryID,
          Size: payload.Dimension ?? groupKoi.Dimension ?? 0,
          Breed: payload.BreedGroupKoi || groupKoi.BreedGroupKoi,
          Status: 1,
          Price: priceOneKoiGroupKoi + 700000 || groupKoi.PriceOneKoi,
          Image: payload.GroupKoiImage || groupKoi.GroupKoiImage,
          Video: payload.GroupKoiVideo || groupKoi.GroupKoiVideo
        }
        koiArray.push(new KoiSchema(koiPayload))
      }
      await databaseService.kois.insertMany(koiArray)
    } else if (newQuantity < currentQuantity) {
      // Xóa bớt các con Koi hiện có
      const koiIdsToDelete = kois.slice(newQuantity).map((koi) => koi._id)
      console.log(koiIdsToDelete)
      await databaseService.kois.deleteMany({ _id: { $in: koiIdsToDelete } })
    }

    return {
      invoice: invoiceUpdate,
      groupKoi: groupKoiUpdate,
      kois: koiUpdateResult
    }
  }
}

const invoicesService = new InvoicesService()
export default invoicesService
