import InvExpSheet from "../../assets/sprites/invaderexplosionsheet.png";
import DefExpSheet from "../../assets/sprites/defenderexplosionsheet.png";

const invaderExpSprite = new Image();
invaderExpSprite.src = InvExpSheet;

const defenderExpSprite = new Image();
defenderExpSprite.src = DefExpSheet;

export class Explosion {
  sourceX: number = 0;
  sourceY: number = 0;
  canvasX: number;
  canvasY: number;
  width: number = 100;
  height: number = 100;
  invSprite: CanvasImageSource = invaderExpSprite;
  defSprite: CanvasImageSource = defenderExpSprite;
  frame: number = 1;
  maxFrame: number = 91;
  useInvSprite: boolean;

  constructor(posX: number, posY: number, invaderExplosion: boolean) {
    this.canvasX = posX;
    this.canvasY = posY;
    this.useInvSprite = invaderExplosion;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.globalCompositeOperation = "source-over";
    ctx.drawImage(
      this.useInvSprite ? this.invSprite : this.defSprite,
      this.sourceX,
      this.sourceY,
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
      if (this.frame % 10 === 0) {
        this.sourceY += this.height;
        this.sourceX = 0;
      } else this.sourceX += this.width;
      this.frame++;
    }
  }
}
