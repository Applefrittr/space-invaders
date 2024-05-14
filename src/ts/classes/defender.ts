import { Projectile } from "./projectile";
import { projectileList } from "../objects/projectiles";
import { flyOutGen } from "../utils/defenderAnimations";

export class Defender {
  width: number = 50;
  height: number = 50;
  x: number = window.innerWidth / 2 - this.width / 2;
  y: number = window.innerHeight - this.height - 20;
  dx: number = 10;
  activeKey: { a: boolean; d: boolean; space: boolean };
  hit: boolean = false;
  hps: number = 3;
  score: number = 0;
  lvlWon: boolean = false;
  flyOut = flyOutGen();
  animationLock: boolean = false;

  constructor() {
    this.activeKey = {
      a: false,
      d: false,
      space: false,
    };
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = "blue";
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  keyDown(key: string, repeat: boolean) {
    switch (key) {
      case "d":
        this.activeKey.d = true;
        break;
      case "a":
        this.activeKey.a = true;
        break;
      case " ":
        if (repeat || this.animationLock) return;
        this.fire();
        break;
      default:
        return;
    }
  }

  keyUp(key: string) {
    switch (key) {
      case "d":
        this.activeKey.d = false;
        break;
      case "a":
        this.activeKey.a = false;
        break;
      default:
        return;
    }
  }

  fire() {
    const bullet = new Projectile(
      this.x + this.width / 2,
      this.y - 20,
      10,
      "green"
    );
    projectileList.add(bullet);
  }

  reset() {
    this.x = window.innerWidth / 2 - this.width / 2;
    this.y = window.innerHeight - this.height - 20;
  }

  animateFlyOut() {
    if (this.flyOut.next().done) {
      this.y += -20;
    } else {
      const dy: number = this.flyOut.next().value;
      this.y += dy;
    }
  }

  update(ctx: CanvasRenderingContext2D) {
    // console.log("update");
    this.draw(ctx);
    if (this.animationLock) return;
    if (this.lvlWon) {
      this.animateFlyOut();
      if (this.y + this.height <= 0) {
        this.flyOut = flyOutGen();
      }
      return;
    }
    if (!this.activeKey.a && !this.activeKey.d) return;
    if (this.activeKey.a && this.x >= 0) this.x -= this.dx;
    if (this.activeKey.d && this.x + this.width <= window.innerWidth)
      this.x += this.dx;
  }
}
