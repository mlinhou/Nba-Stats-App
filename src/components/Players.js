

import axios from 'axios';
import React, { useState } from 'react';

function Players() {

  const [playerName, setPlayerName] = useState('');

  const [playerStats, setPlayerStats] = useState('');

  const [season, setSeason] = useState('');

  const [isSubmitted, setisSubmitted] = useState(false);
  
  var handleSubmit = (e) => {
    e.preventDefault();
    getPlayerId()
   
    setisSubmitted(true);
  }
  

  var handleChange = (event) => {
    const replace = event.target.value.split(" ").join("_");
    if(replace.length > 0){
      setPlayerName(replace)
    } else {
      alert("Please type player name!")
    }
  }

  var handleSeason = (event) => {
    const seas = event.target.value;
    setSeason(seas);
  }

  var getPlayerId = () => {
    axios.get(`https://www.balldontlie.io/api/v1/players?search=${playerName}`)
    .then(async res => {
      
      if(res.data.data[0] === undefined){
        alert("This player is either injured or hasn't played yet!")
      } else if(res.data.data.length > 1){
        alert("Please specify the name more!")
      } else {
        await getPlayerStats(res.data.data[0].id)
       
      }
     
    }).catch(err => {
      console.log(err)
    })
  }

  var getPlayerStats = (playerId) => {
    axios.get(`https://www.balldontlie.io/api/v1/season_averages?season=${season}&player_ids[]=${playerId}`)
    .then(async res => {
      
      setPlayerStats(res.data.data[0])

    }).catch(err => {
      console.log(err)
    })
  }

    return (
      <div className="App">
        <form onSubmit={handleSubmit}>
          <label data-testid="player-text">
            Name
            <input
            type="text"
            data-testid="input"
            onChange={handleChange}
            placeholder="please enter player name"
            />
          </label>
          <br />
          <label data-testid="season-text">
            Season
            <input 
            type="text"
            data-testid="season-input"
            onChange={handleSeason}
            placeholder="please enter a year"
            />
          </label>
          <input data-testid="submit-btn" type="submit" value="Submit"/>
        </form>
        <br/>
        
        

       {isSubmitted && 
        <h1>
        Games played: {playerStats["games_played"]}
        <br />
        Points averaged: {playerStats["pts"]}
        <br />
        Rebounds averaged: {playerStats["reb"]}
        <br />
        Assists averaged: {playerStats["ast"]}
      </h1>
       }
      </div>
    );
}


export default Players;
