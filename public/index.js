const key = config.key;

const app = function(){
  const url = "http://api.football-data.org/v1/competitions/445/leagueTable";
  const request = new XMLHttpRequest();
  request.open("GET", url);
  request.setRequestHeader("X-Auth-Token", key);
  debugger;
  request.addEventListener("load", function() {
    const parsedTable = JSON.parse(request.responseText).standing;
    debugger;
    displayTable(parsedTable);

  });
  request.send();
}

const createTable = function(id, headers) {
  const table = document.createElement("table");
  table.id = id;
  const headerRow = document.createElement("tr");
  table.appendChild(headerRow);
  debugger;
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
  debugger;
  container.appendChild(leagueTable);
  // loop through each team, create a table row
  // loop through team stats, creating a cell and appending to table row
  // append row to table
  for(let team of table) {
    const tableRow = document.createElement("tr");
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




window.addEventListener('load', app);
