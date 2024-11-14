import { USERS_MESSAGES } from '../constants/userMessages.js';
import { saveOrderToDatabase } from '../services/callback.service.js';
import databaseService from '../services/database.service.js';
import ordersService from '../services/orders.Service.js';
import { ObjectId } from 'mongodb';
import { sendOTPCode } from '../PhoneNumberValidate/phoneNumber.validate.js';

export const createOrderController = async (req, res) => {
  try {
    const paymentMethod = req.body.PaymentMethod ?? "cash"
    const reqOrderCookie = req.cookies && req.cookies.order ? JSON.parse(req.cookies.order) : {}
    const reqOrderDTCookie = req.cookies && req.cookies.orderDT ? JSON.parse(req.cookies.orderDT) : {}
    const reqOrderDiscount = req.cookies && req.cookies.discount ? JSON.parse(req.cookies.discount) : {}
    if(!reqOrderDTCookie){
      return res.json({
        message: USERS_MESSAGES.ORDER_DETAIL_NOT_FOUND
      })
    }
    if(!reqOrderDTCookie.Items || (reqOrderDTCookie.Items).length <= 0){
      return res.json({
        message: USERS_MESSAGES.NO_ITEMS
      })
    }
    const { user_id } = req.decoded_authorization
    const user = await databaseService.users.findOne({ _id: new ObjectId(user_id) })
    if (user === null) {
      throw new ErrorWithStatus({
        message: USERS_MESSAGES.USER_NOT_FOUND,
        status: HTTP_STATUS.NOT_FOUND
      })
    }
    const applyDiscount = req.body.ApplyDiscount ?? false
    const result = await ordersService.createOrder(req.body, reqOrderDTCookie, reqOrderCookie, reqOrderDiscount, user, applyDiscount, paymentMethod)
    if(paymentMethod != "cash"){
      res.cookie('order', JSON.stringify(result.order), { 
        httpOnly: true
      })
      res.cookie('orderDT', JSON.stringify(result.orderDetail), { 
        httpOnly: true
      })
      if(result.loyaltyCard){
        res.cookie('loyaltyCard', JSON.stringify(result.loyaltyCard), { 
          httpOnly: true
        })
      }
    }
    if(result.message){
      return res.json({
        message: result.message
      })
    }else{
      return res.json({
        message: USERS_MESSAGES.CREATE_ORDER_SUCCESS,
        result
      })
    }
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}
export const registerLoyaltyCardController = async (req, res) => {
  try {
    const { user_id } = req.decoded_authorization
    const user = await databaseService.users.findOne({ _id: new ObjectId(user_id) })
    if (user === null) {
      throw new ErrorWithStatus({
        message: USERS_MESSAGES.USER_NOT_FOUND,
        status: HTTP_STATUS.NOT_FOUND
      })
    }
    const result = await ordersService.registerLoyaltyCard(req.body, user)
    if(result.message){
      return res.json({
        message: result.message
      })
    }else{
      return res.json({
        message: USERS_MESSAGES.REGISTER_SUCCESS,
        result
      })
    }
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

export const getLoyaltyCardController = async (req, res) => {
  try {
    const { user_id } = req.decoded_authorization
    const user = await databaseService.users.findOne({ _id: new ObjectId(user_id) })
    if (user === null) {
      throw new ErrorWithStatus({
        message: USERS_MESSAGES.USER_NOT_FOUND,
        status: HTTP_STATUS.NOT_FOUND
      })
    }
    const result = await ordersService.getLoyaltyCard(user)
    if(result.message){
      return res.json({
        message: result.message
      })
    }else{
      return res.json({
        message: USERS_MESSAGES.GET_CARD_SUCCESS,
        result
      })
    }
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

export const sendOtpCodeController = async (req, res) => {
  try {
    const { user_id } = req.decoded_authorization
    const user = await databaseService.users.findOne({ _id: new ObjectId(user_id) })
    if (user === null) {
      throw new ErrorWithStatus({
        message: USERS_MESSAGES.USER_NOT_FOUND,
        status: HTTP_STATUS.NOT_FOUND
      })
    }
    const result = await sendOTPCode(user, req.body)
    if(result.message){
      return res.json({
        message: result.message
      })
    }else{
      return res.json({
        message: USERS_MESSAGES.SENT_OTP_SUCCESSFULLY,
        result
      })
    }
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}
export const checkOrderPriceController = async (req, res) => {
  try {
    const { user_id } = req.decoded_authorization
    const user = await databaseService.users.findOne({ _id: new ObjectId(user_id) })
    if (user === null) {
      throw new ErrorWithStatus({
        message: USERS_MESSAGES.USER_NOT_FOUND,
        status: HTTP_STATUS.NOT_FOUND
      })
    }
    const reqOrderDTCookie = req.cookies && req.cookies.orderDT ? JSON.parse(req.cookies.orderDT) : null
    const applyDiscount = req.body.ApplyDiscount ? req.body.ApplyDiscount : false
    const result = await ordersService.checkOrderPrice(user, applyDiscount, reqOrderDTCookie)
    if(result.message){
      return res.json({
        message: result.message
      })
    }else{
      return res.json({
        result
      })
    }
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}
export const getAllRankAboveController = async (req, res) => {
  try {
    const { user_id } = req.decoded_authorization
    const user = await databaseService.users.findOne({ _id: new ObjectId(user_id) })
    if (user === null) {
      throw new ErrorWithStatus({
        message: USERS_MESSAGES.USER_NOT_FOUND,
        status: HTTP_STATUS.NOT_FOUND
      })
    }
    const result = await ordersService.getAllRankAbove(user)
    if(result.message){
      return res.json({
        message: result.message
      })
    }else{
      return res.json({
        result
      })
    }
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}


export const removeOrderCookieController = async (req, res) => {
  try {
    const orderCookie = req.cookies?.order;
    if (orderCookie) {
      res.clearCookie("order");
      return res.status(200).json({ message: "Order cookie has been cleared" });
    } else {
      return res.status(404).json({ message: "Order cookie not found" });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}
export const getOrderController = async (req, res) => {
  try {
    const { user_id } = req.decoded_authorization
    const user = await databaseService.users.findOne({ _id: new ObjectId(user_id) })
    if (user === null) {
      throw new ErrorWithStatus({
        message: USERS_MESSAGES.USER_NOT_FOUND,
        status: HTTP_STATUS.NOT_FOUND
      })
    }
    const result = await ordersService.getOrder(user)

    console.log("result: ", result)
    return res.json({
      message: USERS_MESSAGES.GET_ORDER_SUCCESS,
      result
    })
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}
export const updateOrderStatusController = async (req, res) => {
  try {
    const result = await ordersService.updateOrderStatus(req.body, req.params);
    console.log("result: ", result)
    return res.json({
      message: USERS_MESSAGES.UPDATE_ORDER_SUCCESS,
      result
    })
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
};
export const saveOrderController = async (req, res) => {
  try {
    const reqOrderCookie = req.cookies && req.cookies.order ? JSON.parse(req.cookies.order) : {}
    const result = await saveOrderToDatabase(reqOrderCookie);
    res.clearCookie('orderDT')
    res.clearCookie('order')
    return res.json({
      message: USERS_MESSAGES.SAVE_TO_DB_SUCCESS,
      result
    })
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
};


