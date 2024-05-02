import { Invader } from "../classes/invader";

export const invaderFleet = () => {
  let arr: Invader[] = [];

  /** Create fleet formation of Invaders starting from the top right of the screen.  Count, velX , and VelY will be dynamically set by diffculty level.  Spacing is the
   * gaps between each Invader
   * @param count number of Invader ships
   * @param velX velocity along the X axis
   * @param velY velocity along the Y axis
   * @param spacing distance from an Invader's left border to an adjacent Invader's left border
   * @returns an array of Invader ships
   */
  const createFleet = (
    count: number,
    velX: number,
    velY: number,
    spacing: number
  ) => {
    const maxColumns = 20;
    const maxRow = Math.ceil(count / maxColumns);
    let posX = window.innerWidth - 50;
    let posY = 60;
    let currRow = 1;

    for (let i = 1; i <= count; i++) {
      let invader = new Invader(posX, posY * currRow, velX, velY);
      invader.setBounds(i, count, spacing, maxColumns, currRow, maxRow);
      arr.push(invader);
      if (Math.floor(i / maxColumns) === currRow) {
        currRow++;
        posX = window.innerWidth - 50;
      } else posX -= spacing;
    }
  };

  const destroyShip = (invader: Invader) => {
    invader.destroyed();
    const index = arr.indexOf(invader);
    if (index > -1) {
      arr.splice(index, 1);
    }
  };

  const reset = () => {
    arr.forEach((invader) => {
      invader.destroyed();
    });
    arr.length = 0;
  };

  return {
    arr,
    createFleet,
    destroyShip,
    reset,
  };
};

export const fleet = invaderFleet();
