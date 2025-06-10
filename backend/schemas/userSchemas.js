import Joi from "joi";

export const registerSchema = Joi.object({
  name: Joi.string()
    .pattern(/^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/)
    .min(2)
    .max(40)
    .required()
    .messages({
      "string.pattern.base": "Folosește doar litere în acest câmp",
    }),
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
  password: Joi.string().min(6).required(),
});

export const loginSchema = Joi.object({
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
  password: Joi.string().min(6).required(),
});

export const passwordSchema = Joi.object({
  password: Joi.string().min(6).required(),
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
});

export const resendEmailSchema = Joi.object({
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
});

export const refreshSchema = Joi.object({
  refreshToken: Joi.string().required(),
});
