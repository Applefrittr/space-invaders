import SpriteSheet from "../../assets/sprites/explosionsheet.png";

const explosionSprite = new Image();
explosionSprite.src = SpriteSheet;

export class Explosion {
  sourceX: number = 0;
  canvasX: number;
  canvasY: number;
  width: number = 75;
  height: number = 75;
  sprite: CanvasImageSource = explosionSprite;
  frame: number = 1;
  maxFrame: number = 30;

  constructor(posX: number, posY: number) {
    this.canvasX = posX;
    this.canvasY = posY;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.globalCompositeOperation = "source-over";
    ctx.drawImage(
      this.sprite,
      this.sourceX,
      0,
      this.width,
      this.height,
      this.canvasX - this.width / 2,
      this.canvasY - this.height / 2,
      this.width + 50,
      this.height + 50
    );
  }

  update(ctx: CanvasRenderingContext2D | null) {
    if (ctx) {
      this.draw(ctx);
      if (this.frame % 3 === 0) this.sourceX += this.width;
      this.frame++;
      if (this.sourceX >= 750) this.sourceX = 0;
    }
  }
}
