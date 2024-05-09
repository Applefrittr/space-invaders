import { stars } from "./objects/stars";

function space() {
  let isPaused = false;
  let ctx: CanvasRenderingContext2D | null;

  const setContext = (context: CanvasRenderingContext2D | null) => {
    ctx = context;
  };

  const start = () => {
    stars.createStars(10);

    const animate = () => {
      requestAnimationFrame(animate);
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
