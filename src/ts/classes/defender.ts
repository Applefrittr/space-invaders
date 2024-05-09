import { Projectile } from "./projectile";
import { projectileList } from "../objects/projectiles";

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
        if (repeat) return;
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
    const bullet = new Projectile(
      this.x + this.width / 2,
      this.y - 20,
      10,
      "green"
    );
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
