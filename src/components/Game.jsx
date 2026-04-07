import { Application, extend } from "@pixi/react";
import { Graphics } from "pixi.js";
import { useEffect, useState } from "react";
import { useStore } from "../store";
import { RemotePlayer } from "./Remoteplayer";
import { LocalPlayer } from "./LocalPlayer";

extend({ Graphics });

const WIDTH = 800;
const HEIGHT = 600;

export default function Game() {
  const [players, setPlayers] = useState({});
  const socket = useStore((state) => state.socket);
  useEffect(() => {
    if (!socket) return;

    socket.on("playerMove", ({ id, x, y }) => {
      setPlayers((prev) => ({ ...prev, [id]: { x, y } }));
      console.log("Received:", id, x, y);
    });

    return () => {
      socket.off("playerMove");
    };
  }, [socket]);

  return (
    <Application
      width={WIDTH}
      height={HEIGHT}
      backgroundColor={0x111318}
      antialias
    >
      <LocalPlayer />
      {Object.entries(players).map(([id, pos]) => (
        <RemotePlayer key={id} x={pos.x} y={pos.y} />
      ))}
    </Application>
  );
}
