import Validator from "validator";
import { isEmpty } from "./is-empty";

interface ErrorType {
  name?: string;
  email?: string;
  password?: string;
  passwordConfirm?: string;
  message?: string;
}

export const validateRegisterInput = (data: any) => {
  let errors: ErrorType = {};
  try {
    data.name = !isEmpty(data.name) ? data.name : "";
    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";
    data.password_confirm = !isEmpty(data.password_confirm)
      ? data.password_confirm
      : "";

    if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
      errors.message = "Name must be between 2 to 30 chars";
    }

    if (Validator.isEmpty(data.name)) {
      errors.message = "Name field is required";
    }

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

    if (!Validator.isLength(data.password_confirm, { min: 6, max: 30 })) {
      errors.message = "Password must have 6 chars";
    }

    if (!Validator.equals(data.password, data.password_confirm)) {
      errors.message = "Password and Confirm Password must match";
    }

    if (Validator.isEmpty(data.password_confirm)) {
      errors.message = "Password Confirm is required";
    }
    return {
      errors,
      isValid: isEmpty(errors),
    };
  } catch (err) {
    return {
      errors,
      isValid: isEmpty(errors),
    };
  }
};
