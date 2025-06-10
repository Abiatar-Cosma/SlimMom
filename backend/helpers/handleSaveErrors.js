const handleSaveErrors = (error, data, next) => {
  const { name, code } = error;
  const DUPLICATE_KEY_ERROR = 11000;

  if (name === "MongoServerError" && code === DUPLICATE_KEY_ERROR) {
    error.status = 409; // Conflict (ex: email deja folosit)
  } else {
    error.status = 400;
  }

  next();
};

export default handleSaveErrors;
