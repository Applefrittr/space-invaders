import { defender } from "./defender";

export function gameLoop() {
  const space = document.querySelector("#space") as HTMLCanvasElement;

  space.width = window.innerWidth;
  space.height = window.innerHeight;

  const ctx = space.getContext("2d");

  const player = defender();

  window.addEventListener("keydown", ({ key }) => {
    player.keysDown(key);
  });

  window.addEventListener("keyup", ({ key }) => {
    player.keysUp(key);
  });

  const animate = () => {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, space.width, space.height);
    player.updateDefender(ctx);
  };

  animate();
}
