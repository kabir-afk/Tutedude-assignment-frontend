import { useTick } from "@pixi/react";
import { useCallback, useEffect, useRef } from "react";

const SPEED = 4;
const RADIUS = 24;
const WIDTH = 800;
const HEIGHT = 600;

export function Circle() {
  const pos = useRef({ x: WIDTH / 2, y: HEIGHT / 2 });
  const keys = useRef({});
  const gfxRef = useRef(null);

  useEffect(() => {
    const onDown = (e) => {
      keys.current[e.key.toLowerCase()] = true;
    };
    const onUp = (e) => {
      keys.current[e.key.toLowerCase()] = false;
    };
    window.addEventListener("keydown", onDown);
    window.addEventListener("keyup", onUp);
    return () => {
      window.removeEventListener("keydown", onDown);
      window.removeEventListener("keyup", onUp);
    };
  }, []);

  const draw = useCallback((g) => {
    g.clear();
    g.circle(0, 0, RADIUS);
    g.fill({ color: 0x6c63ff });
    g.circle(0, 0, RADIUS);
    g.stroke({ color: "white", width: 10 });
  }, []);

  useTick(() => {
    const k = keys.current;
    let { x, y } = pos.current;

    if (k["w"] || k["arrowup"]) y -= SPEED;
    if (k["s"] || k["arrowdown"]) y += SPEED;
    if (k["a"] || k["arrowleft"]) x -= SPEED;
    if (k["d"] || k["arrowright"]) x += SPEED;

    x = Math.max(RADIUS, Math.min(WIDTH - RADIUS, x));
    y = Math.max(RADIUS, Math.min(HEIGHT - RADIUS, y));

    pos.current = { x, y };

    if (gfxRef.current) {
      gfxRef.current.x = x;
      gfxRef.current.y = y;
    }
  });

  return <pixiGraphics ref={gfxRef} draw={draw} x={WIDTH / 2} y={HEIGHT / 2} />;
}
