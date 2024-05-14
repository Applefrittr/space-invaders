import { Defender } from "./classes/defender";
import { projectileList } from "./objects/projectiles";
import { fleet } from "./objects/invaderFleet";
import { detectCollision } from "./utils/detectCollision";
import { Level } from "./objects/levels";

export class Game {
  player: Defender;
  levelArray: Level[];
  level: number;
  ctx: CanvasRenderingContext2D | null = null;
  isPaused: boolean = false;
  requestID: number = 0;
  startAnimationsRunning: boolean = false;
  msPrev: number = performance.now();
  fps: number = 60;
  msPerFrame: number = 1000 / this.fps;

  constructor(player: Defender, levelArray: Level[], level: number) {
    this.player = player;
    this.levelArray = levelArray;
    this.level = level;
  }

  setCanvasCtx(ctx: CanvasRenderingContext2D | null) {
    this.ctx = ctx;
  }

  levelStart() {
    const currLevel = this.levelArray[this.level];
    this.player.reset();
    fleet.reset();
    projectileList.reset();
    fleet.createFleet(
      currLevel.shipCount,
      currLevel.shipVelocity,
      1,
      60,
      currLevel.projVelocity
    );
    this.startAnimationsRunning = true;
    this.player.animationLock = true;
  }

  gameLoop() {
    const animate = () => {
      if (this.ctx) {
        this.requestID = requestAnimationFrame(animate);

        const msNow = performance.now();
        const msPassed = msNow - this.msPrev;

        if (msPassed < this.msPerFrame) return;

        const msExcess = msPassed % this.msPerFrame;
        this.msPrev = msNow - msExcess;

        if (!this.isPaused) {
          if (this.player && this.player.hit) {
            this.player.hit = false;
            setTimeout(() => {
              this.player.animationLock = false;
              this.stop();
              this.level = 0;
              this.player.score = 0;
              this.gameLoop();
            }, 2000);
          } else if (fleet.arr.length === 0) {
            if (this.player.y + this.player.height <= 0) {
              this.player.lvlWon = false;
              this.stop();
              setTimeout(() => {
                this.level++;
                this.gameLoop();
              }, 2000);
              return;
            }
            this.player.lvlWon = true;
            projectileList.reset();
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
                this.player.score += invader.scoreVal;
                projectileList.remove(projectile);
                fleet.destroyShip(invader);
              } else if (hit && projectile.dy < 0)
                projectileList.remove(projectile);
              else return;
            });
            if (this.player && detectCollision(projectile, this.player)) {
              projectileList.remove(projectile);
              this.player.hit = true;
              this.player.animationLock = true;
            }
            projectile.update(this.ctx);
          });
        }
      }
    };

    this.levelStart();

    animate();
    setTimeout(() => {
      this.startAnimationsRunning = false;
      this.player.animationLock = false;
      fleet.arr.forEach((invader) => {
        invader.animationLock = false;
      });
    }, 3000);
  }

  stop() {
    if (this.ctx) {
      cancelAnimationFrame(this.requestID);
      this.ctx.clearRect(0, 0, innerWidth, innerHeight);
    }
  }

  togglePause = () => {
    this.isPaused = !this.isPaused;
  };
}
