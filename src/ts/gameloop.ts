import { Defender } from "./defender";
import { invaderFactory } from "./invader";

export function gameLoop() {
  let level = 1;

  const space = document.querySelector("#space") as HTMLCanvasElement;

  space.width = window.innerWidth;
  space.height = window.innerHeight;

  const ctx = space.getContext("2d");

  /** Create the player by calling Defender's constructor and adding event listeners */
  const player = new Defender();
  window.addEventListener("keydown", ({ key }) => {
    player.keyDown(key);
  });
  window.addEventListener("keyup", ({ key }) => {
    player.keyUp(key);
  });

  const invaders = invaderFactory(20, 5, 1);

  const animate = () => {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, space.width, space.height);
    player.update(ctx);

    invaders.forEach((invader) => {
      invader.update(ctx);
    });
  };

  animate();
}
