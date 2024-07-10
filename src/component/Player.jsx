import { useState } from 'react';
export default function Player({initialname,symbol,isActive,onChangeName})
{ 
  const[name,setName]=useState(initialname);
  const[isEditing,setIsEditing]=useState(false);
  function handleEditClick(){
    setIsEditing(!isEditing);
  }
  function handleChange(e){
    setName(e.target.value);
    if(isEditing){
    onChangeName(symbol,playerName);
  }}
  let playerName=<span className="player-name">{name}</span>;

  if(isEditing)
    {
      playerName=<input type="text" required value={name} onChange={handleChange} />;
    }
    return(
        <li className={isActive ? 'active' : 'undefined'}>
        <span className="player">
          {playerName}
          <span className="player-symbol">{symbol}</span>
        </span>
        <button onClick={handleEditClick}>{isEditing ? 'Save' : 'Edit'}</button>
      </li>
    );
}