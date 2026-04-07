import { useEffect, useRef, useState } from "react";
import Game from "./components/Game";
import { connectWs } from "./ws";
import { axiosInstance } from "../axiosInstance";

function App() {
  const socket = useRef(null);
  const [name, setName] = useState(null);
  const [input, setInput] = useState("");

  useEffect(() => {
    socket.current = connectWs();
  }, []);
  async function handleSubmit(e) {
    e.preventDefault();
    const res = await axiosInstance.post("/users", {
      username: input,
    });
    setName(input);
    console.log(res.data);
  }
  return (
    <div className="">
      {!name ? (
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
        <Game />
      )}
    </div>
  );
}

export default App;
