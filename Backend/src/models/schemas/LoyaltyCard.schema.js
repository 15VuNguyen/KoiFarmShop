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
    const rankValue = ['Bạc', 'Vàng', 'Bạch Kim', 'Kim Cương']
    if(rankValue.includes(loyaltyCard.RankName)){
        this.RankName = loyaltyCard.RankName || ''
    }else{
        throw new Error(`Bậc phải là 1 trong ${rankValue.join(', ')}`);
    }
    this.Point = loyaltyCard.Point || 0
    this.SalePercent = loyaltyCard.SalePercent || 0
    this.Image = loyaltyCard.Image || ''
  }
  
}
