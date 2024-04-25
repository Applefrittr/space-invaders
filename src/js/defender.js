export function defender() {
  const dimensions = {
    width: 50,
    height: 50,
  };

  const position = {
    x: window.innerWidth / 2 - dimensions.width / 2,
    y: window.innerHeight - dimensions.height - 20,
  };

  const keysPressed = {
    a: false,
    d: false,
    space: false,
  };

  const draw = (ctx) => {
    ctx.fillRect(position.x, position.y, dimensions.width, dimensions.height);
  };

  const keysDown = (key) => {
    switch (key) {
      case "d":
        keysPressed.d = true;
        break;
      case "a":
        keysPressed.a = true;
        break;
      case " ":
        keysPressed.space = true;
        break;
      default:
        return;
    }
  };

  const keysUp = (key) => {
    switch (key) {
      case "d":
        keysPressed.d = false;
        break;
      case "a":
        keysPressed.a = false;
        break;
      case " ":
        keysPressed.space = false;
        break;
      default:
        return;
    }
  };

  const updateDefender = (ctx) => {
    draw(ctx);
    if (!keysPressed.a && !keysPressed.d && !keysPressed.space) return;
    if (keysPressed.a && position.x >= 0) position.x -= 10;
    if (keysPressed.d && position.x + dimensions.width <= window.innerWidth)
      position.x += 10;
    if (keysPressed.space) console.log("space");
  };

  return {
    keysDown,
    keysUp,
    updateDefender,
  };
}
