import { userRepository } from "../repositories/userRepository.js";
const PHONE_REGEXP =
  /((\+38)?\(?\d{3}\)?[\s\.-]?(\d{7}|\d{3}[\s\.-]\d{2}[\s\.-]\d{2}|\d{3}-\d{4}))/g;
const GMAIL_REGEXP = /^([a-zA-Z0-9_\-\.]+)@(gmail+)\.(com)$/g;

class UserService {
  // TODO: Implement methods to work with user
  getAllUsers() {
    const item = userRepository.getAll();
    if (!item) {
      return null;
    }
    return item;
  }
  addUser(data) {
    const item = userRepository.create(data);
    if (!item) {
      return null;
    }
    return item;
  }

  updateUser(id, dataToUpdate) {
    const item = userRepository.update(id, dataToUpdate);
    if (!item) {
      return null;
    }
    return item;
  }

  removeUser(id) {
    const item = userRepository.delete(id);
    if (item.length < 1) {
      return null;
    }
    return item;
  }

  getOneUser(search) {
    const item = userRepository.getOne(search);
    if (!item) {
      return null;
    }
    return item;
  }
  trimAndLowercaseData(str) {
    const item = str.trim().toLowerCase();
    if (!item) {
      return null;
    }
    return item;
  }
  checkEmail(email) {
    const item = GMAIL_REGEXP.test(email);
    if (!item) {
      return null;
    }
    return item;
  }
  checkPhone(phoneNumber) {
    const item = PHONE_REGEXP.test(phoneNumber);
    if (!item) {
      return null;
    }
    return item;
  }
  checkIfRightField(model, object) {
    for (const key in object) {
      if (Object.hasOwnProperty.call(object, key)) {
        if (key === "id") {
          continue;
        }
        if (!(key in model)) {
          throw new Error(`${key} must not be`);
        }
      }
    }
  }
}

const userService = new UserService();

export { userService };
