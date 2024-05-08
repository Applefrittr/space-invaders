export class Star {
  width: number = 5;
  height: number = 5;
  x: number;
  y: number;
  dy: number;

  constructor(posX: number, posY: number, velY: number) {
    this.x = posX;
    this.y = posY;
    this.dy = velY;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = "white";
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  update(ctx: CanvasRenderingContext2D | null) {
    if (ctx) {
      this.draw(ctx);
      this.y += this.dy;
    }
  }
}
