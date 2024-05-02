import { Invader } from "../classes/invader";
import { Defender } from "../classes/defender";
import { Projectile } from "../classes/projectile";

export const detectCollision = (
  projectile: Projectile,
  ship: Invader | Defender
) => {
  let dx = Math.abs(projectile.x - (ship.x + ship.width / 2));
  let dy = Math.abs(projectile.y - (ship.y + ship.height / 2));

  if (dx > projectile.radius + ship.width / 2) return false;

  if (dy > projectile.radius + ship.height / 2) return false;

  if (dx <= ship.width) return true;

  if (dy <= ship.height) return true;

  dx = dx - ship.width;
  dy = dy - ship.height;
  return dx * dx + dy * dy <= projectile.radius * projectile.radius;
};
