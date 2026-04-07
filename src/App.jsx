import { useEffect, useState } from "react";
import Game from "./components/Game";
import { connectWs } from "./ws";
import { useStore } from "./store";

function App() {
  const [input, setInput] = useState("");
  const { isLoggedin, user, login, logout, setSocket } = useStore();

  useEffect(() => {
    if (!user) return;
    const socketInstance = connectWs(user.name);
    setSocket(socketInstance);
  }, [user, setSocket]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    login({ name: input });
  };

  return (
    <div className="min-h-screen bg-[#080c14] flex justify-center items-center font-sans">
      {!isLoggedin ? (
        <div className="text-center bg-linear-to-b from-[#0f1729] to-[#0a1020] p-10 rounded-2xl border border-indigo-900/50 shadow-[0_0_60px_rgba(99,102,241,0.15)] w-full max-w-sm mx-4">
          <div className="flex justify-center mb-5">
            <div className="w-16 h-16 rounded-full bg-linear-to-br from-indigo-500 via-purple-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-indigo-500/30">
              <span className="text-2xl">🌌</span>
            </div>
          </div>

          <h1 className="text-2xl font-bold text-white mb-1 tracking-wide">
            Virtual Cosmos
          </h1>
          <p className="text-indigo-300/70 text-sm mb-8">
            Enter your name and start interacting
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <input
              type="text"
              placeholder="Your name"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="px-4 py-3 rounded-lg bg-[#0d1117] border border-indigo-800/60 text-white placeholder-indigo-400/40 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/50 transition-all"
            />
            <button
              type="submit"
              className="py-3 rounded-lg font-semibold text-white bg-linear-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 active:scale-95 transition-all shadow-md shadow-indigo-900/50 cursor-pointer"
            >
              Enter
            </button>
          </form>
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <Game />
          <button
            onClick={() => logout()}
            className="mt-6 px-5 py-2 rounded-lg text-sm font-medium text-rose-400 border border-rose-500/50 hover:bg-rose-500/10 active:scale-95 transition-all cursor-pointer"
          >
            Exit Game
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
