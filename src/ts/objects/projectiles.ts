import { Projectile } from "../classes/projectile";

export const projectileArray = () => {
  const arr: Projectile[] = [];

  const add = (projectile: Projectile) => {
    arr.push(projectile);
  };

  const remove = (projectile: Projectile) => {
    const index = arr.indexOf(projectile);
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

export const projectileList = projectileArray();
