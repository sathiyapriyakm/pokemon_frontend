import React,{useState} from "react";
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";


export default function Home(){

  const [battleId,setBattleId]=useState("");
  const navigate = useNavigate();
  
    return (
        <div className="home">
            <h1>PokeBattle!</h1>
            <div className="displayOption">
            <div className="options">
            <Button variant="contained" color="success" onClick={()=>{navigate("/battle")}}>New Game!</Button>
            </div>
            <div className="options">
                <input className="inputBox" type="text" placeholder='battle ID' onChange={(e)=>setBattleId(e.target.value)}></input>
            <Button variant="contained" color="warning" onClick={()=>{navigate(`/battle/${battleId}`)}} >Join Game!</Button>
            </div>
            </div>
        </div>  
    )

}
