import { Defender } from "./classes/defender";
import { Projectile } from "./classes/projectile";
import { projectileList } from "./objects/projectiles";
import { fleet } from "./objects/invaderFleet";
import { detectCollision } from "./utils/detectCollision";

export function gameLoop(
  player: Defender,
  space: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D
) {
  let level = 1;

  fleet.reset();
  projectileList.reset();

  fleet.createFleet(20, 5, 1, 60);

  let requestID: number;

  const animate = () => {
    if (player.hit) {
      setTimeout(() => {
        stop();
        player.hit = false;
        gameLoop(player, space, ctx);
      }, 0);
    } else if (fleet.arr.length === 0) {
      setTimeout(() => {
        stop();
        gameLoop(player, space, ctx);
      }, 0);
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
    requestID = requestAnimationFrame(animate);
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
