import Joi from "joi";

export const mealSchema = Joi.object({
  date: Joi.date().required(),
  product: Joi.string().required(),
  grams: Joi.number().integer().required(),
});

export const dailyMealsSchema = Joi.object({
  date: Joi.date()
    .required()
    .messages({ "date.base": "Date should look like YYYY-MM-DD" }),
});
