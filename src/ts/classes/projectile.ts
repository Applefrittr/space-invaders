import { projectileList } from "../objects/projectiles";
import DefProjectileSheet from "../../assets/sprites/defenderprojectilesheet.png";
import InvProjectileSheet from "../../assets/sprites/invaderprojectilesheet.png";

const defProjectileSprite = new Image();
defProjectileSprite.src = DefProjectileSheet;

const invProjectileSprite = new Image();
invProjectileSprite.src = InvProjectileSheet;

export class Projectile {
  sourceX: number = 0;
  sourceY: number = 0;
  width: number = 72;
  height: number = 72;
  canvasX: number;
  canvasY: number;
  radius: number = 10;
  dy: number;
  color: string | undefined;
  defprojectile: CanvasImageSource = defProjectileSprite;
  invprojectile: CanvasImageSource = invProjectileSprite;
  frame: number = 1;

  constructor(x: number, y: number, dy: number, color?: string) {
    this.canvasX = x;
    this.canvasY = y;
    this.dy = dy;
    this.color = color;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.globalCompositeOperation = "destination-over";
    ctx.drawImage(
      this.dy > 0 ? this.defprojectile : this.invprojectile,
      this.sourceX,
      this.sourceY,
      this.width,
      this.height,
      this.canvasX - this.width / 2 / 2,
      this.canvasY - this.height / 2 / 2,
      this.width / 2,
      this.height / 2
    );
  }

  update(ctx: CanvasRenderingContext2D | null) {
    if (ctx) {
      this.draw(ctx);
      this.frame++;
      this.canvasY -= this.dy;
      if (this.frame > 36) {
        this.sourceX = this.width * 2;
        this.frame = 1;
      } else {
        if (this.frame % 3 === 0) this.sourceX += this.width;
        this.frame++;
      }
      if (this.canvasY <= 0 || this.canvasY >= innerHeight)
        projectileList.remove(this);
    }
  }
}
