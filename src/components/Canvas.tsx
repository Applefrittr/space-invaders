import { useEffect, useRef } from "react";
import { Game } from "../ts/game";
import { levelArray } from "../ts/objects/levels";
import { Defender } from "../ts/classes/defender";

function Canvas() {
  interface Event {
    key: string;
    repeat: boolean;
  }

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const player = new Defender();
  const game = new Game(player, levelArray, 0);

  const handleKeyDown = (e: Event) => {
    player.keyDown(e.key, e.repeat);
  };

  const handleKeyUp = (e: Event) => {
    player.keyUp(e.key);
  };

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      canvas.focus();

      game.setCanvas(canvas, ctx);
      game.start();
    }
    return () => {
      game.stop();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <canvas
      ref={canvasRef}
      tabIndex={0}
      width={innerWidth}
      height={innerHeight}
      onKeyUp={handleKeyUp}
      onKeyDown={handleKeyDown}
    ></canvas>
  );
}

export default Canvas;
