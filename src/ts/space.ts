import { stars } from "./objects/stars";

function space() {
  let isPaused: boolean = false;
  let ctx: CanvasRenderingContext2D | null;
  let msPrev: number = performance.now();
  const fps: number = 60;
  const msPerFrame: number = 1000 / fps;

  const setContext = (context: CanvasRenderingContext2D | null) => {
    ctx = context;
  };

  const start = () => {
    stars.createStars(20);

    const animate = () => {
      requestAnimationFrame(animate);

      const msNow = performance.now();
      const msPassed = msNow - msPrev;

      //console.log(msPassed);

      if (msPassed < msPerFrame) return;

      const msExcess = msPassed % msPerFrame;
      msPrev = msNow - msExcess;

      if (!isPaused && ctx) {
        ctx.clearRect(0, 0, innerWidth, innerHeight);

        stars.arr.forEach((star) => {
          star.update(ctx);
          if (star.y >= innerHeight) {
            stars.remove(star);
            setTimeout(() => {
              stars.add();
            }, 250);
          }
        });
      }
    };
    animate();
  };

  const pause = () => {
    isPaused = !isPaused;
  };

  return {
    setContext,
    start,
    pause,
  };
}

export const spaceCanvas = space();
