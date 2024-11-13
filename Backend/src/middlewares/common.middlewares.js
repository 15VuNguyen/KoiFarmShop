import pkg from 'lodash'
import { validate } from '../utils/validation.js'
import { checkSchema } from 'express-validator'
import { USERS_MESSAGES } from '../constants/userMessages.js'
const { pick } = pkg

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

const addressSchema = {
  notEmpty: {
    errorMessage: USERS_MESSAGES.ADDRESS_IS_REQUIRED
  },
  isString: {
    errorMessage: USERS_MESSAGES.ADDRESS_MUST_BE_A_STRING
  },
  trim: true
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

const phoneNumberSchema = {
  notEmpty: {
    errorMessage: USERS_MESSAGES.PHONE_NUMBER_IS_REQUIRED
  },
  trim: true,
  isLength: {
    options: {
      min: 10,
      max: 20
    },
    errorMessage: USERS_MESSAGES.PHONE_NUMBER_LENGTH_MUST_BE_FROM_10_TO_20
  }
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

const PositionCareSchema = {
  notEmpty: {
    errorMessage: USERS_MESSAGES.POSITION_CARE_IS_REQUIRED
  }
}

const methodSchema = {
  notEmpty: {
    errorMessage: USERS_MESSAGES.METHOD_IS_REQUIRED
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
  },
  isString: {
    errorMessage: USERS_MESSAGES.KOI_NAME_MUST_BE_A_STRING
  },
  trim: true,
  isLength: {
    options: {
      min: 1,
      max: 200
    },
    errorMessage: USERS_MESSAGES.KOI_NAME_LENGTH_MUST_BE_FROM_1_TO_200
  }
}

const getCurrentYearInVietnam = () => {
  const currentDate = new Date()
  const vietnamTimezoneOffset = 7 * 60 // UTC+7 in minutes
  const localTime = new Date(currentDate.getTime() + vietnamTimezoneOffset * 60 * 1000)
  return localTime.getFullYear()
}

const currentYearInVietnam = getCurrentYearInVietnam()

const koiAgeSchema = {
  notEmpty: {
    errorMessage: USERS_MESSAGES.KOI_AGE_IS_REQUIRED
  },
  isNumeric: {
    errorMessage: USERS_MESSAGES.KOI_AGE_MUST_BE_NUMERIC
  },
  isInt: {
    options: { min: 1900, max: currentYearInVietnam },
    errorMessage: USERS_MESSAGES.KOI_AGE_MUST_BE_BETWEEN_1900_AND_CURRENTYEAR
  }
}

const koiOriginSchema = {
  notEmpty: {
    errorMessage: USERS_MESSAGES.KOI_ORIGIN_IS_REQUIRED
  },
  isString: {
    errorMessage: USERS_MESSAGES.KOI_ORIGIN_MUST_BE_A_STRING
  },
  trim: true,
  isLength: {
    options: {
      min: 1,
      max: 200
    },
    errorMessage: USERS_MESSAGES.KOI_ORIGIN_LENGTH_MUST_BE_FROM_1_TO_200
  }
}

const koiGenderSchema = {
  notEmpty: {
    errorMessage: USERS_MESSAGES.KOI_GENDER_IS_REQUIRED
  }
}

const koiSizeSchema = {
  notEmpty: {
    errorMessage: USERS_MESSAGES.KOI_SIZE_IS_REQUIRED
  },
  isNumeric: {
    errorMessage: USERS_MESSAGES.KOI_SIZE_MUST_BE_NUMERIC
  },
  isInt: {
    options: { min: 5, max: 200 },
    errorMessage: USERS_MESSAGES.KOI_SIZE_MUST_BE_BETWEEN_5_AND_200
  }
}

const koiBreedSchema = {
  notEmpty: {
    errorMessage: USERS_MESSAGES.KOI_BREED_IS_REQUIRED
  }
}

const koiDailyFoodAmountSchema = {
  notEmpty: {
    errorMessage: USERS_MESSAGES.KOI_DAILY_FOOD_AMOUNT_IS_REQUIRED
  },
  isNumeric: {
    errorMessage: USERS_MESSAGES.KOI_DAILY_FOOD_AMOUNT_MUST_BE_NUMERIC
  },
  isInt: {
    options: { min: 1, max: 100 },
    errorMessage: USERS_MESSAGES.KOI_DAILY_FOOD_AMOUNT_MUST_BE_BETWEEN_1_AND_100
  }
}

const koiFilteringRatioSchema = {
  notEmpty: {
    errorMessage: USERS_MESSAGES.KOI_FILTERING_RATIO_IS_REQUIRED
  },
  isNumeric: {
    errorMessage: USERS_MESSAGES.KOI_FILTERING_RATIO_MUST_BE_NUMERIC
  },
  isInt: {
    options: { min: 1, max: 100 },
    errorMessage: USERS_MESSAGES.KOI_FILTERING_RATIO_MUST_BE_BETWEEN_1_AND_100
  }
}

const koiImageSchema = {
  notEmpty: {
    errorMessage: USERS_MESSAGES.KOI_IMAGE_IS_REQUIRED
  }
}

const koiVideoSchema = {
  notEmpty: {
    errorMessage: USERS_MESSAGES.KOI_VIDEO_IS_REQUIRED
  }
}

export const filterMiddleware = (filterKey) => (req, res, next) => {
  req.body = pick(req.body, filterKey)
  next()
}

export const createNewKoiKiGuiValidator = validate(
  checkSchema(
    {
      email: {
        notEmpty: {
          errorMessage: USERS_MESSAGES.EMAIL_IS_REQUIRED
        },
        isEmail: {
          errorMessage: USERS_MESSAGES.EMAIL_IS_INVALID
        },
        trim: true
      },
      name: nameSchema,
      address: addressSchema,
      phone_number: phoneNumberSchema,
      AddressConsignKoi: addressConsignKoiSchema,
      PhoneNumberConsignKoi: phoneNumberConsignKoiSchema,
      PositionCare: PositionCareSchema,
      Method: methodSchema,
      CategoryID: categoryIDSchema,
      KoiName: koiNameSchema,
      Age: koiAgeSchema,
      Origin: koiOriginSchema,
      Gender: koiGenderSchema,
      Size: koiSizeSchema,
      Breed: koiBreedSchema,
      DailyFoodAmount: koiDailyFoodAmountSchema,
      FilteringRatio: koiFilteringRatioSchema,
      Image: koiImageSchema,
      Video: koiVideoSchema
    },
    ['body']
  )
)
