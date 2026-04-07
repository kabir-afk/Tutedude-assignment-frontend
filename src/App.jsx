import { useEffect, useRef, useState } from "react";
import Game from "./components/Game";
import { connectWs } from "./ws";
import { axiosInstance } from "../axiosInstance";
import { useStore } from "./store";

function App() {
  const socket = useRef(null);
  const [input, setInput] = useState("");
  const isLoggedin = useStore((state) => state.isLoggedin);
  const login = useStore((state) => state.login);
  const logout = useStore((state) => state.logout);

  useEffect(() => {
    socket.current = connectWs();
  }, []);
  async function handleSubmit(e) {
    e.preventDefault();
    const res = await axiosInstance.post("/users", {
      username: input,
    });
    login(res.data);
  }
  return (
    <div className="">
      {!isLoggedin ? (
        <div>
          <form onSubmit={(e) => handleSubmit(e)}>
            <label htmlFor="username">Enter your name</label>
            <input
              type="text"
              name="username"
              id="username"
              placeholder="Your name (e.g. John Doe)"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button type="submit">submit</button>
          </form>
        </div>
      ) : (
        <div>
          <Game />
          <button onClick={() => logout()}>Exit</button>
        </div>
      )}
    </div>
  );
}

export default App;
