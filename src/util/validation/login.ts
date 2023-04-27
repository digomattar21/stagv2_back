import Validator from "validator";
import { isEmpty } from "./is-empty";

interface ErrorType {
  email?: string;
  password?: string;
  message?: string;
}

export const validateLoginInput = (data: any) => {
  let errors: ErrorType = {};
  try {
    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";

    if (!Validator.isEmail(data.email)) {
      errors.message = "Email is invalid";
    }

    if (Validator.isEmpty(data.email)) {
      errors.message = "Email is required";
    }

    if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
      errors.message = "Password must have 6 chars";
    }

    if (Validator.isEmpty(data.password)) {
      errors.message = "Password is required";
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
