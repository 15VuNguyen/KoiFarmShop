import axios from 'axios'
import CryptoJS from 'crypto-js'
import moment from 'moment'

const zaloPayment = async (req, res) => {
  const reqOrderDTCookie = req.cookies && req.cookies.orderDT ? JSON.parse(req.cookies.orderDT) : {} // Lấy từ cookie orderDT
  const reqOrderCookie = req.cookies && req.cookies.order ? JSON.parse(req.cookies.order) : {} // Lấy từ cookie order

  const config = {
    app_id: '2554',
    key1: 'sdngKKJmqEMzvh5QQcdD2A9XBSKUNaYn',
    key2: 'trMrHtvjo6myautxDUiAcYsVtaeQ8nhf',
    endpoint: 'https://sb-openapi.zalopay.vn/v2/create'
  }

  const embed_data = {
    redirecturl: 'http://localhost:3000/',
    orderDetails: reqOrderDTCookie, // Thêm thông tin đơn hàng từ cookie vào embed_data
    order: reqOrderCookie // Thêm thông tin đơn hàng từ cookie vào embed_data
  }

  const items = [{}]
  const transID = Math.floor(Math.random() * 1000000)
  const order = {
    app_id: config.app_id,
    app_trans_id: `${moment().format('YYMMDD')}_${transID}`,
    app_user: 'user123',
    app_time: Date.now(),
    item: JSON.stringify(items),
    embed_data: JSON.stringify(embed_data),
    amount: req.body.total,
    description: `KOI Shop - Payment for the order + ${Math.floor(100000 + Math.random() * 900000)}`,
    bank_code: '',
    callback_url: 'https://koi-farm-shop.onrender.com/payment/callback'
  }

  // Tạo MAC cho yêu cầu
  const data = `${config.app_id}|${order.app_trans_id}|${order.app_user}|${order.amount}|${order.app_time}|${order.embed_data}|${order.item}`
  order.mac = CryptoJS.HmacSHA256(data, config.key1).toString()

  try {
    const result = await axios.post(config.endpoint, null, { params: order })
    res.json(result.data) // Gửi phản hồi về phía client
  } catch (error) {
    console.log(error.message)
    res.status(500).json({ error: error.message }) // Gửi lỗi nếu có
  }
}

export default zaloPayment
