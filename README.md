# Virtual Cosmos — Multiplayer Canvas Demo


A small multiplayer demo built with React + Pixi.js and Socket.IO. Users enter a name, move a player avatar on a shared canvas, and chat with nearby players in real time. Here is the link to [backend](https://github.com/kabir-afk/Tutedude-assignment-backend) repository.

**Why this project is useful**

- Demonstrates real-time multiplayer interactions using `socket.io-client`.
- Shows how to render an interactive canvas with `pixi.js` inside a React app (`@pixi/react`).
- Lightweight state management using `zustand` and a minimal Vite setup for fast developer feedback.

**Quick demo features**

- Real-time player movement and presence
- Nearby player detection with direct chat
- Keyboard controls (WASD / Arrow keys)

**Prerequisites**

- Node.js (v16+ recommended)
- A running Socket.IO server exposing the expected events on `http://localhost:3000` (see Notes)

**Get started (developer)**

1. Install dependencies

```bash
npm install
```

2. Start the development server

```bash
npm run dev
```

3. Open http://localhost:5173 (Vite default) and enter a display name to join.

**Notes about the backend**

- This frontend expects a Socket.IO server at `http://localhost:3000` (see `src/ws.js`). The server should support (emit/listen):
  - emits: `existingPlayers`, `playerJoined`, `playerMove`, `nearbyPlayers`, `playerLeft`, `chat`
  - listens for: `move`, `chat`
- To point the client at another server, update the URL in [src/ws.js](src/ws.js).

**Usage / Controls**

- Enter your name on the sign-in screen.
- Use `W A S D` or arrow keys to move your avatar.
- When another player is nearby, a chat panel appears—type messages and press Send.

**Project structure (key files)**

- `src/App.jsx` — app shell and sign-in flow ([src/App.jsx](src/App.jsx))
- `src/components/Game.jsx` — Pixi `Application`, player list, and chat panel ([src/components/Game.jsx](src/components/Game.jsx))
- `src/components/LocalPlayer.jsx` — local player movement and rendering ([src/components/LocalPlayer.jsx](src/components/LocalPlayer.jsx))
- `src/components/RemotePlayer.jsx` — rendering of remote players ([src/components/RemotePlayer.jsx](src/components/RemotePlayer.jsx))
- `src/ws.js` — socket connection helper ([src/ws.js](src/ws.js))
- `src/store.js` — `zustand` store for auth and socket ([src/store.js](src/store.js))

**Scripts**

- `npm run dev` — start Vite dev server
- `npm run build` — build for production
- `npm run lint` — run ESLint

**Acknowledgements**

- Built with React, Vite, Pixi.js, Socket.IO, and Zustand.

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)
