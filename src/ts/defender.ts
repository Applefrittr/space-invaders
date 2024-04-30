import { Projectile } from "./projectile";
import { projectileList } from "./projectileArray";

export class Defender {
  width: number;
  height: number;
  x: number;
  y: number;
  dx: number;
  activeKey: { a: boolean; d: boolean; space: boolean };

  constructor() {
    this.width = 50;
    this.height = 50;
    this.x = window.innerWidth / 2 - this.width / 2;
    this.y = window.innerHeight - this.height - 20;
    this.dx = 10;
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

  keyDown(key: string) {
    switch (key) {
      case "d":
        this.activeKey.d = true;
        break;
      case "a":
        this.activeKey.a = true;
        break;
      case " ":
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
    console.log("FIRE!");
    const bullet = new Projectile(this.x + this.width / 2, this.y, 10, "green");
    projectileList.add(bullet);
  }

  update(ctx: CanvasRenderingContext2D) {
    // console.log("update");
    this.draw(ctx);
    if (!this.activeKey.a && !this.activeKey.d) return;
    if (this.activeKey.a && this.x >= 0) this.x -= this.dx;
    if (this.activeKey.d && this.x + this.width <= window.innerWidth)
      this.x += this.dx;
  }
}
