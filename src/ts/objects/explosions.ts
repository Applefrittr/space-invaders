import { Explosion } from "../classes/explosion";

export const explosionArray = () => {
  const arr: Explosion[] = [];

  const add = (explosion: Explosion) => {
    arr.push(explosion);
  };

  const remove = (explosion: Explosion) => {
    const index = arr.indexOf(explosion);
    if (index > -1) {
      arr.splice(index, 1);
    }
  };

  const reset = () => {
    arr.length = 0;
  };

  return {
    arr,
    add,
    remove,
    reset,
  };
};

export const explosionList = explosionArray();
