import databaseService from './database.service.js'
import { ObjectId } from 'mongodb'

class OrderDetailService {
    async addToCart(payload, reqCookie) {
        const koi = await databaseService.kois.findOne({ _id: new ObjectId(payload.KoiID) })
        if (!koi) {
            throw new Error('Koi not found!')
        }

        let orderDT
        let newPrice

        if (reqCookie && reqCookie.Items) {
            orderDT = reqCookie

            if (!orderDT.Items) {
                orderDT.Items = []
            }

            if (orderDT.TotalPrice == null) {
                orderDT.TotalPrice = 0 // Khởi tạo nếu null
            }

            const itemIndex = orderDT.Items.findIndex((item) => item.KoiID === payload.KoiID)
            if (itemIndex > -1) {
                // Tăng số lượng
                orderDT.Items[itemIndex].Quantity++
                newPrice = Number(koi.Price) // Tính giá trị cho mục hiện tại
            } else {
                // Thêm mục mới
                orderDT.Items.push({ KoiID: payload.KoiID, Quantity: 1 })
                newPrice = Number(koi.Price) // Tính giá trị cho mục mới
            }

            // Cập nhật TotalPrice
            orderDT.TotalPrice += newPrice
        } else {
            orderDT = {
                Items: [{ KoiID: payload.KoiID, Quantity: 1 }],
                TotalPrice: Number(koi.Price) // Khởi tạo với giá của koi
            }
        }
        const savedOrder = await this.saveOrderToDatabase(orderDT)
        return { orderDT: savedOrder, koi }
    }
    async buyNow(payload, reqCookie) {
        const koiListObject = await this.filterKoiId(payload)
        if(koiListObject.message){
            return 'Koi not found'
        }

        const koiID = koiListObject.FirstKoiID
        const koiList = (await this.getSamePropertiesKoi(koiID)).filter(koi => koi.Status != 0)
        if (!koiList) {
            return 'Koi not found'
        }
        console.log(koiList)

        let buyNowDT = reqCookie || {
            Items: [],
            TotalPrice: 0
        }

        if (buyNowDT.TotalPrice === null) {
            buyNowDT.TotalPrice = 0 // Khởi tạo nếu null
        }
        const quantity = payload.Quantity ? payload.Quantity : 1
        if (quantity > koiList.length) {
            return `${koiList.length} available in stock`
        }
        const newPrice = koiList.slice(0, quantity).reduce((total, koi) => {
            return total + koi.Price
        }, 0)

        buyNowDT = {
            Items: [{ KoiID: new ObjectId(koiID), Quantity: quantity }],
            TotalPrice: Number(newPrice) // Khởi tạo với giá của koi
        }

        return { buyNowDT }
    }
    // async saveOrderToDatabase(order) {

    //         const result = await databaseService.orderDetail.insertOne(order)
    //         order._id = result.insertedId // Attach the new _id to the order
    //         return order

    // }

    async fetchOrder(reqCookie) {
        // const result = await databaseService.orderDetail.findOne({ _id: new ObjectId(payload.orderID) })
        let orderDT, koiList
        if (reqCookie && reqCookie.Items) {
            orderDT = reqCookie
            koiList = await Promise.all(orderDT?.Items.map(async (item) => await databaseService.kois.findOne({ _id: new ObjectId(item.KoiID) })))
            // const items = await Promise.all(result.Items.map(async (item) => {
            //     const koi = await databaseService.kois.findOne({ _id: new ObjectId(item.KoiID) });
            //     const category = await databaseService.category.findOne({ _id: new ObjectId(koi.CategoryID) });
            //     return {
            //         KoiName: koi.KoiName,
            //         CategoryName: category.CategoryName,
            //         Size: koi.Size,
            //         Image: koi.Image
            //     };
            // }));
        } else {
            return 'Order not found'
        }
        return {
            orderDT,
            koiList: koiList
        }
    }

    async removeItem(payload, reqOrderDTCookie) {
        let orderDetail = reqOrderDTCookie
        if(orderDetail && orderDetail.Items){
            const foundItem = orderDetail.Items.find(item => item.KoiID === payload.KoiID)
            if(!foundItem){
                return `Koi with id '${payload.KoiID}' not found`
            }
            const koiList = (await this.getSamePropertiesKoi(payload.KoiID)).filter(koi=> koi.Status != 0)
            const removedKoiList = koiList.slice(0, foundItem.Quantity)
            let removedItemPrice = removedKoiList.reduce((total, koi)=>{
                return total + Number(koi.Price)
            }, 0)
            const removedOrder = orderDetail?.Items.filter(item => {
                if (item.KoiID !== payload.KoiID) {
                    return {
                        KoiID: item.KoiID,
                        Quantity: item.Quantity
                    }
                }
            })
            return {
                orderDT: {
                    Items: removedOrder,
                    TotalPrice: Number(orderDetail.TotalPrice) - Number(removedItemPrice)
                }
            }
        }else{
            return 'Order not found'
        }
    }

    async updateItemQuantity(payload, reqCookie) {
        const koiList = (await this.getSamePropertiesKoi(payload.KoiID)).filter(koi => koi.Status != 0)
        let orderDT
        if (reqCookie && reqCookie.Items) {
            orderDT = reqCookie
            if (!koiList) {
                return 'Koi not found'
            }
            if (payload.Quantity > koiList.length) {
                return `${koiList.length} available in stock`
            }
            const foundItem = orderDT.Items.find(item => {
                return koiList.some(koi => koi._id.toString() === item.KoiID)
            })

            if (!foundItem) {
                return 'Item not found'
            }
            const oldPrice = koiList.slice(0, foundItem.Quantity).reduce((total, koi) => {
                return total + koi.Price
            }, 0)
            const newPrice = koiList.slice(0, payload.Quantity).reduce((total, koi) => {
                return total + koi.Price
            }, 0)
            foundItem.Quantity = payload.Quantity
            const updatedPrice = orderDT.TotalPrice - oldPrice + newPrice

            return {
                orderDT: {
                    ...orderDT,
                    TotalPrice: updatedPrice
                }
            }
        } else {
            return 'Order detail not found'
        }
        // console.log("koiList: ", koiList)
        // const quantity = koiList?.length
        // if (!payload.Quantity) {
        //     return 'Quantity is required'
        // }
        // if (payload.Quantity > quantity) {
        //     return `${quantity} available in stock`
        // }
        // let orderDT
        // let oldPrice = 0
        // let updatedPrice = 0
        // let updatedList = koiList.slice(0, payload.Quantity);
        // console.log("updatedKoiList: ", updatedList)
        // if (reqOrderDTCookie) {
        //     orderDT = reqOrderDTCookie
        //     console.log("orderDetail: ", orderDT)
        //     orderDT?.Items.map(item => {
        //         const foundKoi = koiList?.find(koi => koi._id.toString() === item.KoiID)
        //         console.log('found koi: ', foundKoi)
        //         if (foundKoi) {
        //             oldPrice += foundKoi.Price
        //         }
        //     })
        //     console.log("old price: ", oldPrice)

        //     orderDT = {
        //         Items: updatedList?.map((updatedKoi) => {


        //             updatedPrice += updatedKoi.Price
        //             return {
        //                 KoiID: updatedKoi._id,
        //                 Quantity: 1
        //             }
        //         }),
        //         TotalPrice: orderDT?.TotalPrice - oldPrice + updatedPrice
        //     }
        //     console.log("updated Order detail: ", orderDT)
        //     return {
        //         orderDT,
        //         samePropertiesKoi: koiList
        //     }
        // } else {
        //     return 'Order detail not found'
        // }
    }
    // async updateItemQuantity(payload, reqParams, reqOrderDTCookie) {
    //     const koi = await databaseService.kois.findOne({ _id: new ObjectId(payload.KoiID) })
    //     const koiList = this.getSamePropertiesKoi(payload.KoiID)
    //     console.log("koiList: ", koiList)
    //     const order = await databaseService.orderDetail.findOne({ _id: new ObjectId(reqParams.orderID) })
    //     if(!order){
    //         return 'Order not found'
    //     }
    //     if(!koi){
    //         return 'Koi not exiested'
    //     }
    //     let result, oldQuantity
    //     if (order) {
    //         result = await databaseService.orderDetail.findOneAndUpdate(
    //             { _id: new ObjectId(reqParams.orderID) },
    //             {
    //                 $set: {
    //                     Items: order.Items?.map((item) => {
    //                         if (item.KoiID === payload.KoiID) {
    //                             oldQuantity = item.Quantity;  // Capture oldQuantity here
    //                             return {
    //                                 KoiID: item.KoiID,
    //                                 Quantity: payload.Quantity
    //                             };
    //                         } else {
    //                             return {
    //                                 KoiID: item.KoiID,
    //                                 Quantity: item.Quantity
    //                             }
    //                         }
    //                     }),
    //                     TotalPrice: order.TotalPrice + koi.Price * (payload.Quantity - oldQuantity)
    //                 }
    //             },
    //             { returnDocument: 'after' }
    //         )
    //     }
    //     return result
    // }

    async getKoiQuantity(payload) {
        // let koi = await databaseService.kois.findOne({_id: new ObjectId(payload.KoiID)})
        let koisList, quantity
        let size = payload.Size
        if (size < 15) {
            koisList = await databaseService.kois
                .find({
                    CategoryID: payload.CategoryID,
                    Breed: payload.Breed,
                    Size: { $lt: 15 }
                })
                .toArray();
        }
        else if (size >= 15 && size < 18) {
            koisList = await databaseService.kois
                .find({
                    CategoryID: payload.CategoryID,
                    Breed: payload.Breed,
                    Size: { $gte: 15, $lt: 18 }
                })
                .toArray();
        }
        else if (size >= 18 && size < 20) {
            koisList = await databaseService.kois
                .find({
                    CategoryID: payload.CategoryID,
                    Breed: payload.Breed,
                    Size: { $gte: 18, $lt: 20 }
                })
                .toArray();
        }
        else {
            koisList = await databaseService.kois
                .find({
                    CategoryID: payload.CategoryID,
                    Breed: payload.Breed,
                    Size: Number(payload.Size)
                })
                .toArray();
        }
        const filteredKois = koisList.filter(koi => koi.Status != 0);
        console.log('list: ', filteredKois)
        quantity = filteredKois?.length
        console.log('quantity: ', quantity)
        const koiPrices = {
            Viet: [
                { min: 0, max: 15, price: 500000, description: 'Lô 39 con mix tất cả các loại' },
                { min: 15, max: 18, price: 500000, description: 'Lô 20 con (Tặng 5 con)' },
                { min: 18, max: 20, price: 500000, description: 'Lô 12 con (Tặng 3 con)' },
                { min: 20, max: 25, price: 50000, description: '20cm - <25cm' },
                { min: 25, max: 30, price: 90000, description: '25cm' },
                { min: 30, max: 35, price: 130000, description: '30cm' },
                { min: 35, max: 40, price: 180000, description: '35cm' },
                { min: 40, max: 45, price: 230000, description: '40cm' },
                { min: 45, max: 50, price: 300000, description: '45cm' },
                { min: 50, max: 55, price: 370000, description: '50cm' },
                { min: 55, max: 60, price: 450000, description: '55cm' },
                { min: 60, max: 65, price: 530000, description: '60cm' },
                { min: 65, max: 70, price: 620000, description: '65cm' },
                { min: 70, max: 75, price: 710000, description: '70cm' },
                { min: 75, max: Infinity, price: 850000, description: '>75cm' }
            ],
            F1: [
                { min: 0, max: 15, price: 1000000, description: 'Lô 39 con mix tất cả các loại' },
                { min: 15, max: 18, price: 1000000, description: 'Lô 20 con (Tặng 5 con)' },
                { min: 18, max: 20, price: 1000000, description: 'Lô 12 con (Tặng 3 con)' },
                { min: 20, max: 25, price: 120000, description: '20cm' },
                { min: 25, max: 30, price: 175000, description: '25cm' },
                { min: 30, max: 35, price: 250000, description: '30cm' },
                { min: 35, max: 40, price: 340000, description: '35cm' },
                { min: 40, max: 45, price: 420000, description: '40cm' },
                { min: 45, max: 50, price: 550000, description: '45cm' },
                { min: 50, max: 55, price: 680000, description: '50cm' },
                { min: 55, max: 60, price: 830000, description: '55cm' },
                { min: 60, max: 65, price: 1000000, description: '60cm' },
                { min: 65, max: 70, price: 1200000, description: '65cm' },
                { min: 70, max: 75, price: 1420000, description: '70cm' },
                { min: 75, max: Infinity, price: 1700000, description: '>75cm' }
            ],
            Nhat: [
                { min: 0, max: 15, priceMin: 800000, priceMax: 2000000, description: '<15cm' },
                { min: 15, max: 18, priceMin: 1000000, priceMax: 3000000, description: '15-18cm' },
                { min: 18, max: 20, priceMin: 2000000, priceMax: 3000000, description: '18-20cm' },
                { min: 20, max: 25, priceMin: 1700000, priceMax: 3400000, description: '20cm' },
                { min: 25, max: 30, priceMin: 2250000, priceMax: 4050000, description: '25cm' },
                { min: 30, max: 35, priceMin: 3000000, priceMax: 4900000, description: '30cm' },
                { min: 35, max: 40, priceMin: 3900000, priceMax: 5900000, description: '35cm' },
                { min: 40, max: 45, priceMin: 4200000, priceMax: 6300000, description: '40cm' },
                { min: 45, max: 50, priceMin: 6000000, priceMax: 8200000, description: '45cm' },
                { min: 50, max: 55, priceMin: 7300000, priceMax: 9600000, description: '50cm' },
                { min: 55, max: 60, priceMin: 8800000, priceMax: 11200000, description: '55cm' },
                { min: 60, max: 65, priceMin: 10500000, priceMax: 13000000, description: '60cm' },
                { min: 65, max: 70, priceMin: 12500000, priceMax: 15000000, description: '65cm' },
                { min: 70, max: 75, priceMin: 14700000, priceMax: 17700000, description: '70cm' },
                { min: 75, max: Infinity, priceMin: 17000000, priceMax: 20000000, description: '>75cm' }
            ]
        }
        const breedPricing = koiPrices[payload.Breed]
        console.log("bre: ", breedPricing)
        const priceCheck = breedPricing?.find((range) => payload.Size >= range.min && payload.Size < range.max)
        console.log("price check: ", priceCheck)
        if (filteredKois.length > 0 && priceCheck)
            return {
                CategoryName: {
                    priceCheck,
                    Quantity: quantity,
                    Description: priceCheck.description
                }
            }
    }

    async findKoi(payload) {
        let koiList
        koiList = await databaseService.kois
            .find(
                {
                    CategoryID: payload.CategoryID,
                    Breed: payload.Breed,
                    Size: Number(payload.Size)
                })
            .toArray()
        return koiList
    }
    async filterKoiId(payload) {
        let koiList
        if (payload.CategoryID && payload.Price) {
            koiList = await databaseService.kois
                .find(
                    {
                        CategoryID: payload.CategoryID,
                        Breed: payload.Breed,
                        Size: Number(payload.Size),
                        Price: payload.Price
                    })
                .toArray()
        } else if (payload.Price) {
            koiList = await databaseService.kois
                .find(
                    {
                        Breed: payload.Breed,
                        Size: Number(payload.Size),
                        Price: payload.Price
                    })
                .toArray()
        } else {
            koiList = await databaseService.kois
                .find(
                    {
                        CategoryID: payload.CategoryID,
                        Breed: payload.Breed,
                        Size: Number(payload.Size)
                    })
                .toArray()
        }
        if (!koiList || koiList.length <= 0) {
            return { message: 'Koi list not found' }
        }
        const filteredKois = koiList?.filter(koi => koi.Status !== 0)
        if (payload.Quantity) {
            filteredKois.length = payload.Quantity
        }
        const koiIdList = filteredKois?.map(koi => koi._id)
        return {
            KoiList: filteredKois,
            FirstKoiID: koiIdList[0],
            Quantity: filteredKois.length
        }
    }
    async getSamePropertiesKoi(KoiID) {
        const koi = await databaseService.kois.findOne({ _id: new ObjectId(KoiID) })
        let koiProperties, koiList
        if (koi) {
            // if (koi.Breed === 'Viet' || koi.Breed === 'F1') {
                koiProperties = {
                    CategoryID: koi.CategoryID,
                    Breed: koi.Breed,
                    Size: Number(koi.Size)
                }
            // } 
            // else {
            //     koiProperties = {
            //         CategoryID: koi.CategoryID,
            //         Breed: koi.Breed,
            //         Size: Number(koi.Size),
            //         Price: Number(koi.Price)
            //     }
            // }
            koiList = await databaseService.kois.find(koiProperties).toArray()
            return koiList
        } else {
            return { message: 'KoiID not found' }
        }
    }

    async makeArrayOrder(payload, reqCookie) {
        let newPrice = 0
        let orderDT, koiList
        const koiListObject = await this.filterKoiId(payload)
        if(koiListObject.message){
            return 'Koi not found'
        }
        let koiID = koiListObject.FirstKoiID  
        console.log("koi id: ", koiListObject)
        const samePropertiesKois = (await this.getSamePropertiesKoi(koiID)).filter(koi => koi.Status != 0)

        if (reqCookie && reqCookie.Items) {
            orderDT = reqCookie
            koiList = koiListObject?.KoiList

            if (!orderDT.Items) {
                orderDT.Items = []
            }

            if (orderDT.TotalPrice == null) {
                orderDT.TotalPrice = 0 // Khởi tạo nếu null
            }
            console.log("order DT Item: ", orderDT.Items)

            let totalQuantity

            const foundItem = orderDT.Items.find(item => {
                return samePropertiesKois.some(koi => koi._id.toString() === item.KoiID);
            });

            console.log("found item: ", foundItem)

            totalQuantity = (foundItem?.Quantity || 0) + payload.Quantity
            if (totalQuantity > samePropertiesKois.length) {
                return `${samePropertiesKois.length - (foundItem?.Quantity || 0)} available in stock`
            }

            if (foundItem) {
                foundItem.Quantity += payload.Quantity

            } else {
                orderDT.Items.push({
                    KoiID: koiID,
                    Quantity: payload.Quantity
                })
            }
            newPrice = koiList?.reduce((total, koi) => {
                return total + Number(koi.Price)
            }, orderDT.TotalPrice)
            orderDT.TotalPrice = Number(newPrice)
        } else {
            if (payload.Quantity > samePropertiesKois.length) {
                return `${samePropertiesKois.length} available in stock`
            }
            koiList = samePropertiesKois.slice(0, payload.Quantity)
            console.log("else koi list: ", koiList)
            newPrice = koiList?.reduce((total, koi) => {
                return total + Number(koi.Price); 
            }, 0); 

            console.log("newPrice: ", newPrice)
            orderDT = {
                _id: new ObjectId(),
                Items: [{
                    KoiID: koiID,
                    Quantity: payload.Quantity
                }],
                TotalPrice: Number(newPrice) // Khởi tạo với giá của koi
            }
        }

        return {
            orderDT
        }
    }
    async getMinMaxPrice(payload) {
        const koiList = await this.findKoi(payload)
        console.log("list kois: ", koiList)
        const minPrice = Math.min(
            ...koiList
                .map(koi => Number(koi.Price))
                .filter(price => !isNaN(price))
        );
        const maxPrice = Math.max(
            ...koiList
                .map(koi => Number(koi.Price))
                .filter(price => !isNaN(price))
        );
        if (koiList?.length > 0) {
            return {
                min: minPrice || 0,
                max: maxPrice || 0
            }
        }
    }
    async getKoiByPrice(payload) {
        const koiList = (await this.findKoi(payload)).filter(koi => koi.Price === payload.Price)
        const quantity = koiList?.length
        return (koiList && quantity > 0)
            ? {
                koiList,
                Quantity: quantity
            } :
            {
                koiList: [],
                Quantity: 0
            }
    }

}

const orderDetailService = new OrderDetailService()
export default orderDetailService

// Tìm kiếm Koi trong database
