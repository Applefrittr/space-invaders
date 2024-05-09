import { Star } from "../classes/star";

export const starArray = () => {
  const arr: Star[] = [];

  const createStars = (count: number) => {
    for (let i = 1; i <= count; i++) {
      const star = new Star(
        Math.random() * innerWidth,
        Math.random() * innerHeight,
        Math.random() * 5
      );
      arr.push(star);
    }
  };

  const add = () => {
    const star = new Star(
      Math.random() * innerWidth,
      -5,
      Math.random() * 4 + 0.5
    );
    arr.push(star);
  };

  const remove = (star: Star) => {
    const index = arr.indexOf(star);
    if (index > -1) {
      arr.splice(index, 1);
    }
  };

  const reset = () => {
    arr.length = 0;
  };

  return {
    arr,
    createStars,
    add,
    remove,
    reset,
  };
};

export const stars = starArray();
