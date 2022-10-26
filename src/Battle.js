import React,{useState,useEffect} from "react";
import { useNavigate,useParams} from "react-router-dom";
import { API } from "./global";
import socketIOClient from "socket.io-client";
import randomstring from "randomstring";
import { Button } from "@mui/material";

const socket=socketIOClient(`${API}`,{autoconnect:false});

export default function Battle(){
    const {battleId}=useParams()|| null;
    const [battle,setBattle]=useState({
        _id:null,
        playerOne:{
            pokemon:{}
        },
        playerTwo:{
            pokemon:{}
        }
    });
    const [pokemon,setPokemon]=useState([]);
  const getPokemon=()=>{
    fetch(`${API}/pokemon`,{
      method:"GET", }
    )
    .then((data)=>{
      return data.json()})
    .then((poke)=>setPokemon(poke))
    }  
  useEffect(()=>{
      getPokemon();
      socket.connect();
      socket.on("connect",async()=>{
          socket.emit("join",battleId ? battleId: randomstring.generate())
      })
      socket.on("refresh",(battle)=>{
          setBattle(battle);
      })

    },[]);
  
 
    return (
        <div className="battle">
        <h1>PokeBattle!</h1>
        <h2>Battle Id:{battle._id}</h2>
        {(!battle.playerOne.pokemon._id || !battle.playerTwo.pokemon._id) &&
         <SelectPoke battle={battle} pokemon={pokemon}/> }
        {(battle.playerOne.pokemon._id && battle.playerTwo.pokemon._id) &&
         <BattleStage battle={battle}/> }
         {(battle.playerOne.pokemon.hp <=0 || battle.playerTwo.pokemon.hp <=0) &&
         <VictoryStage battle={battle}/> }
         
    </div>  
    )

}

function SelectPoke({battle,pokemon}){

    return(
        <div className="displayOption">
        <div className="options">
        <h2>Player 1</h2>
        <div className="pokewrap">
        {
            pokemon && pokemon.map((mon)=>(
                <div key={mon._id}  onClick={()=>socket.emit("select",1,mon)} style={{background:battle.playerOne.pokemon._id===mon._id ? " lightgreen":" none"}} >
                <img src={mon.image} className="pokeimg" alt={mon.name}/>
                <h2>{mon.name}</h2>
                </div>
            ))
        }
        </div>
        </div>
        <div className="options">
        <h2>Player 2</h2>
        <div className="pokewrap">
        {
            pokemon && pokemon.map((mon)=>(
                <div key={mon._id} style={{background:battle.playerTwo.pokemon._id===mon._id ? " lightgreen":" none"}} onClick={()=>socket.emit("select",2,mon)} >
<img src={mon.image} className="pokeimg" alt={mon.name}/>
<h2>{mon.name}</h2>

                </div>
            ))
        }
        </div>
        </div>
        </div>
    )
}

function BattleStage({battle}){


    return(
        <div>
           
            <h1> Fight !!!</h1>
        <div className="displayOption_battle"> 
        <div className="options">
        <h2 style={{color:"green"}}>Player 1</h2>
        <img src={battle.playerOne.pokemon.image} className="pokeimg" alt={battle.playerOne.pokemon.name}></img>
        <h2>{battle.playerOne.pokemon.name}</h2>
        <h2>HP: {battle.playerOne.pokemon.hp}</h2>
        <h2>PP: {battle.playerOne.pokemon.pp}</h2>
         <div className="pokewrap_battle">
        {
            battle.playerOne.pokemon ? battle.playerOne.pokemon.moves.map((move)=>(
                <div key={move.name}  onClick={()=>socket.emit("attack",1,move)} >
                <h2 className="battle_move">{move.name} ({move.pp})</h2>
                </div>
            )):<></>
        }
       
        </div> 
        </div> 
        <div className="options">
        <h2 style={{color:"green"}}>Player 2</h2>
        <img src={battle.playerTwo.pokemon.image} className="pokeimg" alt={battle.playerOne.pokemon.name}></img>
        <h2>{battle.playerTwo.pokemon.name}</h2>
        <h2>HP: {battle.playerTwo.pokemon.hp}</h2>
        <h2>PP: {battle.playerTwo.pokemon.pp}</h2>
        <div className="pokewrap_battle">
        {
            battle.playerTwo.pokemon && battle.playerTwo.pokemon.moves.map((move)=>(
                <div key={move.name}  onClick={()=>socket.emit("attack",2,move)} >
                <h2 className="battle_move">{move.name} ({move.pp})</h2>
                </div>
            ))
        }
        </div>
       </div>
        </div> 
        </div>
    )
}

function VictoryStage({battle}){
    const navigate=useNavigate();
    return (
        <div className="victoryScreen">
            {battle.playerOne.pokemon.hp <=0 &&
            <div>
                <img className="" src={battle.playerTwo.pokemon.image}></img>
                <h1 className=""> Player Two Wins!!!</h1>
            </div>

            }
             {battle.playerTwo.pokemon.hp <=0 &&
            <div>
                <img className="" src={battle.playerOne.pokemon.image}></img>
                <h1 className=""> Player One Wins!!!</h1>
            </div>

            }
            <div>
            <Button variant="contained" color="warning" onClick={()=>{navigate(`/`)}} >Play Again !</Button>
            </div>


        </div>
    )
}
