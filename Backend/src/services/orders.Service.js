import OrdersSchema from "../models/schemas/Order.schema.js"
import OrderDetailSchema from "../models/schemas/OrderDetail.schema.js"
import UserSchema from "../models/schemas/User.schema.js"
import databaseService from "./database.service.js"
import bcrypt from 'bcrypt'
import { ObjectId } from "mongodb"

class OrdersService {
    async createNewUser(payload) {
        const password = Math.random().toString(36).slice(-8)
        const hashedPassword = await bcrypt.hash(password, 10)

        const user_id = new ObjectId()
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
        await databaseService.users.insertOne(new UserSchema(userPayload))
        const newUser = await databaseService.users.findOne({ _id: user_id })
        console.log("new User: ", newUser)
        return newUser
    }

    async createOrder(payload, reqOrderDTCookie, reqOrderCookie) {
        const orderDT = reqOrderDTCookie
        const existedUser = await databaseService.users.findOne({ email: payload.email })

        let user, user_id


        if (existedUser) {
            user_id = existedUser._id
            user = await databaseService.users.findOne({ _id: new ObjectId(user_id) })
        } else {
            user = await this.createNewUser(payload)
            user_id = user.insertedId
        }


        reqOrderCookie = {
            UserID: user._id,
            OrderDetailID: orderDT?._id,
            ShipAddress: payload.ShipAddress,
            Description: payload.Description,
            OrderDate: new Date(),
            Status: 1,
        }
        
        const koiList = await Promise.all(
            orderDT.Items.map(item => databaseService.kois.findOne({ _id: new ObjectId(item.KoiID) }))
        );

        return {
            user, order: reqOrderCookie, orderDetail: orderDT, koiList
        }
    }

    async getOrder(user) {
        const order = await databaseService.order.find({ UserID: new ObjectId(user._id) }).toArray()
        return order
    }

    async updateOrderStatus(payload, reqParams) {
        const koi = await databaseService.kois.findOne({ _id: new ObjectId(payload.KoiID) })
        const order = await databaseService.orderDetail.findOne({ _id: new ObjectId(reqParams.orderID) })
        let result
        if (order) {
            result = await databaseService.orderDetail.findOneAndUpdate(
                { _id: new ObjectId(reqParams.orderID) },
                {
                    $set: {
                        Items: order.Items?.map(item => {
                            return item.KoiID === payload.KoiID
                                ? {
                                    KoiID: item.KoiID,
                                    Quantity: payload.Quantity,
                                }
                                : {
                                    KoiID: item.KoiID,
                                    Quantity: item.Quantity
                                }
                        }),
                        TotalPrice: order.TotalPrice + (koi.Price * payload.Quantity)
                    }
                },
                { returnDocument: 'after' }
            )
        }


        return result
    }
}


const ordersService = new OrdersService()
export default ordersService


// Tìm kiếm Koi trong database
