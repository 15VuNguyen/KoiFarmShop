import { hashPassword } from '../utils/crypto.js'
import { checkSchema } from 'express-validator'
import { validate } from '../utils/validation.js'
import { USERS_MESSAGES } from '../constants/userMessages.js'
import HTTP_STATUS from '../constants/httpStatus.js'
import { ErrorWithStatus } from '../models/Errors.js'
import usersService from '../services/users.services.js'
import databaseService from '../services/database.service.js'
import { verifyToken } from '../utils/jwt.js'
import capitalize from 'lodash'
import { ObjectId } from 'mongodb'
import { UserVerifyStatus } from '../constants/enums.js'
import { REGEX_USERNAME } from '../constants/regex.js'
import JsonWebTokenError from 'jsonwebtoken'

const passwordSchema = {
  notEmpty: {
    errorMessage: USERS_MESSAGES.PASSWORD_IS_REQUIRED
  },
  isString: {
    errorMessage: USERS_MESSAGES.PASSWORD_MUST_BE_A_STRING
  },
  isLength: {
    options: {
      min: 8,
      max: 50
    },
    errorMessage: USERS_MESSAGES.PASSWORD_LENGTH_MUST_BE_FROM_8_TO_50
  },
  isStrongPassword: {
    options: {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1
    },
    errorMessage: USERS_MESSAGES.PASSWORD_MUST_BE_STRONG
  }
}

const confirmPasswordSchema = {
  notEmpty: {
    errorMessage: USERS_MESSAGES.CONFIRM_PASSWORD_IS_REQUIRED
  },
  isString: {
    errorMessage: USERS_MESSAGES.CONFIRM_PASSWORD_MUST_BE_A_STRING
  },
  isLength: {
    options: {
      min: 8,
      max: 50
    },
    errorMessage: USERS_MESSAGES.CONFIRM_PASSWORD_LENGTH_MUST_BE_FROM_8_TO_50
  },
  isStrongPassword: {
    options: {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1
    },
    errorMessage: USERS_MESSAGES.CONFIRM_PASSWORD_MUST_BE_STRONG
  },
  custom: {
    options: (value, { req }) => {
      if (value !== req.body.password) {
        throw new Error(USERS_MESSAGES.CONFIRM_PASSWORD_MUST_BE_THE_SAME_AS_PASSWORD)
      }
      return true
    }
  }
}

const nameSchema = {
  notEmpty: {
    errorMessage: USERS_MESSAGES.FULL_NAME_IS_REQUIRED
  },
  isString: {
    errorMessage: USERS_MESSAGES.FULL_NAME_MUST_BE_A_STRING
  },
  trim: true,
  isLength: {
    options: {
      min: 1,
      max: 100
    },
    errorMessage: USERS_MESSAGES.FULL_NAME_LENGTH_MUST_BE_FROM_1_TO_100
  }
}

const imageSchema = {
  optional: true,
  isString: {
    errorMessage: USERS_MESSAGES.IMAGE_URL_MUST_BE_A_STRING
  },
  trim: true
}

const userIdSchema = {
  custom: {
    options: async (value, { req }) => {
      //check value có phải objectId hay không?
      if (!ObjectId.isValid(value)) {
        throw new ErrorWithStatus({
          message: USERS_MESSAGES.INVALID_USER_ID,
          status: HTTP_STATUS.NOT_FOUND
        })
      }
      //vào database tìm user đó xem có không ?
      const user = await databaseService.users.findOne({
        _id: new ObjectId(value)
      })
      if (user === null) {
        throw new ErrorWithStatus({
          message: USERS_MESSAGES.USER_NOT_FOUND, //trong message.ts thêm FOLLOWED_USER_NOT_FOUND: 'Followed user not found'
          status: HTTP_STATUS.NOT_FOUND
        })
      }
      //nếu vướt qua hết if thì return true
      return true
    }
  }
}

const addressSchema = {
  notEmpty: {
    errorMessage: USERS_MESSAGES.ADDRESS_IS_REQUIRED
  },
  isString: {
    errorMessage: USERS_MESSAGES.ADDRESS_MUST_BE_A_STRING
  },
  trim: true,
  isLength: {
    options: {
      min: 1,
      max: 200
    },
    errorMessage: USERS_MESSAGES.ADDRESS_LENGTH_MUST_BE_FROM_1_TO_200
  }
}

const phoneNumberSchema = {
  notEmpty: {
    errorMessage: USERS_MESSAGES.PHONE_NUMBER_IS_REQUIRED
  },
  trim: true,
  isLength: {
    options: {
      min: 1,
      max: 20
    },
    errorMessage: USERS_MESSAGES.PHONE_NUMBER_LENGTH_MUST_BE_FROM_1_TO_20
  },
  isNumeric: {
    errorMessage: USERS_MESSAGES.PHONE_NUMBER_MUST_BE_NUMERIC
  }
}

const addressConsignKoiSchema = {
  notEmpty: {
    errorMessage: USERS_MESSAGES.ADDRESS_CONSIGN_KOI_IS_REQUIRED
  },
  isString: {
    errorMessage: USERS_MESSAGES.ADDRESS_CONSIGN_KOI_MUST_BE_A_STRING
  },
  trim: true
}

const phoneNumberConsignKoiSchema = {
  notEmpty: {
    errorMessage: USERS_MESSAGES.PHONE_NUMBER_CONSIGN_KOI_IS_REQUIRED
  },
  trim: true,
  isLength: {
    options: {
      min: 10,
      max: 20
    },
    errorMessage: USERS_MESSAGES.PHONE_NUMBER_CONSIGN_KOI_LENGTH_MUST_BE_FROM_10_TO_20
  }
}

const positionCareSchema = {
  notEmpty: {
    errorMessage: USERS_MESSAGES.POSITION_CARE_IS_REQUIRED
  }
}

const methodSchema = {
  notEmpty: {
    errorMessage: USERS_MESSAGES.METHOD_IS_REQUIRED
  }
}

// const shippedDateSchema = {
//   optional: true,
// }

// const receiptDateSchema = {
//   optional: true,
// }

const detailSchema = {
  notEmpty: {
    errorMessage: USERS_MESSAGES.DETAIL_IS_REQUIRED
  }
}

const categoryIDSchema = {
  notEmpty: {
    errorMessage: USERS_MESSAGES.CATEGORY_ID_IS_REQUIRED
  }
}

const koiNameSchema = {
  notEmpty: {
    errorMessage: USERS_MESSAGES.KOI_NAME_IS_REQUIRED
  }
}

const ageSchema = {
  notEmpty: {
    errorMessage: USERS_MESSAGES.KOI_AGE_IS_REQUIRED
  },
  isNumeric: {
    errorMessage: USERS_MESSAGES.KOI_AGE_MUST_BE_NUMERIC
  },
  isFloat: {
    options: { min: 1, max: 50 },
    errorMessage: USERS_MESSAGES.KOI_AGE_MUST_BE_BETWEEN_1_AND_50
  }
}

const originSchema = {
  notEmpty: {
    errorMessage: USERS_MESSAGES.KOI_ORIGIN_IS_REQUIRED
  }
}

const genderSchema = {
  notEmpty: {
    errorMessage: USERS_MESSAGES.KOI_GENDER_IS_REQUIRED
  }
}

const sizeSchema = {
  notEmpty: {
    errorMessage: USERS_MESSAGES.KOI_SIZE_IS_REQUIRED
  },
  isNumeric: {
    errorMessage: USERS_MESSAGES.KOI_SIZE_MUST_BE_NUMERIC
  },
  isFloat: {
    options: { min: Number.EPSILON, max: 200 },
    errorMessage: USERS_MESSAGES.KOI_SIZE_MUST_BE_LARGER_THAN_0_AND_SMALLER_OR_EQUAL_TO_200
  }
}

const breedSchema = {
  notEmpty: {
    errorMessage: USERS_MESSAGES.KOI_BREED_IS_REQUIRED
  }
}

const descriptionSchema = {
  notEmpty: {
    errorMessage: USERS_MESSAGES.KOI_DESCRIPTION_IS_REQUIRED
  }
}

const dailyFoodAmountSchema = {
  notEmpty: {
    errorMessage: USERS_MESSAGES.KOI_DAILY_FOOD_AMOUNT_IS_REQUIRED
  },
  isNumeric: {
    errorMessage: USERS_MESSAGES.KOI_DAILY_FOOD_AMOUNT_MUST_BE_NUMERIC
  },
  isFloat: {
    options: { min: Number.EPSILON, max: 100 },
    errorMessage: USERS_MESSAGES.KOI_DAILY_FOOD_AMOUNT_MUST_BE_LARGER_THAN_0_AND_SMALLER_OR_EQUAL_TO_100
  }
}

const filteringRatioSchema = {
  notEmpty: {
    errorMessage: USERS_MESSAGES.KOI_FILTERING_RATIO_IS_REQUIRED
  },
  isNumeric: {
    errorMessage: USERS_MESSAGES.KOI_FILTERING_RATIO_MUST_BE_NUMERIC
  },
  isFloat: {
    options: { min: Number.EPSILON, max: 100 },
    errorMessage: USERS_MESSAGES.KOI_FILTERING_RATIO_MUST_BE_LARGER_THAN_0_AND_SMALLER_OR_EQUAL_TO_100
  }
}

const certificateIDSchema = {
  notEmpty: {
    errorMessage: USERS_MESSAGES.KOI_CERTIFICATE_ID_IS_REQUIRED
  }
}

const imageKoiSchema = {
  notEmpty: {
    errorMessage: USERS_MESSAGES.KOI_IMAGE_IS_REQUIRED
  }
}

const videoKoiSchema = {
  notEmpty: {
    errorMessage: USERS_MESSAGES.KOI_VIDEO_IS_REQUIRED
  }
}

export const loginValidator = validate(
  checkSchema(
    {
      email: {
        notEmpty: {
          errorMessage: USERS_MESSAGES.EMAIL_IS_REQUIRED
        },
        isEmail: {
          errorMessage: USERS_MESSAGES.EMAIL_IS_INVALID
        },
        trim: true,
        custom: {
          options: async (value, { req }) => {
            //dựa vào email và password tìm đối tượng tuong ứng trong db
            const user = await databaseService.users.findOne({
              email: value,
              password: hashPassword(req.body.password)
            })
            if (user === null) {
              throw new Error(USERS_MESSAGES.EMAIL_OR_PASSWORD_IS_INCORRECT)
            }
            req.user = user
            return true
          }
        }
      },
      password: {
        notEmpty: {
          errorMessage: USERS_MESSAGES.PASSWORD_IS_REQUIRED
        },
        isString: {
          errorMessage: USERS_MESSAGES.PASSWORD_MUST_BE_A_STRING
        },
        isLength: {
          options: {
            min: 8,
            max: 50
          },
          errorMessage: USERS_MESSAGES.PASSWORD_LENGTH_MUST_BE_FROM_8_TO_50
        },
        isStrongPassword: {
          options: {
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1
          },
          errorMessage: USERS_MESSAGES.PASSWORD_MUST_BE_STRONG
        }
      }
    },
    ['body']
  )
)

export const registerValidator = validate(
  checkSchema(
    {
      name: nameSchema,
      email: {
        notEmpty: {
          errorMessage: USERS_MESSAGES.EMAIL_IS_REQUIRED
        },
        isEmail: {
          errorMessage: USERS_MESSAGES.EMAIL_IS_INVALID
        },
        trim: true,
        custom: {
          options: async (value, { req }) => {
            const isExist = await usersService.checkEmailExist(value)
            if (isExist) {
              throw new Error('Email already exists')
            }
            return true
          }
        }
      },
      password: passwordSchema,
      confirm_password: confirmPasswordSchema
    },
    ['body']
  )
)

export const accessTokenValidator = validate(
  checkSchema(
    {
      Authorization: {
        trim: true,
        custom: {
          //value là giá trị của Authorization, req là req của client gữi lên server
          options: async (value, { req }) => {
            //value của Authorization là chuỗi "Bearer <access_token>"
            //ta sẽ tách chuỗi đó ra để lấy access_token bằng cách split
            const accessToken = value.split(' ')[1]

            //nếu nó có truyền lên , mà lại là chuỗi rỗng thì ta sẽ throw error
            if (!accessToken) {
              //throw new Error(USERS_MESSAGES.ACCESS_TOKEN_IS_REQUIRED)  //này trả ra 422(k hay)
              // nếu kh có accessToken thì ném lỗi 401
              throw new ErrorWithStatus({
                message: USERS_MESSAGES.ACCESS_TOKEN_IS_REQUIRED,
                status: HTTP_STATUS.UNAUTHORIZED //401
              })
            }
            try {
              //nếu có accessToken thì mình phải verify AccesToken
              const decoded_authorization = await verifyToken({
                token: accessToken,
                secretOrPublicKey: process.env.JWT_SECRET_ACCESS_TOKEN
              })
              // lấy ra decoded_authorization(layload), lưu vào req, để dùng dần
              req.decoded_authorization = decoded_authorization
            } catch (error) {
              throw new ErrorWithStatus({
                message: capitalize(error.message),
                status: HTTP_STATUS.UNAUTHORIZED
              })
            }
            return true
          }
        }
      }
    },
    ['headers']
  )
)

export const refreshTokenValidator = validate(
  checkSchema(
    {
      refresh_token: {
        trim: true,
        custom: {
          options: async (value, { req }) => {
            //verify refresh_token để lấy decoded_refresh_token
            try {
              const [decoded_refresh_token, refresh_token] = await Promise.all([
                verifyToken({ token: value, secretOrPublicKey: process.env.JWT_SECRET_REFRESH_TOKEN }),
                databaseService.refreshTokens.findOne({
                  token: value
                })
              ])

              if (refresh_token === null) {
                throw new ErrorWithStatus({
                  message: USERS_MESSAGES.USED_REFRESH_TOKEN_OR_NOT_EXIST,
                  status: HTTP_STATUS.UNAUTHORIZED
                })
              }
              req.decoded_refresh_token = decoded_refresh_token
            } catch (error) {
              throw new ErrorWithStatus({
                message: capitalize(error.message),
                status: HTTP_STATUS.UNAUTHORIZED
              })
            }
            return true
          }
        }
      }
    },
    ['body']
  )
)

export const emailVerifyTokenValidator = validate(
  checkSchema(
    {
      email_verify_token: {
        trim: true,
        custom: {
          options: async (value, { req }) => {
            //kiểm tra người dùng có truyền lên email_verify_token hay không
            if (!value) {
              throw new ErrorWithStatus({
                message: USERS_MESSAGES.EMAIL_VERIFY_TOKEN_IS_REQUIRED,
                status: HTTP_STATUS.UNAUTHORIZED
              })
            }
            try {
              //verify email_verify_token để lấy decoded_email_verify_token
              const decoded_email_verify_token = await verifyToken({
                token: value,
                secretOrPublicKey: process.env.JWT_SECRET_EMAIL_VERIFY_TOKEN
              })
              //sau khi verify thành công ta đc payload của email_verify_token: decoded_email_verify_token
              req.decoded_email_verify_token = decoded_email_verify_token
            } catch (error) {
              if (error instanceof JsonWebTokenError) {
                throw new ErrorWithStatus({
                  message: capitalize(error.message),
                  status: HTTP_STATUS.UNAUTHORIZED
                })
              }
              throw error
            }
            return true
          }
        }
      }
    },
    ['query']
  )
)

export const forgotPasswordValidator = validate(
  checkSchema(
    {
      email: {
        notEmpty: {
          errorMessage: USERS_MESSAGES.EMAIL_IS_REQUIRED
        },
        isEmail: {
          errorMessage: USERS_MESSAGES.EMAIL_IS_INVALID
        },
        trim: true,
        custom: {
          options: async (value, { req }) => {
            const user = await databaseService.users.findOne({ email: value })
            if (user === null) {
              throw new ErrorWithStatus({
                message: USERS_MESSAGES.USER_NOT_FOUND,
                status: HTTP_STATUS.NOT_FOUND
              })
            }
            req.user = user
            return true
          }
        }
      }
    },
    ['body']
  )
)

export const verifyForgotPasswordTokenValidator = validate(
  checkSchema(
    {
      forgot_password_token: {
        trim: true,
        custom: {
          options: async (value, { req }) => {
            //kiểm tra người dùng có truyền lên forgot_password_token hay không
            if (!value) {
              throw new ErrorWithStatus({
                message: USERS_MESSAGES.FORGOT_PASSWORD_TOKEN_IS_REQUIRED,
                status: HTTP_STATUS.UNAUTHORIZED
              })
            }
            try {
              //verify forgot_password_token để lấy decoded_forgot_password_token
              const decoded_forgot_password_token = await verifyToken({
                token: value,
                secretOrPublicKey: process.env.JWT_SECRET_FORGOT_PASSWORD_TOKEN
              })
              //sau khi verify thành công ta đc payload của email_verify_token: decoded_email_verify_token
              req.decoded_forgot_password_token = decoded_forgot_password_token
            } catch (error) {
              if (error instanceof JsonWebTokenError) {
                //
                throw new ErrorWithStatus({
                  message: capitalize(error.message),
                  status: HTTP_STATUS.UNAUTHORIZED
                })
              }
              throw error
            }
            return true
          }
        }
      }
    },
    ['query']
  )
)

export const resetPasswordValidator = validate(
  checkSchema(
    {
      password: passwordSchema,
      confirm_password: confirmPasswordSchema
    },
    ['body']
  )
)

export const verifiedUserValidator = (req, res, next) => {
  const { verify } = req.decoded_authorization
  if (verify !== UserVerifyStatus.Verified) {
    return next(
      new ErrorWithStatus({
        message: USERS_MESSAGES.USER_IS_NOT_VERIFIED,
        status: HTTP_STATUS.FORBIDDEN
      })
    )
  }
  next()
}

export const updateMeValidator = validate(
  checkSchema(
    {
      name: {
        optional: true, //đc phép có hoặc k
        ...nameSchema, //phân rã nameSchema ra
        notEmpty: undefined //ghi đè lên notEmpty của nameSchema
      },
      address: {
        optional: true,
        ...addressSchema,
        notEmpty: undefined
      },
      phone_number: {
        optional: true,
        ...phoneNumberSchema,
        notEmpty: undefined
      },
      //giống location
      website: {
        optional: true,
        isString: {
          errorMessage: USERS_MESSAGES.WEBSITE_MUST_BE_A_STRING ////messages.ts thêm WEBSITE_MUST_BE_A_STRING: 'Website must be a string'
        },
        trim: true,
        isLength: {
          options: {
            min: 1,
            max: 200
          },

          errorMessage: USERS_MESSAGES.WEBSITE_LENGTH_MUST_BE_LESS_THAN_200 //messages.ts thêm WEBSITE_LENGTH_MUST_BE_LESS_THAN_200: 'Website length must be less than 200'
        },
        isURL: {
          errorMessage: USERS_MESSAGES.WEBSITE_MUST_BE_A_VALID_URL // messages.ts thêm WEBSITE_MUST_BE_A_VALID_URL: 'Website must be a valid URL'
        }
      },
      username: {
        optional: true,
        isString: {
          errorMessage: USERS_MESSAGES.USERNAME_MUST_BE_A_STRING ////messages.ts thêm USERNAME_MUST_BE_A_STRING: 'Username must be a string'
        },
        trim: true,
        custom: {
          options: async (value, { req }) => {
            if (REGEX_USERNAME.test(value) === false) {
              throw new Error(USERS_MESSAGES.USERNAME_MUST_BE_A_STRING)
            }
            //tìm user bằng cái username người dùng muốn cập nhật
            const user = await databaseService.users.findOne({ username: value })

            if (user) {
              throw new Error(USERS_MESSAGES.USERNAME_ALREADY_EXISTS)
            }
            return true
          }
        }
      },
      picture: imageSchema
    },
    ['body']
  )
)

export const updateConsignValidator = validate(
  checkSchema(
    {
      AddressConsignKoi: {
        optional: true, //đc phép có hoặc k
        ...addressConsignKoiSchema, //phân rã nameSchema ra
        notEmpty: undefined //ghi đè lên notEmpty của nameSchema
      },
      PhoneNumberConsignKoi: {
        optional: true, //đc phép có hoặc k
        ...phoneNumberConsignKoiSchema, //phân rã nameSchema ra
        notEmpty: undefined //ghi đè lên notEmpty của nameSchema
      },
      PositionCare: {
        optional: true, //đc phép có hoặc k
        ...positionCareSchema, //phân rã nameSchema ra
        notEmpty: undefined //ghi đè lên notEmpty của nameSchema
      },
      Method: {
        optional: true,
        ...methodSchema,
        notEmpty: undefined
      },
      ShippedDate: {
        optional: true,
        notEmpty: undefined
      },
      ReceiptDate: {
        optional: true,
        notEmpty: undefined
      },
      Detail: {
        optional: true,
        ...detailSchema,
        notEmpty: undefined
      },
      CategoryID: {
        optional: true,
        ...categoryIDSchema,
        notEmpty: undefined
      },
      KoiName: {
        optional: true,
        ...koiNameSchema,
        notEmpty: undefined
      },
      Age: {
        optional: true,
        ...ageSchema,
        notEmpty: undefined
      },
      Origin: {
        optional: true,
        ...originSchema,
        notEmpty: undefined
      },
      Gender: {
        optional: true,
        ...genderSchema,
        notEmpty: undefined
      },
      Size: {
        optional: true,
        ...sizeSchema,
        notEmpty: undefined
      },
      Breed: {
        optional: true,
        ...breedSchema,
        notEmpty: undefined
      },
      Description: {
        optional: true,
        ...descriptionSchema,
        notEmpty: undefined
      },
      DailyFoodAmount: {
        optional: true,
        ...dailyFoodAmountSchema,
        notEmpty: undefined
      },
      FilteringRatio: {
        optional: true,
        ...filteringRatioSchema,
        notEmpty: undefined
      },
      CertificateID: {
        optional: true,
        ...certificateIDSchema,
        notEmpty: undefined
      },
      Image: {
        optional: true,
        ...imageKoiSchema,
        notEmpty: undefined
      },
      Video: {
        optional: true,
        ...videoKoiSchema,
        notEmpty: undefined
      }
    },
    ['body']
  )
)

export const changePasswordValidator = validate(
  checkSchema(
    {
      old_password: {
        ...passwordSchema,
        custom: {
          options: async (value, { req }) => {
            //sau khi qua accestokenValidator thì ta đã có req.decoded_authorization chứa user_id
            //lấy user_id đó để tìm user trong
            const { user_id } = req.decoded_authorization
            const user = await databaseService.users.findOne({
              _id: new ObjectId(user_id)
            })
            //nếu không có user thì throw error
            if (user === null) {
              throw new ErrorWithStatus({
                message: USERS_MESSAGES.USER_NOT_FOUND,
                status: HTTP_STATUS.UNAUTHORIZED //404
              })
            }
            //nếu có user thì kiểm tra xem password có đúng không
            const { password } = user
            if (password !== hashPassword(value)) {
              throw new ErrorWithStatus({
                message: USERS_MESSAGES.OLD_PASSWORD_NOT_MATCH, //trong messages.ts thêm OLD_PASSWORD_NOT_MATCH: 'Old password not match'
                status: HTTP_STATUS.UNAUTHORIZED //401
              })
            }
            return true
          }
        }
      },
      password: passwordSchema,
      confirm_password: confirmPasswordSchema
    },
    ['body']
  )
)
