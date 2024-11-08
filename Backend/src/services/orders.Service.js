import databaseService from "./database.service.js"
import { verifyOTPCode } from "../PhoneNumberValidate/phoneNumber.validate.js"
import { ObjectId } from "mongodb"

class OrdersService {
    async createOrder(payload, reqOrderDTCookie, reqOrderCookie, reqOrderDiscount, user, applyDiscount) {
        const orderDT = reqOrderDTCookie
        // const user = await databaseService.users.findOne({_id: new ObjectId(user._id)})

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
        let salePercent = 0
        if (applyDiscount) {
            const loyaltyCardObject = await databaseService.loyaltyCard.findOne({ UserID: new ObjectId(user._id) })
            if (!loyaltyCardObject) {
                return { message: "Register first!" }
            }
            const totalPoint = Math.round(loyaltyCardObject.Point + (orderDT.TotalPrice / 1000))
            const saleObject = this.getSaleObject(totalPoint)
            salePercent = saleObject.percent || 0
            const rankName = saleObject.rankName || "Silver"
            reqOrderDiscount = {
                RankName: rankName,
                Point: totalPoint,
                SalePercent: salePercent
            }
            // const updatedCard = await databaseService.loyaltyCard.updateOne({UserID: new ObjectId(user._id)},{$set:reqOrderDiscount})
            // if (updatedCard.modifiedCount === 0) {
            //     return { message: "Failed to update loyalty card!" };
            // }
        }

        const totalPrice = Math.round(orderDT.TotalPrice * (100 - salePercent) / 100)

        return {
            user, order: reqOrderCookie,
            orderDetail: {
                ...orderDT,
                salePercent: salePercent,
                TotalPrice: totalPrice
            },
            loyaltyCard: reqOrderDiscount,
            koiList
        }
    }

    parsePointToRank(point) {
        const ranks = [
            { name: "Silver", maxPoints: 10000 },
            { name: "Gold", maxPoints: 20000 },
            { name: "Platinum", maxPoints: 50000 },
            { name: "Diamond", maxPoints: Infinity }
        ];

        const rank = ranks.find(r => point <= r.maxPoints);
        return rank ? rank.name : "Invalid";
    }

    getSaleObject(point) {
        const rank = this.parsePointToRank(point)
        const salePercents = [
            { rankName: "Silver", percent: 5 },
            { rankName: "Gold", percent: 10 },
            { rankName: "Platinum", percent: 15 },
            { rankName: "Diamond", percent: 20 },
        ];

        const salePercent = salePercents.find(s => s.rankName == rank)
        return salePercent ? salePercent : {}
    }

    getNextRank(currentRank) {
        const ranks = [
            { name: "Silver", maxPoints: 10000 },
            { name: "Gold", maxPoints: 20000 },
            { name: "Platinum", maxPoints: 50000 },
            { name: "Diamond", maxPoints: Infinity }
        ];
        const currentRankIndex = ranks.findIndex(rank => rank.name == currentRank.RankName)
        if (currentRankIndex === -1) {
            return { message: "Invalid rank" }
        }
        if (currentRankIndex === ranks.length - 1) {
            return { message: "You're at highest rank" }
        }
        return ranks[currentRankIndex + 1]
    }


    async registerLoyaltyCard(payload, user) {
        // console.log("existedAccount: ", existedAccount)
        // if (existedAccount) {
        //     return { message: "User has had loyalty card already!" }
        // }
        // let userPhoneNumber = user.phone_number
        // if (userPhoneNumber && payload.phone_number != userPhoneNumber) {
        //     return { message: "Please use the phone number associated with this account!" }
        // }
        // userPhoneNumber = payload.phone_number
        // await databaseService.users.updateOne({ _id: user._id }, { $set: { phone_number: payload.phone_number } })
        if(!payload.OTPCode){
            return {message: "OTP code is required!"}
        }
        const otpCheck = verifyOTPCode(payload.PhoneNumber, payload.OTPCode)
        if (!otpCheck.valid) {
            return { message: otpCheck.message }
        }

        const newLoyaltyCard = {
            _id: new ObjectId(),
            UserID: user._id,
            RankName: 'Silver',
            Point: 0,
            SalePercent: 5
        }
        const savedNew = await databaseService.loyaltyCard.insertOne(newLoyaltyCard)
        newLoyaltyCard._id = savedNew.insertedId
        return newLoyaltyCard
    }
    async getLoyaltyCard(user) {
        const loyaltyCard = await databaseService.loyaltyCard.findOne({ UserID: new ObjectId(user._id) })
        if (!loyaltyCard) {
            return { message: "User has not registered for loyalty card!" }
        }
        const nextRank = this.getNextRank(loyaltyCard)
        if (nextRank.message) {
            return { message: nextRank.message }
        }
        return { loyaltyCard, nextRank }
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
