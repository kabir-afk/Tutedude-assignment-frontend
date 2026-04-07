import { Application, extend } from "@pixi/react";
import { Graphics } from "pixi.js";
import { useEffect, useState, useRef } from "react";
import { useStore } from "../store";
import { RemotePlayer } from "./Remoteplayer";
import { LocalPlayer } from "./LocalPlayer";

extend({ Graphics });

const WIDTH = 800;
const HEIGHT = 600;

export default function Game() {
  const [players, setPlayers] = useState({});
  const [messages, setMessages] = useState([]);
  const [__nearbyCount, setNearbyCount] = useState(0);
  const [mainPartner, setMainPartner] = useState(null);

  const socket = useStore((state) => state.socket);

  useEffect(() => {
    if (!socket) return;

    socket.on("existingPlayers", (list) => {
      const map = {};
      list.forEach((p) => (map[p.id] = { x: p.x, y: p.y }));
      setPlayers(map);
    });

    socket.on("playerJoined", ({ id, x, y }) => {
      setPlayers((prev) => ({ ...prev, [id]: { x, y } }));
    });

    socket.on("playerMove", ({ id, x, y }) => {
      setPlayers((prev) => ({ ...prev, [id]: { x, y } }));
    });

    socket.on("nearbyPlayers", (nearbyList) => {
      setNearbyCount(nearbyList.length);
      setMainPartner(nearbyList[0] || null);
      if (nearbyList.length === 0) setMessages([]);
    });

    socket.on("playerLeft", ({ id }) => {
      setPlayers((prev) => {
        const copy = { ...prev };
        delete copy[id];
        return copy;
      });
    });

    socket.on("chat", ({ from, message }) => {
      setMessages((prev) => [...prev, { from, message }]);
    });

    return () => {
      socket.off("existingPlayers");
      socket.off("playerJoined");
      socket.off("playerMove");
      socket.off("nearbyPlayers");
      socket.off("playerLeft");
      socket.off("chat");
    };
  }, [socket]);

  return (
    <div className="flex gap-5 items-start">
      <div className="rounded-xl overflow-hidden border border-indigo-900/50 shadow-[0_0_40px_rgba(99,102,241,0.1)]">
        <Application
          width={WIDTH}
          height={HEIGHT}
          backgroundColor={0x080c14}
          antialias
        >
          <LocalPlayer />
          {Object.entries(players).map(([id, pos]) => (
            <RemotePlayer key={id} x={pos.x} y={pos.y} name={id} />
          ))}
        </Application>
      </div>

      {mainPartner && (
        <div
          className="flex flex-col rounded-xl border border-indigo-900/50 bg-[#0a1020] p-4 shadow-[0_0_40px_rgba(99,102,241,0.1)]"
          style={{ width: 300, height: HEIGHT }}
        >
          <ChatBox messages={messages} socket={socket} partner={mainPartner} />
        </div>
      )}
    </div>
  );
}

function ChatBox({ messages, socket, partner }) {
  const [input, setInput] = useState("");
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    socket.emit("chat", { message: input });
    setInput("");
  };

  return (
    <>
      <div className="text-center mb-4 pb-4 border-b border-indigo-900/40">
        <div className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-linear-to-br from-indigo-500 to-purple-500 text-white text-sm font-bold mb-2 shadow-md shadow-indigo-500/30">
          {partner?.[0]?.toUpperCase()}
        </div>
        <p className="text-indigo-300/50 text-xs">
          Start of your chat with{" "}
          <span className="text-indigo-300 font-semibold">{partner}</span>
        </p>
      </div>

      <div className="flex-1 overflow-y-auto pr-1 space-y-3 scrollbar-thin">
        {messages.map((m, i) => (
          <div key={i} className="text-sm">
            <span className="text-indigo-400 font-semibold">{m.from}: </span>
            <span className="text-slate-300">{m.message}</span>
          </div>
        ))}
        <div ref={endRef} />
      </div>

      <form onSubmit={send} className="mt-4 flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Message..."
          className="flex-1 bg-[#080c14] border border-indigo-900/60 text-white text-sm placeholder-indigo-400/30 px-3 py-2 rounded-lg focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/40 transition-all"
        />
        <button
          type="submit"
          className="px-4 py-2 rounded-lg text-sm font-semibold text-white bg-linear-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 active:scale-95 transition-all shadow-md shadow-indigo-900/50 cursor-pointer"
        >
          Send
        </button>
      </form>
    </>
  );
}
