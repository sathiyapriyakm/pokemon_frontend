import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import socketIOClient from "socket.io-client";
import { API } from "./global";

export const socket = socketIOClient(`${API}`);

export default function Home() {
  const [battleId, setBattleId] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    // socket.connect();
    socket.on("connect", async () => {
        // socket.emit("join", battleId ? battleId : randomstring.generate());
        console.log("connected in home component");
        });
  }, []);

  return (
    <div className="home">
      <h1>PokeBattle!</h1>
      <div className="displayOption">
        <div className="options">
          <Button
            variant="contained"
            color="success"
            onClick={() => {
              navigate("/battle");
            }}
          >
            New Game!
          </Button>
        </div>
        <div className="options">
          <input
            className="inputBox"
            type="text"
            placeholder="battle ID"
            onChange={(e) => setBattleId(e.target.value)}
          ></input>
          <Button
            variant="contained"
            color="warning"
            onClick={() => {
              navigate(`/battle/${battleId}`);
            }}
          >
            Join Game!
          </Button>
        </div>
      </div>
    </div>
  );
}
