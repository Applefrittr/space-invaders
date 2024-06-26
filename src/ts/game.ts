import { Defender } from "./classes/defender";
import { Explosion } from "./classes/explosion";
import { projectileList } from "./objects/projectiles";
import { explosionList } from "./objects/explosions";
import { fleet } from "./objects/invaderFleet";
import { detectCollision } from "./utils/detectCollision";
import { Level } from "./objects/levels";
import InvExplosion from "../assets/sounds/invader-exlosion.mp3";
import DefExplosion from "../assets/sounds/defender-explosion.mp3";

export class Game {
  player: Defender;
  levelArray: Level[];
  level: number;
  ctx: CanvasRenderingContext2D | null = null;
  isPaused: boolean = false;
  gameOver: boolean = false;
  gameWon: boolean = false;
  requestID: number = 0;
  startAnimationsRunning: boolean = false;
  msPrev: number = performance.now();
  fps: number = 60;
  msPerFrame: number = 1000 / this.fps;
  controlsLocked: boolean = true;

  constructor(player: Defender, levelArray: Level[], level: number) {
    this.player = player;
    this.levelArray = levelArray;
    this.level = level;
  }

  setCanvasCtx(ctx: CanvasRenderingContext2D | null) {
    this.ctx = ctx;
  }

  levelStart() {
    this.gameOver = false;
    const currLevel = this.levelArray[this.level];
    if (!currLevel) {
      this.gameWon = true;
      return;
    }
    this.player.reset();
    fleet.reset();
    projectileList.reset();
    fleet.createFleet(
      currLevel.shipCount,
      currLevel.shipVelocity,
      1,
      15,
      currLevel.projVelocity
    );
    this.controlsLocked = true;
    this.startAnimationsRunning = true;
    this.player.animationLock = true;
  }

  animate = () => {
    if (this.ctx) {
      this.requestID = requestAnimationFrame(this.animate);

      const msNow = performance.now();
      const msPassed = msNow - this.msPrev;

      if (msPassed < this.msPerFrame) return;

      const msExcess = msPassed % this.msPerFrame;
      this.msPrev = msNow - msExcess;

      if (!this.isPaused) {
        if (this.player && this.player.hit) {
          this.controlsLocked = true;
          this.player.hit = false;
          setTimeout(() => {
            this.player.animationLock = false;
            this.gameOver = true;
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
          this.controlsLocked = true;
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
              const explosion = new Explosion(invader.x, invader.y, true);
              explosionList.add(explosion);
              this.player.score += invader.scoreVal;
              projectileList.remove(projectile);
              fleet.destroyShip(invader);
              const invExplosion = new Audio(InvExplosion);
              invExplosion.play();
            } else if (hit && projectile.dy < 0)
              projectileList.remove(projectile);
            else return;
          });
          if (
            this.player &&
            detectCollision(projectile, this.player) &&
            !this.player.destroyed &&
            projectile.dy < 0
          ) {
            const explosion = new Explosion(
              this.player.x,
              this.player.y,
              false
            );
            explosionList.add(explosion);
            projectileList.remove(projectile);
            this.player.hit = true;
            this.player.destroyed = true;
            this.player.animationLock = true;
            const defExplosion = new Audio(DefExplosion);
            defExplosion.play();
          }
          projectile.update(this.ctx);
        });

        explosionList.arr.forEach((explosion) => {
          if (explosion.frame >= explosion.maxFrame)
            explosionList.remove(explosion);
          explosion.update(this.ctx);
        });
      }
    }
  };

  gameLoop() {
    this.levelStart();
    if (this.gameWon) {
      return;
    }
    this.animate();
    setTimeout(() => {
      this.controlsLocked = false;
      this.startAnimationsRunning = false;
      this.player.animationLock = false;
      fleet.arr.forEach((invader) => {
        invader.animationLock = false;
      });
    }, 3000);
  }

  gameRestart() {
    this.stop();
    this.level = 0;
    this.player.score = 0;
    this.player.destroyed = false;
    this.gameLoop();
  }

  stop() {
    if (this.ctx) {
      cancelAnimationFrame(this.requestID);
      this.player.reset();
      fleet.reset();
      projectileList.reset();
      this.ctx.clearRect(0, 0, innerWidth, innerHeight);
    }
  }

  togglePause = () => {
    this.isPaused = !this.isPaused;
  };
}
