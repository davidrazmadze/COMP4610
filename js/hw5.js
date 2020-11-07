/* 
  File: ~/djrazmad/js/hw5.js
  COMP.4610 Assignment: Multiplication Table
  David Razmadze, UMass Lowell Computer Science, david_razmadze@student.uml.edu
  Brief Description: This page displays a multiplication table based on user input to the form.
  updated by DJR on October 29, 2020 at 7:00 PM
*/

function readInput() {
  // Clear table and error messages
  var table = "";
  document.getElementById("multiplicationTable").innerHTML = table;
  document.getElementById("errorMessage").innerHTML = "";

  // Read Form values
  var xStart = parseInt(document.getElementById("xStartInput").value);
  var xEnd = parseInt(document.getElementById("xEndInput").value);
  var yStart = parseInt(document.getElementById("yStartInput").value);
  var yEnd = parseInt(document.getElementById("yEndInput").value);

  //////////////// Check for errors ////////////////
  // 1. Check for values greater than 60
  if (xStart > 60 || xEnd > 60 || yStart > 60 || yEnd > 60) {
    document.getElementById("errorMessage").innerHTML =
      "One or more of the values exceeds the limit.<br>Please make sure the values are between -60 and 60.";
    return;
  }

  // 2. Check for values less than -60
  if (xStart < -60 || xEnd < -60 || yStart < -60 || yEnd < -60) {
    document.getElementById("errorMessage").innerHTML =
      "One or more of the values exceeds the limit.<br>Please make sure the values are between -60 and 60.";
    return;
  }

  // 3.Swap values if start is greater than end
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

// Keyboard input error checking

var xStartInput = document.getElementById("xStartInput");
var xEndInput = document.getElementById("xEndInput");
var yStartInput = document.getElementById("yStartInput");
var yEndInput = document.getElementById("yEndInput");
var inputArray = [xStartInput, xEndInput, yStartInput, yEndInput];

// Check for invalid characters
var invalidChars = ["+", "e", "."];
inputArray.forEach(function (element) {
  element.addEventListener("keydown", function (e) {
    if (invalidChars.includes(e.key)) {
      e.preventDefault();
    }
  });
});
