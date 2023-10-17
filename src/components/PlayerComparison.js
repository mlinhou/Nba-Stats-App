import BarChart from "./BarChart";
import axios from 'axios';
import React, { useEffect, useState } from 'react';

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


  var handleSubmit = async (e) => {
    e.preventDefault();
    getPlayerId()
    getPlayerId2()
    setisSubmitted(true);
    console.log(combinedPlayerData)
   
  }
  //fixes the bug where you had to click submit twice for data to show up
  useEffect(() => {
    handleCombiningData();
  }, [playerData, playerData2])

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

  var capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  
  
    return (
      <div className="App">
        
        <br/>
        <form onSubmit={handleSubmit}>
          <label>
            Name
            <input
            type="text"
            
            onChange={handleChange}
            placeholder="please enter player 1 name"
            />
          </label>
          {"\t"}
          <label>
            Season
            <input 
            type="text"
            
            onChange={handleSeason}
            placeholder="please enter a year"
            />
          </label>
          <br/>
          <label>
            Name
            <input
            type="text"
            
            onChange={handleChange2}
            placeholder="please enter player 2 name"
            />
          </label>
          {"\t"}
          <label>
            Season
            <input 
            type="text"
            
            onChange={handleSeason2}
            placeholder="please enter a year"
            />
          </label>
          <br/>
          <br/>
          <input type="submit" value="Submit"/>
        </form>
        
        {isSubmitted &&
        <div style={{display: 'flex', justifyContent: 'center'}}>
          <div style={{margin: '15px'}}>
            <h1>{capitalize(playerName)}{" "}{season}</h1>
            
              Games: {playerStats["games_played"]}
              <br />
              Points: {playerStats["pts"]}
              <br />
              Rebounds: {playerStats["reb"]}
              <br />
              Assists: {playerStats["ast"]}
          </div>
          <div style={{margin: '15px'}}>
            <h1>{capitalize(playerName2)}{" "}{season2}</h1>
              Games: {playerStats2["games_played"]}
              <br />
              Points: {playerStats2["pts"]}
              <br />
              Rebounds: {playerStats2["reb"]}
              <br />
              Assists: {playerStats2["ast"]}
          </div>
      </div>
        }
        
        {isSubmitted && 
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '500px',
          margin: '50px'
        }}>   
          <BarChart chartData={combinedPlayerData}/>
        </div>
        
       }
       
      </div>
    );

}

export default PlayerComparison;
