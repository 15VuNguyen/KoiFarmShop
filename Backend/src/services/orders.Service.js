import databaseService from "./database.service.js"
import { verifyOTPCode } from "../PhoneNumberValidate/phoneNumber.validate.js"
import { ObjectId } from "mongodb"
import { saveOrderToDatabase } from "./callback.service.js"

class OrdersService {
    async createOrder(payload, reqOrderDTCookie, reqOrderCookie, reqOrderDiscount, user, applyDiscount, paymentMethod) {
        const orderDT = reqOrderDTCookie
        reqOrderCookie = {
            UserID: user._id,
            OrderDetailID: orderDT?._id,
            ...payload.userData,
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
                return { message: "Bạn chưa có tài khoản tích điểm" }
            }
            const totalPoint = Math.round(loyaltyCardObject.Point + (orderDT.TotalPrice / 1000))
            const saleObject = this.getSaleObject(totalPoint)
            salePercent = saleObject.percent || 0
            const rankName = saleObject.rankName || "Bạc"
            reqOrderDiscount = {
                RankName: rankName,
                Point: totalPoint,
                SalePercent: salePercent
            }
        }
        if(paymentMethod == "cash"){
            return await saveOrderToDatabase(reqOrderDTCookie, reqOrderCookie, reqOrderDiscount)
        }
        return {
            user, order: reqOrderCookie,
            orderDetail: {
                ...orderDT,
                salePercent: salePercent
            },
            loyaltyCard: reqOrderDiscount,
            koiList
        }
    }

    parsePointToRank(point) {
        const ranks = [
            { name: "Bạc", maxPoints: 10000 },
            { name: "Vàng", maxPoints: 20000 },
            { name: "Bạch Kim", maxPoints: 50000 },
            { name: "Kim Cương", maxPoints: Infinity }
        ];

        const rank = ranks.find(r => point <= r.maxPoints);
        return rank ? rank.name : "Invalid";
    }

    getSaleObject(point) {
        const rank = this.parsePointToRank(point)
        const salePercents = [
            { rankName: "Bạc", percent: 5 },
            { rankName: "Vàng", percent: 10 },
            { rankName: "Bạch Kim", percent: 15 },
            { rankName: "Kim Cương", percent: 20 },
        ];

        const salePercent = salePercents.find(s => s.rankName == rank)
        return salePercent ? salePercent : {}
    }

    getNextRank(currentRank) {
        const ranks = [
            { name: "Bạc", salePercent: 5, maxPoints: 10000 },
            { name: "Vàng", salePercent: 10, maxPoints: 20000 },
            { name: "Bạch Kim", salePercent: 15, maxPoints: 50000 },
            { name: "Kim Cương", salePercent: 20, maxPoints: Infinity }
        ];
        if(!currentRank){
            return {
                allRankAbove: ranks
            }
        }
        const currentRankIndex = ranks.findIndex(rank => rank.name == currentRank.RankName)
        if (currentRankIndex === -1) {
            return { message: "Bạn chưa có thẻ tích điểm" }
        }
        if (currentRankIndex === ranks.length - 1) {
            return { message: "Bạn hiện tại đang ở bậc cao nhất" }
        }
        const allRankAbove = ranks.slice(currentRankIndex, ranks.length)
        return {
            nextRank: ranks[currentRankIndex + 1],
            allRankAbove: allRankAbove
        }
    }


    async registerLoyaltyCard(payload, user) {
        if(!payload.OTPCode){
            return {message: "Cần có mã OTP"}
        }
        const otpCheck = verifyOTPCode(payload.PhoneNumber, payload.OTPCode)
        if (!otpCheck.valid) {
            return { message: otpCheck.message }
        }

        const newLoyaltyCard = {
            _id: new ObjectId(),
            UserID: user._id,
            RankName: 'Bạc',
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
            return { message: "Bạn chưa có tài khoản tích điểm" }
        }
        const rankObject = this.getNextRank(loyaltyCard)
        if (rankObject.message) {
            return { message: rankObject.message }
        }
        return { loyaltyCard, nextRank: rankObject.nextRank}
    }
    


    async checkOrderPrice(user, applyDiscount, reqOrderDTCookie) {
        console.log(reqOrderDTCookie)
        if(!reqOrderDTCookie){
            return {message: "Không tìm thấy đơn hàng trong giỏ"}
        }
        if(reqOrderDTCookie && reqOrderDTCookie.Items){
            let calPrice
            const loyaltyCard = await databaseService.loyaltyCard.findOne({UserID: user._id})
            if(!loyaltyCard){
                return {message: "Bạn chưa có tài khoản tích điểm"}
            }
            if(applyDiscount === true){
                calPrice = reqOrderDTCookie.TotalPrice * loyaltyCard.SalePercent / 100
                return {
                    loyaltyCard,
                    salePercent: loyaltyCard.SalePercent,
                    totalDiscount: Math.round(calPrice),
                    totalPrice: reqOrderDTCookie.TotalPrice - Math.round(calPrice)
                }
            }else{
                return{
                    totalDiscount: 0,
                    totalPrice: reqOrderDTCookie.TotalPrice,
                }
            }
        }
        
    }
    
    async getAllRankAbove(user) {
        const loyaltyCard = await databaseService.loyaltyCard.findOne({ UserID: new ObjectId(user._id) }) || {}
        const rankObject = this.getNextRank(loyaltyCard)
        if (rankObject.message) {
            return { message: rankObject.message }
        }
        return {allRank: rankObject.allRankAbove}
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
