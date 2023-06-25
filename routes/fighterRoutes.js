import { Router } from "express";
import { fighterService } from "../services/fighterService.js";
import { responseMiddleware } from "../middlewares/response.middleware.js";
import {
  createFighterValid,
  updateFighterValid,
} from "../middlewares/fighter.validation.middleware.js";

const router = Router();
// TODO: Implement route controllers for fighter

router.get(
  "/",
  (req, res, next) => {
    try {
      const fighters = fighterService.getAllFighters();
      if (fighters) {
        req.body = {
          fighters,
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
      const fighter = fighterService.searchFighter({
        id,
      });
      if (fighter) {
        req.body = {
          ...fighter,
        };
        return req.body;
      } else {
        throw new Error(`Fighter not found`);
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
  createFighterValid,
  (req, res, next) => {
    try {
      const { error, message } = req.body;
      if (error) {
        throw new Error(message);
      }
      const { name } = req.body;
      const currentFighter = fighterService.searchFighter({
        name: name.toLowerCase(),
      });
      if (!currentFighter) {
        const fighter = fighterService.addFighter({
          ...req.body,
          name: name,
        });
        req.body = {
          ...fighter,
        };
        return req.body;
      } else {
        throw new Error("Fighter already exists");
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
  updateFighterValid,
  (req, res, next) => {
    let id = req.params.id;
    const { error, message } = req.body;
    try {
      if (error) {
        throw new Error(message);
      }
      const fighter = fighterService.updateFighter(id, req.body);
      if (fighter) {
        req.body = {
          ...fighter,
        };
        return req.body;
      } else {
        throw new Error(`Fighter not found`);
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
      const fighter = fighterService.removeFighter(id);
      if (fighter) {
        req.body = {
          fighter,
        };
        return req.body;
      } else {
        throw new Error(`Fighter not found`);
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
