import { Invader } from "./invader";

/** Create fleet formation of Invaders.  Count, velX , and VelY will be dynamically set by diffculty level.  Spacing is the
 * gaps between each Invader
 */
export const createFleet = (
  count: number,
  velX: number,
  velY: number,
  spacing: number
) => {
  const fleet: Invader[] = [];
  let posX = window.innerWidth - 50;
  let posY = 50;

  for (let i = 0; i < count; i++) {
    let invader = new Invader(posX, posY, velX, velY);
    invader.setBounds(i, count);
    fleet.push(invader);
    posX -= spacing;
  }

  return fleet;
};
