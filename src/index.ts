import "./style.css";
import { gameLoop } from "./ts/gameloop";
import { Defender } from "./ts/classes/defender";

const space = document.querySelector("#space") as HTMLCanvasElement;

space.width = window.innerWidth;
space.height = window.innerHeight;

const ctx = space.getContext("2d");

let player = new Defender();
window.addEventListener("keydown", ({ key, repeat }) => {
  player.keyDown(key, repeat);
});
window.addEventListener("keyup", ({ key, repeat }) => {
  player.keyUp(key, repeat);
});

gameLoop(player, space, ctx);
