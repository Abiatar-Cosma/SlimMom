import { RequestError } from "../helpers/index.js";

const validateBody = (schema) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body, {
      abortEarly: false, // ✅ colectează toate erorile
      stripUnknown: true, // ✅ elimină câmpurile care nu există în schema Joi
    });

    if (error) {
      const message = error.details.map((err) => err.message).join(", ");
      return next(RequestError(400, message));
    }

    req.body = value; // ✅ salvăm doar datele validate/curate
    next();
  };
};

export default validateBody;
