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
    fixturesButton(fixtures, today());

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
        tableRow.style.backgroundColor = "white";
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

const fixturesButton = function(fixtures, date) {
const button = document.querySelector("#fixturesButton");
button.addEventListener("click", function() {
  displayFixtureList(fixtures, date);
})};

const displayFixtureList = function(fixtures, date) {
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

const fixturesByDay = function(fixtures, date) {
  games = [];
  for(let fixture of fixtures) {
    fixtureDate = new Date(fixture.date);
    if(datesMatch(date, fixtureDate)) {
      games.push(fixture);
    }
  }
  return games;
}

const createLi = function(text) {
  const li = document.createElement("li");
  li.innerText = text;
  return li;
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

// const createDateString = function(date) {
//   return `${date.getDay()} ${date.getMonth()} ${date.getYear()}`
// }

window.addEventListener('load', app);
