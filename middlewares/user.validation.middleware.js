import { USER } from "../models/user.js";
import { userService } from "../services/userService.js";

const GMAIL_REGEXP = new RegExp(/^([a-zA-Z0-9_\-\.]+)@(gmail+)\.(com)$/, "g");
const PHONE_REGEXP = new RegExp(
  /(\+380)?\(?\d{3}\)?[\s\.-]?(\d{7}|\d{3}[\s\.-]\d{2}[\s\.-]\d{2}|\d{3}-\d{4})/,
  "g"
);

const createUserValid = (req, res, next) => {
  // TODO: Implement validatior for USER entity during creation
  try {
    const { firstName, lastName, email, phoneNumber, password } = req.body;
    userService.checkIfRightField(USER, req.body);

    if (!firstName) {
      throw new Error(`Error. First name must not be empty`);
    }
    if (!lastName) {
      throw new Error(`Error. Last name must not bes empty`);
    }
    if (!email) {
      throw new Error(`Error. Email must not be empty`);
    }
    if (!GMAIL_REGEXP.test(email)) {
      throw new Error(`Error. Email is incorrect`);
    }
    if (!phoneNumber) {
      throw new Error(`Error. Phone number must not be empty`);
    }
    if (!PHONE_REGEXP.test(phoneNumber)) {
      throw new Error(`Error. Phone number is incorrect `);
    }

    if (!password) {
      throw new Error(`Error. Password must not be empty`);
    }
    if (password.length < 3) {
      throw new Error(`Password is too short`);
    }

    const user = {
      firstName,
      lastName,
      email,
      phoneNumber,
      password,
    };
    return (req.body = user);
  } catch ({ message }) {
    req.body = {
      error: true,
      message,
    };
    return req.body;
  } finally {
    next();
  }
};

const updateUserValid = (req, res, next) => {
  // TODO: Implement validatior for user entity during update
  try {
    const { firstName, lastName, email, phoneNumber, password } = req.body;
    if (!firstName && !lastName && !email && !phoneNumber && !password) {
      throw new Error(`One of field must be fill`);
    } else {
      userService.checkIfRightField(USER, req.body);
      if (email && !GMAIL_REGEXP.test(email)) {
        throw new Error(`Email is incorrect`);
      }
      if (phoneNumber && !PHONE_REGEXP.test(phoneNumber)) {
        throw new Error(`Phone number is incorrect `);
      }
      if (password && password.length < 3) {
        throw new Error(` Password is too short`);
      }
      const user = {
        ...userAgent,
      };
      return (req.body = user);
    }
  } catch ({ message }) {
    req.body = {
      error: true,
      message,
    };
    return req.body;
  } finally {
    next();
  }
};

export { createUserValid, updateUserValid };
