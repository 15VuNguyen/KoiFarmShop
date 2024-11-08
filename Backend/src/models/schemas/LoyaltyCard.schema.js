import { ObjectId } from 'mongodb'

export default class LoyaltyCardSchema {
  _id = new ObjectId()
  UserID = ''
  RankName = ''
  Point = ''
  SalePercent = ''
  Image = ''

  constructor(loyaltyCard) {
    this._id = loyaltyCard?._id ?? new ObjectId() // tự tạo id
    this.UserID = loyaltyCard.UserID || ''
    const rankValue = ['Silver', 'Gold', 'Platinum', 'Diamond']
    if(rankValue.includes(loyaltyCard.RankName)){
        this.RankName = loyaltyCard.RankName || ''
    }else{
        throw new Error(`RankName must be one of ${rankValue.join(', ')}`);
    }
    this.Point = loyaltyCard.Point || 0
    this.SalePercent = loyaltyCard.SalePercent || 0
    this.Image = loyaltyCard.Image || ''
  }
  
}
