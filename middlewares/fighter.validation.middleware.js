import { FIGHTER } from "../models/fighter.js";
import { fighterService } from "../services/fighterService.js";
import { getUserAgent } from "../helpers/userAgent.js";

const createFighterValid = (req, res, next) => {
  // TODO: Implement validatior for FIGHTER entity during creation
  try {
    let userAgent = getUserAgent(
      req.headers["user-agent"],
      "PostmanRuntime/7.30.0",
      req
    );

    const { name, power, defense, health = 100 } = userAgent;
    fighterService.checkIfRightField(FIGHTER, userAgent);

    if (!name) {
      throw new Error(`Fighter name must not be empty`);
    } else if (!power) {
      throw new Error(`Fighter power must not be empty`);
    } else if (power < 1) {
      throw new Error(`Power must be greater than 1`);
    } else if (power > 100) {
      throw new Error(`Power must be less than 100`);
    } else if (!defense) {
      throw new Error(`Fighter defense must not be empty`);
    } else if (defense < 1) {
      throw new Error(`Defense must be greater than 1`);
    } else if (defense > 10) {
      throw new Error(`Defense must be less than 10`);
    } else {
      const fighter = {
        name,
        power,
        defense,
        health,
      };
      return (req.body = fighter);
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

const updateFighterValid = (req, res, next) => {
  // TODO: Implement validatior for FIGHTER entity during update
  try {
    const { name, power, defense, health = 100 } = userAgent;
    if (!name && !power && !defense && !health) {
      throw new Error(`One of field must be fill`);
    } else {
      fighterService.checkIfRightField(FIGHTER, userAgent);
      if (power && power < 1) {
        throw new Error(`Power must be more than 1`);
      } else if (power && power > 100) {
        throw new Error(`Power must be less than 100`);
      } else if (defense && defense < 1) {
        throw new Error(`Defense must be more than 1`);
      } else if (defense && defense > 10) {
        throw new Error(`Defense must be less than 10`);
      } else if (health && health > 12) {
        throw new Error(`Health must be less than 120`);
      } else if (health && health < 80) {
        throw new Error(`Health must be more than 80`);
      } else {
        const fighter = {
          name,
          power,
          defense,
        };
        return (req.body = fighter);
      }
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

export { createFighterValid, updateFighterValid };
