import { Router } from "express";
import { userService } from "../services/userService.js";
import {
  createUserValid,
  updateUserValid,
} from "../middlewares/user.validation.middleware.js";
import { responseMiddleware } from "../middlewares/response.middleware.js";

const router = Router();

// TODO: Implement route controllers for user

router.get(
  "/",
  (req, res, next) => {
    try {
      const users = userService.getAllUsers();
      if (users) {
        req.body = {
          users,
        };
        return req.body;
      }
    } catch ({ message }) {
      return (req.body = {
        error: true,
        message,
      });
    } finally {
      next();
    }
  },

  responseMiddleware
);

router.get(
  "/:id",
  (req, res, next) => {
    let id = req.params.id;
    try {
      const user = userService.getOneUser({
        id,
      });
      if (user) {
        req.body = {
          ...user,
        };
        return req.body;
      } else {
        throw new Error(`User not found`);
      }
    } catch ({ message }) {
      return (req.body = {
        error: true,
        message,
      });
    } finally {
      next();
    }
  },
  responseMiddleware
);

router.post(
  "/",
  createUserValid,
  (req, res, next) => {
    try {
      const { error, message } = req.body;
      if (error) {
        throw new Error(message);
      }
      const { email, phoneNumber } = req.body;
      const isUserPresentInDBbyEmail = userService.getOneUser({
        email,
      });
      const isUserPresentInDBbyPhone = userService.getOneUser({
        phoneNumber,
      });

      if (!isUserPresentInDBbyEmail && !isUserPresentInDBbyPhone) {
        const users = userService.addUser(req.body);
        req.body = {
          users,
        };
        return req.body;
      } else {
        throw new Error("User already exists");
      }
    } catch ({ message }) {
      return (req.body = {
        error: true,
        message,
      });
    } finally {
      next();
    }
  },
  responseMiddleware
);

router.put(
  "/:id",
  updateUserValid,
  (req, res, next) => {
    let id = req.params.id;
    const { error, message } = req.body;
    try {
      if (error) {
        throw new Error(message);
      }
      const user = userService.updateUser(id, req.body);
      if (user) {
        req.body = {
          ...user,
        };
        return req.body;
      } else {
        throw new Error(`User not found`);
      }
    } catch ({ message }) {
      return (req.body = {
        error: true,
        message,
      });
    } finally {
      next();
    }
  },
  responseMiddleware
);

router.delete(
  "/:id",
  (req, res, next) => {
    let id = req.params.id;
    try {
      const user = userService.removeUser(id);
      if (user) {
        req.body = {
          user,
        };
        return req.body;
      } else {
        throw new Error(`User not found`);
      }
    } catch ({ message }) {
      return (req.body = {
        error: true,
        message,
      });
    } finally {
      next();
    }
  },

  responseMiddleware
);
export { router };
