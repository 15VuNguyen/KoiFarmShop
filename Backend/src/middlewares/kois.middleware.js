import Joi from 'joi'

export const koiValidate = (data) => {
  const fishSchema = Joi.object({
    CategoryID: Joi.string().required(),
    KoiName: Joi.string().required().min(3).max(50),
    Breed: Joi.string().required(),
    Origin: Joi.string().required(),
    Age: Joi.number().required(),
    Gender: Joi.string().required(),
    Size: Joi.number().required(),
    Description: Joi.string(),
    DailyFoodAmount: Joi.number().positive(),
    FilteringRatio: Joi.number().required(),
    CertificateID: Joi.string().optional(),
    Image: Joi.string().optional(),
    Video: Joi.string().optional(),
    Price: Joi.number().positive().required()
  })

  return fishSchema.validate(data)
}
