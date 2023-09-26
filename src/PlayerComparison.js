import BarChart from "./BarChart";
import axios from 'axios';
import React, { useState } from 'react';

function PlayerComparison() {
  const [playerName, setPlayerName] = useState('');

  const [playerStats, setPlayerStats] = useState('');

  const [season, setSeason] = useState('');

  const [playerData, setPlayerData] = useState(playerStats)

  const [playerName2, setPlayerName2] = useState('');

  const [playerStats2, setPlayerStats2] = useState('');

  const [season2, setSeason2] = useState('');

  const [playerData2, setPlayerData2] = useState(playerStats2)

  const [combinedPlayerData, setCombinedPlayerData] = useState('');



  const [isSubmitted, setisSubmitted] = useState(false);
  
  var handleCombiningData = () => {
      setCombinedPlayerData({
        labels: ["Points", "Rebounds", "Assists"],
        datasets: [{
          label: playerName,
          data: playerData
        },
        {
          label: playerName2,
          data: playerData2
        }
      ]
      })

  }
  var handleSubmit = (e) => {
    e.preventDefault();
    getPlayerId()
   
  }

  var handleSubmit2 = (e) => {
    e.preventDefault();
    getPlayerId2()
    handleCombiningData();
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

  var handleChange2 = (event) => {
    const replace = event.target.value.split(" ").join("_");
    if(replace.length > 0){
      setPlayerName2(replace)
    } else {
      alert("Please type player name!")
    }
  }

  var handleSeason = (event) => {
    const seas = event.target.value;
    setSeason(seas);
  }

  var handleSeason2 = (event) => {
    const seas = event.target.value;
    setSeason2(seas);
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

  var getPlayerId2 = () => {
    axios.get(`https://www.balldontlie.io/api/v1/players?search=${playerName2}`)
    .then(async res => {
      
      if(res.data.data[0] === undefined){
        alert("This player is either injured or hasn't played yet!")
      } else if(res.data.data.length > 1){
        alert("Please specify the name more!")
      } else {
        await getPlayerStats2(res.data.data[0].id)
       
      }
     
    }).catch(err => {
      console.log(err)
    })
  }

  var getPlayerStats = (playerId) => {
    axios.get(`https://www.balldontlie.io/api/v1/season_averages?season=${season}&player_ids[]=${playerId}`)
    .then(async res => {
      
      setPlayerStats(res.data.data[0])

      setPlayerData([res.data.data[0].pts, res.data.data[0].reb, res.data.data[0].ast])

    }).catch(err => {
      console.log(err)
    })
  }

  var getPlayerStats2 = (playerId) => {
    axios.get(`https://www.balldontlie.io/api/v1/season_averages?season=${season2}&player_ids[]=${playerId}`)
    .then(async res => {
      
      setPlayerStats2(res.data.data[0])

      setPlayerData2([res.data.data[0].pts, res.data.data[0].reb, res.data.data[0].ast])

    }).catch(err => {
      console.log(err)
    })
  }

  
  
    return (
      <div className="App">
        <form onSubmit={handleSubmit}>
          <label>
            Name
            <input
            type="text"
            
            onChange={handleChange}
            placeholder="please enter team name"
            />
          </label>
          <br />
          <label>
            Season
            <input 
            type="text"
            
            onChange={handleSeason}
            placeholder="please enter a year"
            />
          </label>
          <input type="submit" value="Submit"/>
        </form>
        
        Games played: {playerStats["games_played"]}
        <br />
        Points averaged: {playerStats["pts"]}
        <br />
        Rebounds averaged: {playerStats["reb"]}
        <br />
        Assists averaged: {playerStats["ast"]}
        
        {/* Stats for player number 2 */}
        <form onSubmit={handleSubmit2}>
          <label>
            Name
            <input
            type="text"
            
            onChange={handleChange2}
            placeholder="please enter team name"
            />
          </label>
          <br />
          <label>
            Season
            <input 
            type="text"
            
            onChange={handleSeason2}
            placeholder="please enter a year"
            />
          </label>
          <input type="submit" value="Submit"/>
        </form>
        Games played: {playerStats2["games_played"]}
        <br />
        Points averaged: {playerStats2["pts"]}
        <br />
        Rebounds averaged: {playerStats2["reb"]}
        <br />
        Assists averaged: {playerStats2["ast"]}

        {isSubmitted && 
        <BarChart chartData={combinedPlayerData}/>
       }
      </div>
    );

}

export default PlayerComparison;
