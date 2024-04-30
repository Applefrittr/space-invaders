import { Invader } from "../classes/invader";
import { Defender } from "../classes/defender";
import { Projectile } from "../classes/projectile";

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
