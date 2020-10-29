/* 
  File: ~/djrazmad/js/hw5.js
  COMP.4610 Assignment: Multiplication Table
  David Razmadze, UMass Lowell Computer Science, david_razmadze@student.uml.edu
  Brief Description: This page displays a multiplication table based on user input to the form.
  updated by DJR on October 29, 2020 at 7:00 PM
*/

function readInput() {
  // Read Form values
  var xStart = parseInt(document.getElementById("xStartInput").value);
  var xEnd = parseInt(document.getElementById("xEndInput").value);
  var yStart = parseInt(document.getElementById("yStartInput").value);
  var yEnd = parseInt(document.getElementById("yEndInput").value);

  // Clear error message
  document.getElementById("errorMessage").innerHTML = "";

  // If any of the inputs are zero, don't create the table
  if (xStart == "0" || xEnd == "0" || yStart == "0" || yEnd == "0") {
    document.getElementById("errorMessage").innerHTML =
      "Please enter a value other than 0 for your input.<br>";
    return;
  }

  // Swap values if start is greater than end
  if (xStart > xEnd) {
    var temp = xStart;
    xStart = xEnd;
    xEnd = temp;
    document.getElementById("errorMessage").innerHTML =
      "Swapping xStart and xEnd.<br>";
  }
  if (yStart > yEnd) {
    var temp = yStart;
    yStart = yEnd;
    yEnd = temp;
    document.getElementById("errorMessage").innerHTML +=
      "Swapping yStart and yEnd.<br>";
  }

  createTable(xStart, xEnd, yStart, yEnd);
}

function createTable(xStart, xEnd, yStart, yEnd) {
  var i, j;
  var table = "";

  // Create table
  for (j = yStart - 1; j <= yEnd; j++) {
    table += "<tr>";
    if (j == yStart - 1) {
      table += "<td></td>"; // empty cell
      for (i = xStart; i <= xEnd; i++) {
        table += "<td>" + i + "</td>";
      }
    } else {
      table += "<td>" + j + "</td>";
      for (i = xStart; i <= xEnd; i++) {
        table += "<td>" + i * j + "</td>";
      }
    }
    table += "</tr>";
  }

  // Insert table
  document.getElementById("multiplicationTable").innerHTML = table;
}

// Helper Functions

function resetInput() {
  document.getElementById("timesTableForm").reset();
  document.getElementById("errorMessage").innerHTML = "";
  var table = "";
  document.getElementById("multiplicationTable").innerHTML = table;
}

function showExampleTable() {
  createTable(1, 10, 1, 10);
}
