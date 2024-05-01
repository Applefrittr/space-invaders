import { Defender } from "./classes/defender";
import { projectileList } from "./objects/projectiles";
import { fleet } from "./objects/invaderFleet";
import { detectCollision } from "./utils/detectCollision";

export function gameLoop() {
  let level = 1;

  const space = document.querySelector("#space") as HTMLCanvasElement;

  space.width = window.innerWidth;
  space.height = window.innerHeight;

  const ctx = space.getContext("2d");

  const player = new Defender();
  window.addEventListener("keydown", ({ key, repeat }) => {
    player.keyDown(key, repeat);
  });
  window.addEventListener("keyup", ({ key, repeat }) => {
    player.keyUp(key, repeat);
  });

  fleet.reset();
  projectileList.reset();

  fleet.createFleet(40, 5, 1, 60);
  fleet.arr.forEach((invader) => {
    invader.fire();
  });

  const animate = () => {
    requestAnimationFrame(animate);
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
      projectile.update(ctx);
    });
  };

  animate();
}
