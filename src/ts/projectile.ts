import { projectileList } from "./projectileArray";

export class Projectile {
  width: number;
  height: number;
  x: number;
  y: number;
  radius: number;
  dy: number;
  color: string;

  constructor(x: number, y: number, dy: number, color: string) {
    this.width = 5;
    this.height = 5;
    this.x = x;
    this.y = y;
    this.radius = 10;
    this.dy = dy;
    this.color = color;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y + this.height, this.radius, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.fill();
  }

  update(ctx: CanvasRenderingContext2D) {
    this.draw(ctx);
    this.y -= this.dy;
    if (this.y <= 0 || this.y >= innerHeight) projectileList.remove(this);
  }
}
