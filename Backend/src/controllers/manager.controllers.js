import { MANAGER_MESSAGES } from '../constants/managerMessage.js'
import consignsService from '../services/consigns.services.js'
import koisService from '../services/kois.services.js'
import usersService from '../services/users.services.js'

export const getAllUserController = async (req, res) => {
  try {
    const result = await usersService.getAllUser()
    return res.json({
      message: MANAGER_MESSAGES.GET_ALL_USERS_SUCCESS,
      result
    })
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

export const createNewKoiController = async (req, res) => {
  try {
    const result = await koisService.createNewKoi(req.body)
    return res.json({
      message: MANAGER_MESSAGES.CREATE_NEW_KOI_SUCCESS,
      result
    })
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

export const getAllConsignController = async (req, res) => {
  try {
    const result = await consignsService.getAllConsign()
    return res.json({
      message: MANAGER_MESSAGES.GET_ALL_CONSIGNS_SUCCESS,
      result
    })
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

export const getConsignDetailController = async (req, res) => {
  //tìm user theo username
  const { _id } = req.params
  const consign = await consignsService.getConsignDetail(_id)
  return res.json({
    message: MANAGER_MESSAGES.GET_CONSIGN_DETAIL_SUCCESS,
    result: consign
  })
}

export const updateConsignDetailController = async (req, res) => {
  //tìm user theo username
  const { _id } = req.params
  const consign = await consignsService.updateConsignDetail(_id, req.body)
  return res.json({
    message: MANAGER_MESSAGES.UPDATE_CONSIGN_DETAIL_SUCCESS,
    result: consign
  })
}
