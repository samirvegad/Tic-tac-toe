import { useState } from "react";
import Player from "./component/Player";
import GameBoard from "./component/GameBoard";
import Log from "./component/Log";
import GameOver from "./component/GameOver.jsx";
import { WINNING_COMBINATIONS } from "./Winning.js";

const initialGameBoard = [
  [null,null,null],
  [null,null,null],
  [null,null,null],
];

function derivedActivePlayer(gameBoard){
  let currentPlayer = 'X';
  if(gameBoard.length > 0 && gameBoard[0].player === 'X')
    {
      currentPlayer = 'O';
    }
    return currentPlayer;
}
function App() {
  const [players,setPlayers] = useState({
    X:'Player 1',
    O:'Player 2',
  });
  const[gameTurns,setGameTurns]=useState([]);
 // const[activePlayer,setActiveplayer]=useState('X');
 const activePlayer = derivedActivePlayer(gameTurns);
 let gameBoard = [...initialGameBoard.map(array =>[...array])];

 for (const turn of gameTurns){
     const {square,player}=turn;
     const{row,col}=square;
     gameBoard[row][col]=player;
 }
 let winner;
 for(const combination of WINNING_COMBINATIONS) {
  const firsrSquareSymbol=gameBoard[combination[0].row][combination[0].column];
  const secondSquareSymbol=gameBoard[combination[1].row][combination[1].column];
  const thirdSquareSumbol=gameBoard[combination[2].row][combination[2].column];

  if(firsrSquareSymbol && 
    firsrSquareSymbol === secondSquareSymbol && 
    firsrSquareSymbol === thirdSquareSumbol)
    {
      winner =players[ firsrSquareSymbol];
    }
 }
 
 const hasDraw = gameTurns.length === 9 && !winner; 
  function handleSelectSquare(rowIndex,colIndex){
   // setActiveplayer((curActivePlayer)=> curActivePlayer === 'X' ? 'O' : 'X');
    setGameTurns((prevTurns)=> {
      const currentPlayer = derivedActivePlayer(prevTurns);
      const updatedTurns = [
        {square:{row: rowIndex,col: colIndex},player: currentPlayer}, ...prevTurns,
      ];
      return updatedTurns;
    });
  }

  function handleRestart (){
    setGameTurns([]);
  }
  function handlePlayerNameChange(symbol,newName){
    setPlayers(prevPlayers => {
      return{
        ...prevPlayers,
        [symbol]: newName
      };
    });
  }
  return (
   <main>
    <div id="game-container">
      <ol id="players" className="highlight-player">
       <Player initialname="Playeer 1" symbol="X" isActive={activePlayer === 'X'} onChangeName={handlePlayerNameChange}/>
       <Player initialname="Playeer 2" symbol="O" isActive={activePlayer === 'O'} onChangeName={handlePlayerNameChange}/>
      </ol>
      {(winner || hasDraw) &&(<GameOver winner={winner} onRestart={handleRestart}/>)}
      <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard}/>
    </div>
    <Log turns={gameTurns}/>
   </main>
  );
}

export default App
