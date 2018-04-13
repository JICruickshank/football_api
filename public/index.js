const app = function(){
  const url = "http://api.football-data.org/v1/competitions/445/leagueTable";
  const request = new XMLHttpRequest();
  request.open("GET", url);
  request.setRequestHeader("X-Auth-Token", "ce59c6fd7c2d47c29fb4c133e01112d8");
  request.addEventListener("load", function() {
    const parsedTable = JSON.parse(request.responseText).standing;
    displayTable(parsedTable);
    displayTeamBadge();
  });
  request.send();
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

const displayTable = function(table) {
  const container = document.querySelector("#leagueTableDiv");
  const headers = ["", "Team", "P", "W", "D", "L", "F", "A", "Pts", "GD"];
  const leagueTable = createTable("leagueTable", headers);
  container.appendChild(leagueTable);
  // loop through each team, create a table row
  // loop through team stats, creating a cell and appending to table row
  // append row to table
  for(let team of table) {
    const tableRow = document.createElement("tr");
    tableRow.id = team.teamName;
    const teamStats = [team.position, team.teamName, team.playedGames, team.wins, team.draws, team.losses, team.goals, team.goalsAgainst, team.points, team.goalDifference];
    for(let stat of teamStats) {
      const cellData = document.createElement("td");
      cellData.innerText = stat;
      tableRow.appendChild(cellData);
    }
    leagueTable.appendChild(tableRow);
  }
  return leagueTable;
};

const displayTeamBadge = function() {
  const table = document.getElementById("leagueTable");
  debugger;
  table.addEventListener("onmouseover", function(event) {
    console.log(event);

  })
}

const createImage = function(url) {
  const img = document.createElement("img");
  img.src = url;
}

// const createPopUpBox = function(id, img) {
//   const container = document.getElementById("popUp");
//   const url =
//   container.appendChild(img);




  // }






window.addEventListener('load', app);
