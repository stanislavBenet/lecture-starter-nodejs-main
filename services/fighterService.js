import { fighterRepository } from "../repositories/fighterRepository.js";

class FighterService {
  // TODO: Implement methods to work with fighters
  addFighter(data) {
    const item = fighterRepository.create(data);
    if (!item) {
      return null;
    }
    return item;
  }

  updateFighter(id, dataToUpdate) {
    const item = fighterRepository.update(id, dataToUpdate);

    if (!item) {
      return null;
    }
    return item;
  }

  removeFighter(id) {
    const item = fighterRepository.delete(id);

    if (item.length < 1) {
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
  searchFighter(search) {
    const item = fighterRepository.getOne(search);
    if (!item) {
      return null;
    }
    return item;
  }
  getAllFighters() {
    const item = fighterRepository.getAll();
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

const fighterService = new FighterService();

export { fighterService };
