import Joi from "joi";

export const dailyIntakeJoiSchema = Joi.object({
  height: Joi.number().min(100).max(300).required(),
  age: Joi.number().min(6).max(130).required(),
  currentWeight: Joi.number().min(40).max(270).required(),
  desiredWeight: Joi.number().min(40).max(270).required(),
  bloodType: Joi.number().valid(1, 2, 3, 4).required(),
});
