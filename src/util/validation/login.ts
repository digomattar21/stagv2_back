const Validator = require("validator");
const isEmpty = require("./is-empty");

interface ErrorType {
  email?: string;
  password?: string;
}

export const validateLoginInput = (data: any) => {
  let errors: ErrorType = {};
  try {
    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";

    if (!Validator.isEmail(data.email)) {
      errors.email = "Email is invalid";
    }

    if (Validator.isEmpty(data.email)) {
      errors.email = "Email is required";
    }

    if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
      errors.password = "Password must have 6 chars";
    }

    if (Validator.isEmpty(data.password)) {
      errors.password = "Password is required";
    }

    return {
      errors,
      isValid: isEmpty(errors),
    };
  } catch (error) {
    return {
      errors,
      isValid: isEmpty(errors),
    };
  }
};
