const app = function(){
  const url = "http://api.football-data.org/v1/competitions/445/leagueTable";
  const request = new XMLHttpRequest();
  request.open("GET", url);
  request.setRequestHeader("X-Auth-Token", "ce59c6fd7c2d47c29fb4c133e01112d8");
  request.addEventListener("load", function() {
    const leagueTable = JSON.parse(request.responseText).standing;
    displayTable();
    createTable();
  });
  request.send();
}

const createTable = function(id) {
  const table = document.createElement("table");
  table.id = id;
  return table;

}


const displayTable = function() {
  const container = document.querySelector("#leagueTableDiv");
  const leagueTable = createTable("leagueTable");
  debugger;
  container.appendChild(leagueTable);

  }

window.addEventListener('load', app);
