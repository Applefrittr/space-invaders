import { Projectile } from "./projectile";
import { projectileList } from "../objects/projectiles";
import InvaderSprite from "../../assets/sprites/invader.png";

const invaderSprite = new Image();
invaderSprite.src = InvaderSprite;

export class Invader {
  width: number = 60;
  height: number = 50;
  x: number;
  y: number;
  dx: number;
  dy: number;
  dyProj: number;
  frame: number = 0;
  fireInterval: number = (Math.random() * 7 + 1) * 60;
  bounds: {
    rightX: number;
    leftX: number;
  };
  scoreVal: number = 100;
  animationLock: boolean = true;
  sprite: CanvasImageSource = invaderSprite;

  constructor(
    posX: number,
    posY: number,
    velX: number,
    velY: number,
    velProj: number
  ) {
    this.x = posX;
    this.y = posY;
    this.dx = velX;
    this.dy = velY;
    this.dyProj = velProj;
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
    ctx.drawImage(this.sprite, this.x, this.y, this.width, this.height);
  }

  update(ctx: CanvasRenderingContext2D | null) {
    if (ctx) {
      this.draw(ctx);
      if (this.animationLock) return;
      this.x -= this.dx;
      this.frame++;
      if (this.x <= this.bounds.leftX) {
        this.dx = -this.dx;
      }
      if (this.x >= this.bounds.rightX) {
        this.dx = -this.dx;
      }
      if (this.frame >= this.fireInterval) {
        this.fire();
      }
    }
  }

  fire() {
    const bullet = new Projectile(
      this.x + this.width / 2,
      this.y + this.height + 15,
      this.dyProj,
      "#ff88c7"
    );
    projectileList.add(bullet);
    this.frame = 0;
  }
}
