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

  /**Set X axis bounds of this Invader relative to it's position in fleet, critical to keep Invaders moving in formation
   * @param currPos Invader's postion relative to the fleet formation
   * @param fleetCount total number of ships in formation
   * @param spacing distance from an Invader's left border to an adjacent Invader's left border
   * @param maxColumns maximum Invaders ships in a formation row (default 20)
   * @param currRow current row in the fleet formation
   * @param maxRow maximum row in the fleet formation given the total number of ships
   */
  setBounds(
    currPos: number,
    fleetCount: number,
    spacing: number,
    maxColumns: number,
    currRow: number,
    maxRow: number
  ) {
    this.bounds.rightX = this.x;

    if (currRow <= 1)
      this.bounds.leftX =
        spacing * (fleetCount <= maxColumns ? fleetCount : maxColumns) -
        spacing * currPos;
    else if (currRow > 1 && currRow < maxRow) {
      this.bounds.leftX =
        spacing * maxColumns - spacing * (currPos - maxColumns * (currRow - 1));
    } else {
      this.bounds.leftX =
        spacing * (fleetCount - maxColumns * currRow) -
        spacing * (currPos - maxColumns * currRow);
    }
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
    }
    if (this.x >= this.bounds.rightX) {
      this.dx = -this.dx;
    }
  }
}
