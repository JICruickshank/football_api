const key = config.key

const app = function(){
  const url = "http://api.football-data.org/v1/competitions/445/leagueTable";
  const request = new XMLHttpRequest();
  request.open("GET", url);
  request.setRequestHeader("X-Auth-Token", key);

  request.addEventListener("load", function() {
    const parsedTable = JSON.parse(request.responseText).standing;
    displayTable(parsedTable);
  });
  request.send();

  const urlFixtures = "http://api.football-data.org/v1/competitions/445/fixtures"
  const requestFixtures = new XMLHttpRequest();
  requestFixtures.open("GET", urlFixtures);
  requestFixtures.setRequestHeader("X-Auth-Token", key);

  requestFixtures.addEventListener("load", function() {
    const fixtures = JSON.parse(requestFixtures.responseText).fixtures;
    // fixturesButton(fixtures, today());
    getMatchData(fixtures);
    const fixturesOnUsersDate = function(callback) {

    }
    displayFixturesByUsersDate(fixtures);
    displayFixtureList(fixtures, today());
    google.charts.load("current", {"packages" :["corechart"]})
    const loadChart = function() {
      drawChart(getMatchData(fixtures));
    };
    google.charts.setOnLoadCallback(loadChart);
  });
  requestFixtures.send();
}


const createTable = function(id, headers) {
  const table = document.createElement("table");
  table.id = id;
  const headerRow = document.createElement("tr");
  table.appendChild(headerRow);
  for(let header of headers) {
    const tableHeader = document.createElement("th");
    tableHeader.innerText = header;
    headerRow.appendChild(tableHeader);
  }
  return table;
}


const createImage = function(url) {
  const image = document.createElement("img");
  image.src = url;
  return image;
}


const createLi = function(text) {
  const li = document.createElement("li");
  li.innerText = text;
  return li;
}



const displayTable = function(table) {
  const container = document.querySelector("#leagueTableDiv");
  const headers = ["", "", "P", "W", "D", "L", "F", "A", "Pts", "GD"];
  const leagueTable = createTable("leagueTable", headers);
  container.appendChild(leagueTable);
  // loop through each team, create a table row
  // loop through team stats, creating a cell and appending to table row
  // append row to table
  for(let team of table) {
    const tableRow = document.createElement("tr");
    tableRow.addEventListener("mouseover", function() {
        tableRow.style.backgroundColor = "hotpink";
      })
    tableRow.addEventListener("mouseout", function() {
        tableRow.style.backgroundColor = "beige";
      })
    const teamStats = [team.position, team.teamName, team.playedGames, team.wins, team.draws, team.losses, team.goals, team.goalsAgainst, team.points, team.goalDifference];
    for(let stat of teamStats) {
      const cellData = document.createElement("td");
      cellData.innerText = stat;
      tableRow.appendChild(cellData);
    }
    leagueTable.appendChild(tableRow);
  };
  return leagueTable;
}


const today = function() {
  const date = new Date();
  return date;
}


const datesMatch = function(date1, date2) {
  return (date1.getDate() === date2.getDate()) && (date1.getMonth() === date2.getMonth()) && (date1.getYear() === date2.getYear());
}


const displayFixturesByUsersDate = function(fixtures) {
  const button = document.querySelector("#submitDate");
  const input = document.querySelector("#userDate");
  button.addEventListener("click", function() {
    const date = new Date(input.value);
    debugger;
    displayFixtureList(fixtures, date);
  })
}


const fixturesByDay = function(fixtures, date) {
  debugger;
  games = [];
  for(let fixture of fixtures) {
    fixtureDate = new Date(fixture.date);
    if(datesMatch(date, fixtureDate)) {
      games.push(fixture);
    }
  }
  return games;
}


const createFixtureString = function(fixture) {
  const homeTeam = fixture.homeTeamName;
  const awayTeam = fixture.awayTeamName;
  const homeGoals = fixture.result.goalsHomeTeam;
  const awayGoals = fixture.result.goalsAwayTeam;
  let fixtureString = ""
  if(homeGoals === null) {
    fixtureString = `${homeTeam} v ${awayTeam}`
  }
  else {
    fixtureString = `${homeTeam} ${homeGoals} ${awayTeam} ${awayGoals}`
  }
  return fixtureString;
}


const displayFixtureList = function(fixtures, date) {
  debugger;
  const games = fixturesByDay(fixtures, date);
  const ul = document.createElement("ul");
  ul.innerText = date;
  for(let fixture of games) {
    const li = createLi(createFixtureString(fixture));
    ul.appendChild(li);
  }
  const container = document.querySelector("#fixtures");
  container.appendChild(ul);
return ul;
}


const fixturesButton = function(fixtures, date) {
const button = document.querySelector("#fixturesButton");
button.addEventListener("click", function() {
  displayFixtureList(fixtures, date);
})};


const goalsPerMatch = function(fixture) {
  const totalGoals = fixture.result.goalsHomeTeam + fixture.result.goalsAwayTeam;
  return totalGoals;
}


const getMatchData = function(fixtures) {
  const matchData = {
    "0 goals": 0,
    "1 goal": 0,
    "2 goals": 0,
    "3 goals": 0,
    "4 goals": 0,
    "5 goals": 0,
    "6 goals": 0,
    "over 6 goals": 0
  }
  const finishedGames = [];
  for(let fixture of fixtures) {
    if(fixture.result.goalsHomeTeam !== null) {
      finishedGames.push(fixture);
    }
  }
  for(let game of finishedGames) {
    if(goalsPerMatch(game) === 0) {
      matchData["0 goals"] += 1;
    }
    else if(goalsPerMatch(game) === 1) {
      matchData["1 goal"] += 1;
    }
    else if(goalsPerMatch(game) === 2) {
      matchData["2 goals"] += 1;
    }
    else if(goalsPerMatch(game) === 3) {
      matchData["3 goals"] += 1;
    }
    else if(goalsPerMatch(game) === 4) {
      matchData["4 goals"] += 1;
    }
    else if(goalsPerMatch(game) === 5) {
      matchData["5 goals"] += 1;
    }
    else if(goalsPerMatch(game) === 6) {
      matchData["6 goals"] += 1;
    }
    else if(goalsPerMatch(game) > 6) {
      matchData["over 6 goals"] += 1;
    }

  }


  const prepForChart = [];
  for(let dataKey in matchData) {
    const array = [];
    array.push(dataKey);
    array.push(matchData[dataKey]);
    prepForChart.push(array);
  }
  return prepForChart;
}


window.addEventListener('load', app);
