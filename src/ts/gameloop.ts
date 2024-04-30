import { Defender } from "./defender";
import { projectileList } from "./projectileArray";
import { fleet } from "./invaderFleet";
import { detectCollision } from "./utils/detectCollision";

export function gameLoop() {
  let level = 1;

  const space = document.querySelector("#space") as HTMLCanvasElement;

  space.width = window.innerWidth;
  space.height = window.innerHeight;

  const ctx = space.getContext("2d");

  const player = new Defender();
  window.addEventListener("keydown", ({ key }) => {
    player.keyDown(key);
  });
  window.addEventListener("keyup", ({ key }) => {
    player.keyUp(key);
  });

  fleet.createFleet(87, 5, 1, 60);

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
        if (hit) {
          projectileList.remove(projectile);
          fleet.destroyShip(invader);
        }
      });
      projectile.update(ctx);
    });
  };

  animate();
}
