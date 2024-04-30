import { Invader } from "../invader";
import { Defender } from "../defender";
import { Projectile } from "../projectile";

export const detectCollision = (
  projectile: Projectile,
  ship: Invader | Defender
) => {
  if (
    projectile.y >= ship.y &&
    projectile.y <= ship.y + ship.height &&
    projectile.x >= ship.x &&
    projectile.x <= ship.x + ship.width
  ) {
    console.log("HIT!");
    return true;
  } else return false;
};
