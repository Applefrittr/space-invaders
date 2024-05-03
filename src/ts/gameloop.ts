import { Defender } from "./classes/defender";
import { Projectile } from "./classes/projectile";
import { projectileList } from "./objects/projectiles";
import { fleet } from "./objects/invaderFleet";
import { detectCollision } from "./utils/detectCollision";
import { Level } from "./objects/levels";

export function gameLoop(
  player: Defender,
  space: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  levelArray: Level[],
  level: number
) {
  console.log(level, level++);
  const currLevel = levelArray[level];

  fleet.reset();
  projectileList.reset();

  fleet.createFleet(currLevel.shipCount, currLevel.shipVelocity, 1, 60);

  let requestID: number;

  const animate = () => {
    requestID = requestAnimationFrame(animate);
    if (player.hit) {
      stop();
      player.hit = false;
      setTimeout(() => {
        gameLoop(player, space, ctx, levelArray, 0);
      }, 2000);
    } else if (fleet.arr.length === 0) {
      stop();
      setTimeout(() => {
        gameLoop(player, space, ctx, levelArray, level++);
      }, 2000);
    }
    ctx.clearRect(0, 0, space.width, space.height);
    player.update(ctx);

    fleet.arr.forEach((invader) => {
      invader.update(ctx);
    });

    projectileList.arr.forEach((projectile) => {
      fleet.arr.forEach((invader) => {
        const hit = detectCollision(projectile, invader);
        if (hit && projectile.dy > 0) {
          projectileList.remove(projectile);
          fleet.destroyShip(invader);
        } else if (hit && projectile.dy < 0) projectileList.remove(projectile);
        else return;
      });
      if (detectCollision(projectile, player)) {
        projectileList.remove(projectile);
        player.hit = true;
      }
      projectile.update(ctx);
    });
  };

  const start = () => {
    requestID = requestAnimationFrame(animate);
  };

  const stop = () => {
    console.log("Game stopped!");
    cancelAnimationFrame(requestID);
  };

  start();
}
