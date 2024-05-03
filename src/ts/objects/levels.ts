export interface Level {
  shipCount: number;
  shipVelocity: number;
  superChance: number;
}

const level = (
  shipCount: number,
  shipVelocity: number,
  //projVelocity: number,
  superChance: number
) => {
  return {
    shipCount,
    shipVelocity,
    //projVelocity,
    superChance,
  };
};

const createLevels = (count: number) => {
  const arr: Level[] = [];
  for (let i = 0; i < count; i++) {
    const lvl = level(5 + 3 * i, 2 + i * 0.5, 0.05 + 0.025 * i);
    arr.push(lvl);
  }

  return arr;
};

export const levelArray = createLevels(20);
