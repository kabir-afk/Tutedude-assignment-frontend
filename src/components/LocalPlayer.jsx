import { useTick, extend } from "@pixi/react";
import { useCallback, useEffect, useRef, useMemo } from "react";
import { TextStyle, Text, Container, Graphics } from "pixi.js";
import { useStore } from "../store";

extend({ Text, Container, Graphics });

const SPEED = 4;
const RADIUS = 35;
const WIDTH = 800;
const HEIGHT = 600;

export function LocalPlayer() {
  const user = useStore((state) => state.user);
  const socket = useStore((state) => state.socket);
  const pos = useRef({ x: WIDTH / 2, y: HEIGHT / 2 });
  const keys = useRef({});
  const containerRef = useRef(null);

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
    g.stroke({ color: "blue", width: 10 });
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
    socket.emit("move", { x, y });

    if (containerRef.current) {
      containerRef.current.x = x;
      containerRef.current.y = y;
    }
  });

  // useMemo prevents creating a new style object on every tick
  const textStyle = useMemo(
    () =>
      new TextStyle({
        align: "center",
        fontFamily: "Arial",
        fontSize: 15,
        fontWeight: "bold",
        fill: "#ffffff",
      }),
    [],
  );

  return (
    <pixiContainer ref={containerRef} x={WIDTH / 2} y={HEIGHT / 2}>
      <pixiGraphics draw={draw} />
      <pixiText text={user?.name} anchor={0.5} style={textStyle} />
    </pixiContainer>
  );
}
