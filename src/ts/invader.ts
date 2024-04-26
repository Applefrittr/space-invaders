export class Invader {
  width: number;
  height: number;
  x: number;
  y: number;
  dx: number;
  dy: number;

  constructor(posX: number, posY: number, velX: number, velY: number) {
    this.width = 50;
    this.height = 50;
    this.x = posX;
    this.y = posY;
    this.dx = velX;
    this.dy = velY;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = "red";
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  update(ctx: CanvasRenderingContext2D) {
    this.draw(ctx);
    this.x -= this.dx;
    if (this.x <= 0) {
      this.dx = -this.dx;
      console.log("switch");
    }
    if (this.x >= window.innerWidth - this.width) {
      this.dx = -this.dx;
      console.log("switch");
    }
  }
}

export const invaderFactory = (count: number, velX: number, velY: number) => {
  const invaderArray: Invader[] = [];
  let posX = window.innerWidth - 75;
  let posY = 50;

  for (let i = 0; i < count; i++) {
    invaderArray.push(new Invader(posX, posY, velX, velY));
    posX -= 75;
  }

  return invaderArray;
};
