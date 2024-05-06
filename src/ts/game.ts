import { Defender } from "./classes/defender";
import { projectileList } from "./objects/projectiles";
import { fleet } from "./objects/invaderFleet";
import { detectCollision } from "./utils/detectCollision";
import { Level } from "./objects/levels";

export class Game {
  player: Defender;
  canvas: HTMLCanvasElement | null;
  ctx: CanvasRenderingContext2D | null;
  levelArray: Level[];
  level: number;
  requestID: number;

  constructor(player: Defender, levelArray: Level[], level: number) {
    this.player = player;
    this.canvas = null;
    this.ctx = null;
    this.levelArray = levelArray;
    this.level = level;
    this.requestID = 0;
  }

  setCanvas(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D | null) {
    this.canvas = canvas;
    this.ctx = ctx;
  }

  start() {
    const currLevel = this.levelArray[this.level];
    fleet.reset();
    projectileList.reset();
    fleet.createFleet(currLevel.shipCount, currLevel.shipVelocity, 1, 60);

    const animate = () => {
      if (this.ctx) {
        this.requestID = requestAnimationFrame(animate);
        if (this.player && this.player.hit) {
          this.stop();
          this.player.hit = false;
          setTimeout(() => {
            this.level = 0;
            this.start();
          }, 2000);
        } else if (fleet.arr.length === 0) {
          this.stop();
          setTimeout(() => {
            this.level++;
            this.start();
          }, 2000);
        }
        this.ctx.clearRect(0, 0, innerWidth, innerHeight);
        this.player?.update(this.ctx);

        fleet.arr.forEach((invader) => {
          invader.update(this.ctx);
        });

        projectileList.arr.forEach((projectile) => {
          fleet.arr.forEach((invader) => {
            const hit = detectCollision(projectile, invader);
            if (hit && projectile.dy > 0) {
              projectileList.remove(projectile);
              fleet.destroyShip(invader);
            } else if (hit && projectile.dy < 0)
              projectileList.remove(projectile);
            else return;
          });
          if (this.player && detectCollision(projectile, this.player)) {
            projectileList.remove(projectile);
            this.player.hit = true;
          }
          projectile.update(this.ctx);
        });
      }
    };

    animate();
  }

  stop() {
    if (this.ctx) {
      cancelAnimationFrame(this.requestID);
      this.ctx.clearRect(0, 0, innerWidth, innerHeight);
    }
  }
}