import { Defender } from "./defender";
import { createFleet } from "./utils/createFleet";
import { projectileList } from "./projectileArray";
import { fleet } from "./invaderFleet";

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

  //const invaders = createFleet(10, 5, 1, 60);
  fleet.createFleet(10, 5, 1, 60);

  const animate = () => {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, space.width, space.height);
    player.update(ctx);

    fleet.arr.forEach((invader) => {
      invader.update(ctx);
    });

    projectileList.arr.forEach((projectile) => {
      console.log(projectileList.arr.length);
      projectile.update(ctx);
    });
  };

  animate();
}
