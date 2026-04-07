import { useCallback, useEffect, useRef } from "react";
import { Container, Graphics, Text } from "pixi.js";
import { extend } from "@pixi/react";

extend({ Container, Graphics, Text });

export function RemotePlayer({ x, y, name }) {
  const containerRef = useRef(null);

  const draw = useCallback((g) => {
    g.clear();
    g.circle(0, 0, 35);
    g.fill({ color: 0xff4d4d });
  }, []);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.x = x;
      containerRef.current.y = y;
    }
  }, [x, y]);

  return (
    <pixiContainer ref={containerRef} x={x} y={y}>
      <pixiGraphics draw={draw} />
      <pixiText text={name} anchor={0.5} />
    </pixiContainer>
  );
}
