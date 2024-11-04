import Joi from 'joi'

export const koiValidate = (data) => {
  const fishSchema = Joi.object({
    GroupKoiID: Joi.string().optional().allow(""),
    CategoryID: Joi.string().required(),
    KoiName: Joi.string().required().min(3).max(50),
    Breed: Joi.string().required(),
    Origin: Joi.string().required(),
    Age: Joi.number().required(),
    Gender: Joi.string().required(),
    Size: Joi.number().required(),
    Description: Joi.string().optional().allow(""),
    DailyFoodAmount: Joi.number().positive(),
    FilteringRatio: Joi.number().required(),
    CertificateID: Joi.string().optional().allow(""),
    Image: Joi.string().optional().allow(""),
    Video: Joi.string().optional().allow(""),
    Price: Joi.number().positive().required()
  })

  return fishSchema.validate(data)
}
