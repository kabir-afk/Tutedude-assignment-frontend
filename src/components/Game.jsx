import { Application, extend } from "@pixi/react";
import { Graphics } from "pixi.js";
import { Circle } from "./Circle";

extend({ Graphics });

const WIDTH = 800;
const HEIGHT = 600;

export default function Game() {
  return (
    <Application
      width={WIDTH}
      height={HEIGHT}
      backgroundColor={0x111318}
      antialias
    >
      <Circle />
    </Application>
  );
}
