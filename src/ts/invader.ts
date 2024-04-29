export class Invader {
  width: number;
  height: number;
  x: number;
  y: number;
  dx: number;
  dy: number;
  bounds: {
    rightX: number;
    leftX: number;
  };

  constructor(posX: number, posY: number, velX: number, velY: number) {
    this.width = 50;
    this.height = 50;
    this.x = posX;
    this.y = posY;
    this.dx = velX;
    this.dy = velY;
    this.bounds = {
      rightX: innerWidth,
      leftX: 0,
    };
  }

  /**Set bounds of this Invader relative to it's position in fleet, critical to keep Invaders moving in formation */
  setBounds(currPos: number, fleetCount: number) {
    this.bounds.rightX = this.x;
    if (fleetCount >= 20) {
      this.bounds.leftX = 60 * 20 - 60 * (currPos + 1);
    } else this.bounds.leftX = 60 * fleetCount - 60 * (currPos + 1);
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = "red";
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  update(ctx: CanvasRenderingContext2D) {
    this.draw(ctx);
    this.x -= this.dx;
    if (this.x <= this.bounds.leftX) {
      this.dx = -this.dx;
      console.log("switch");
    }
    if (this.x >= this.bounds.rightX) {
      this.dx = -this.dx;
      console.log("switch");
    }
  }
}
