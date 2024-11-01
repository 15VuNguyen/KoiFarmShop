import express from 'express'
import { config } from 'dotenv'
import usersRouter from './routes/users.routes.js'
import databaseService from './services/database.service.js'
import { defaultErrorHandler } from './middlewares/error.middlewares.js'

import cors from 'cors' // Thêm import cho cors

import managerRouter from './routes/manager.routes.js'
import {
  authorizationController,
  createNewKoiKiGuiController,
  guestGetAllSupplierController,
  guestGetSupplierController,
  getKoiByIDController,
  getKoiGroupIDController,
  getManagerInfoForChatController,
  getUserInfoForChatController
} from './controllers/common.controllers.js'
import { getKoiByCategoryIDController } from './controllers/home.controllers.js'

import { createNewKoiKiGuiValidator } from './middlewares/common.middlewares.js'
import { wrapAsync } from './utils/handle.js'

import { getAllKoiController } from './controllers/manager.controllers.js'
import { accessTokenValidator } from './middlewares/users.middlewares.js'
import paymentRouter from './routes/payments.routes.js'
import orderRouter from './routes/order.routes.js'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser';
import { app, server } from './Socket/socket.js'
import { removeAllItemsDetailController } from './controllers/orderDetailController.js'
import chatRouter from './routes/chat.routes.js'

config()
// const app = express()
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true
  })
)
const PORT = process.env.PORT || 4000
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.json());
databaseService.connect().then(() => {
  databaseService.indexUsers()
})

app.get('/', (req, res) => {
  res.send('hello world nguyen')
})

app.post('/ki-gui', createNewKoiKiGuiValidator, wrapAsync(createNewKoiKiGuiController))

app.use('/users', usersRouter)
// app.get('/categories/getCategory', getCategory)

app.use('/manager', managerRouter)
app.get('/koi/:KoiID', wrapAsync(getKoiByIDController))
app.use('/kois/:CategoryID', wrapAsync(getKoiByCategoryIDController))
app.use('/getAllKoi', wrapAsync(wrapAsync(getAllKoiController)))
app.use('/order', orderRouter)
app.use('/chat', chatRouter)

app.post('/authorization', accessTokenValidator, wrapAsync(authorizationController))

app.get('/get-all-supplier', wrapAsync(guestGetAllSupplierController))

app.get('/supplierDetail/:_id', wrapAsync(guestGetSupplierController))

app.get('/get-kois-groupKoiID',wrapAsync(getKoiGroupIDController))

app.use('/payment', paymentRouter)
app.post('/clear-coookies',  wrapAsync(removeAllItemsDetailController))
app.get('/getManagerInfoForChat', wrapAsync(getManagerInfoForChatController))
app.get('/getUserInfoForChat/:userID', wrapAsync(getUserInfoForChatController))

app.use(defaultErrorHandler)

server.listen(PORT, () => {
  console.log(`Project này đang chạy trên port ${PORT}`)
})
