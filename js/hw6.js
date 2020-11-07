// jQuery Validator for the input form
$(document).ready(function () {
  $(".form")
    .submit(function (e) {
      e.preventDefault();
      readInput();
    })
    // Validation rules
    .validate({
      rules: {
        xStartInput: {
          required: true,
          range: [-60, 60],
        },
        xEndInput: {
          required: true,
          range: [-60, 60],
          greaterThan: "#xStartInput",
        },
        yStartInput: {
          required: true,
          range: [-60, 60],
        },
        yEndInput: {
          required: true,
          range: [-60, 60],
          greaterThan: "#yStartInput",
        },
      },
      // Error messages
      messages: {
        xStartInput: {
          required: "Enter the starting x value.",
          range: "Must be between -60 to 60.",
        },
        xEndInput: {
          required: "Enter the ending x value.",
          range: "Must be between -60 to 60.",
        },
        yStartInput: {
          required: "Enter the starting y value.",
          range: "Must be between -60 to 60.",
        },
        yEndInput: {
          required: "Enter the ending y value.",
          range: "Must be between -60 to 60.",
        },
      },
    });
});

// Clear error messages upon pressing 'reset'
$("#resetButton").click(function () {
  $("label.error").hide();
  $(".error").removeClass("error");
});

// Check if starting value is greater than ending value
$.validator.addMethod(
  "greaterThan",
  function (value, element, param) {
    if (this.optional(element)) return true;
    var $otherElement = $(param);
    return parseInt(value, 10) >= parseInt($otherElement.val(), 10);
  },
  "Starting value needs to be smaller than ending value."
);

// Read input from form
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
  // 1. If one of the starting value is larger than the end, then do nothing
  if (xStart > xEnd || yStart > yEnd) {
    return;
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
