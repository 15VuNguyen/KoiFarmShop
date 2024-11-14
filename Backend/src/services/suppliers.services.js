import SupplierSchema from '../models/schemas/Supplier.schema.js'
import { ObjectId } from 'mongodb'
import databaseService from './database.service.js'
import { MANAGER_MESSAGES } from '../constants/managerMessage.js'
import HTTP_STATUS from '../constants/httpStatus.js'
import _ from 'lodash'

class SuplliersService {
  async createNewSupplier(payload) {
    const SupllierID = new ObjectId()
    const currentDate = new Date()
    const vietnamTimezoneOffset = 7 * 60 // UTC+7 in minutes
    const localTime = new Date(currentDate.getTime() + vietnamTimezoneOffset * 60 * 1000)

    const supplierCreateDate = localTime.toISOString().replace('Z', '+07:00')

    const result = await databaseService.suppliers.insertOne(
      new SupplierSchema({ ...payload, _id: SupllierID, SupplierCreateDate: supplierCreateDate })
    )
    console.log(payload)
    console.log(result)
    return result
  }

  async getAllSupplier() {
    try {
      const suppliers = await databaseService.suppliers.find({}).toArray()
      return suppliers
    } catch (error) {
      console.error('Error fetching suppliers:', error)
      throw error
    }
  }

  async updateSupplier(supplierid, payload) {
    const supplierObjectID = new ObjectId(supplierid)
    const supplier = await databaseService.suppliers.findOne({ _id: supplierObjectID })
    if (supplier == null) {
      throw new ErrorWithStatus({
        message: MANAGER_MESSAGES.SUPPLIER_NOT_FOUND,
        status: HTTP_STATUS.NOT_FOUND
      })
    }
    const supplierUpdate = await databaseService.suppliers.updateOne({ _id: supplierObjectID }, [
      {
        $set: {
          SupplierName: payload.SupplierName || supplier.SupplierName,
          Address: payload.Address || supplier.Address,
          Country: payload.Country || supplier.Country,
          PhoneNumber: payload.PhoneNumber || supplier.PhoneNumber,
          SupplierDescription: payload.SupplierDescription || supplier.SupplierDescription,
          SupplierImage: payload.SupplierImage || supplier.SupplierImage,
          SupplierVideo: payload.SupplierVideo || supplier.SupplierVideo,
          SupplierWebsite: payload.SupplierWebsite || supplier.SupplierWebsite,
          SupplierCreateDate: payload.SupplierCreateDate || supplier.SupplierCreateDate
        }
      }
    ])
    return supplierUpdate
  }

  async getSupplier(supplierid) {
    const supplierObjectID = new ObjectId(supplierid)
    const supplier = await databaseService.suppliers.findOne({ _id: supplierObjectID })
    if (supplier == null) {
      throw new ErrorWithStatus({
        message: MANAGER_MESSAGES.SUPPLIER_NOT_FOUND,
        status: HTTP_STATUS.NOT_FOUND
      })
    }
    return supplier
  }

  async guestGetAllSupplier() {
    try {
      const suppliers = await databaseService.suppliers.find({}).toArray()
      const suppliersWithoutId = suppliers.map((supplier) => _.omit(supplier, ['_id']))
      return suppliersWithoutId
    } catch (error) {
      console.error('Error fetching suppliers:', error)
      throw error
    }
  }

  async guestGetSupplier(supplierid) {
    const supplierObjectID = new ObjectId(supplierid)
    const supplier = await databaseService.suppliers.findOne({ _id: supplierObjectID })
    if (supplier == null) {
      throw new ErrorWithStatus({
        message: MANAGER_MESSAGES.SUPPLIER_NOT_FOUND,
        status: HTTP_STATUS.NOT_FOUND
      })
    }
    const suppliersWithoutId = _.omit(supplier, ['_id'])
    return suppliersWithoutId
  }

  async deleteSupplier(supplierid) {
    const supplierObjectID = new ObjectId(supplierid)
    const supplierValue = await databaseService.suppliers.findOne({ _id: supplierObjectID })
    if (supplierValue == null) {
      throw new ErrorWithStatus({
        message: MANAGER_MESSAGES.SUPPLIER_NOT_FOUND,
        status: HTTP_STATUS.NOT_FOUND
      })
    }
    const supplierDelete = await databaseService.suppliers.deleteOne({ _id: supplierObjectID })
    return { supplierValue: supplierValue, supplierDelete: supplierDelete }
  }
}

const suplliersService = new SuplliersService()
export default suplliersService
