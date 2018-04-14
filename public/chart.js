const drawChart = function(dataToChart) {
  const data = new google.visualization.DataTable();
  data.addColumn("string", "Goals Per Match");
  data.addColumn("number", "Total");
  data.addRows(dataToChart);
  const options = {
    "title": "Goals Per Match",
    "width": 500,
    "height": 500
  }
  const chart = new google.visualization.PieChart(document.getElementById("chart"));
  chart.draw(data, options);
}
