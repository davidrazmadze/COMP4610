const RANGE_START = -60;
const RANGE_END = 60;
// // // // // // // // // // // // // // //

// // // // // // // // // // // // // // //
//          Create Table
// // // // // // // // // // // // // // //

function submitForm() {
  // Clear table and error messages
  const table = "";
  document.getElementById("multiplicationTable").innerHTML = table;

  // Read Form values
  const xStart = parseInt(document.getElementById("xStartInput").value);
  const xEnd = parseInt(document.getElementById("xEndInput").value);
  const yStart = parseInt(document.getElementById("yStartInput").value);
  const yEnd = parseInt(document.getElementById("yEndInput").value);

  // Error checking
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

// // // // // // // // // // // // // // //
//             jQuery Validation
// // // // // // // // // // // // // // //

$(document).ready(function () {
  // Setup tabs
  var tabs = $("#tabs").tabs({ collapsible: true });
  closeSingleTab(tabs);
  closeAllTabs();

  // Error checking
  checkForInvalidCharacters();
  checkIfGreaterThan();
  clearErrorMessages();

  // Setup
  formValidation();
  setupAllSliders();
});

// // // // // // // // // // // // // // //
//             jQuery User Interface
// // // // // // // // // // // // // // //

function formValidation() {
  $(".form")
    .submit(function (e) {
      // Validate form before creating a new tab
      $(this).validate();
      if (!$(this).valid()) return false;

      // Grab table parameters
      xStart = $("#xStartInput").val();
      xEnd = $("#xEndInput").val();
      yStart = $("#yStartInput").val();
      yEnd = $("#yEndInput").val();

      // Tab header
      // Ex: [-1,1]x[-1,1]
      var tableHeader =
        "[" + xStart + "," + xEnd + "]x[" + yStart + "," + yEnd + "]";

      // See if tab has already been created
      if (document.getElementById(tableHeader)) {
        alert(
          "Table '" +
            tableHeader +
            "' already exists.\n\nTry updating the ranges in the form to create a new table."
        );
        return false;
      }

      // Grab current table element
      var multTable = document.getElementById("multiplicationTable").outerHTML;

      // Add new tab index as an 'li' element
      $("#tabs-list").append(
        '<li><a href="#' +
          tableHeader +
          '">' +
          tableHeader +
          "</a><span class='ui-icon ui-icon-close' role='presentation'>Remove Tab</span></li>"
      );

      // Add multiplication table as a 'div' element
      $("#tabs").append(
        '<div id="' +
          tableHeader +
          '">' +
          "<div class='myContainer'> <div class='container'> " +
          multTable +
          "</div> </div> </div>"
      );

      $("#tabs").tabs("refresh");
      e.preventDefault();
    })

    // Validation rules
    .validate({
      rules: {
        xStartInput: {
          required: true,
          range: [RANGE_START, RANGE_END],
        },
        xEndInput: {
          required: true,
          range: [RANGE_START, RANGE_END],
          greaterThan: "#xStartInput",
        },
        yStartInput: {
          required: true,
          range: [RANGE_START, RANGE_END],
        },
        yEndInput: {
          required: true,
          range: [RANGE_START, RANGE_END],
          greaterThan: "#yStartInput",
        },
      },

      // Form error messages
      messages: {
        xStartInput: {
          required: "Enter the starting x value.",
          range: "Must be between " + RANGE_START + " to " + RANGE_END + ".",
        },
        xEndInput: {
          required: "Enter the ending x value.",
          range: "Must be between " + RANGE_START + " to " + RANGE_END + ".",
        },
        yStartInput: {
          required: "Enter the starting y value.",
          range: "Must be between " + RANGE_START + " to " + RANGE_END + ".",
        },
        yEndInput: {
          required: "Enter the ending y value.",
          range: "Must be between " + RANGE_START + " to " + RANGE_END + ".",
        },
      },
    });
}

function checkIfGreaterThan() {
  $.validator.addMethod(
    "greaterThan",
    function (value, element, param) {
      if (this.optional(element)) return true;
      const $otherElement = $(param);
      return parseInt(value, 10) >= parseInt($otherElement.val(), 10);
    },
    "Starting value needs to be smaller than ending value."
  );
}

function clearErrorMessages() {
  // Clear error messages upon pressing 'reset'
  $("#resetButton").click(function () {
    $("label.error").hide();
    $(".error").removeClass("error");
  });
}

function setupAllSliders() {
  // Get all of IDs from sliders and input fields
  const allSliders = document.querySelectorAll("[id$='Slider']");
  const inputFields = document.querySelectorAll("input[type=number]");

  // If the lengths are not equal then something went wrong...
  if (allSliders.length == inputFields.length) {
    for (var i = 0; i < allSliders.length; i++) {
      sliderID = allSliders[i].id;
      inputID = inputFields[i].id;
      setupSlider(sliderID, inputID);
    }
  } else {
    console.log("Not equal");
  }
}

function setupSlider(sliderID, inputID) {
  sliderID = `#${sliderID}`;
  inputID = `#${inputID}`;

  // Setup slider with range and default value
  $(sliderID).slider({
    min: RANGE_START,
    max: RANGE_END,
    range: [RANGE_START, RANGE_END],
    value: 0,
    slide: function (event, ui) {
      $(inputID).val(ui.value);
      submitOnSliderChange();
    },
  });

  // What to do when the slider changes
  $(inputID).change(function () {
    const input_val = $(this).val();
    if (
      !isNaN(input_val) &&
      input_val <= RANGE_END &&
      input_val >= RANGE_START
    ) {
      $(sliderID).slider("value", input_val);
      submitOnSliderChange();
    }
  });
}

function closeAllTabs() {
  $("#closeAllTabsButton").click(function (e) {
    e.preventDefault();

    // Remove tabs
    $(".ui-tabs-tab").remove();

    // Remove divs in each tab
    const generatedDivs = document.querySelectorAll(".ui-tabs-panel");
    generatedDivs.forEach((div) => div.remove());
  });
}

function closeSingleTab(tabs) {
  tabs.on("click", "span.ui-icon-close", function () {
    // Remove tab
    const panelId = $(this).closest("li").remove().attr("aria-controls");

    // Remove div in that div
    const divId = document.getElementById(panelId);
    divId.remove();

    tabs.tabs("refresh");
  });
}

function submitOnSliderChange() {
  // Submit form when any of the 4 slider values changes
  const form_valid = $(".form").valid();
  if (form_valid) {
    submitForm();
  }
}

// // // // // // // // // // // // // // //
//             Helper Functions
// // // // // // // // // // // // // // //

function resetInput() {
  // Reset input and table
  document.getElementById("timesTableForm").reset();
  const table = "";
  document.getElementById("multiplicationTable").innerHTML = table;

  // Reset sliders to middle position of '0'
  const sliders = document.querySelectorAll(".ui-slider");
  sliders.forEach(function (element) {
    const sliderId = element.id;
    const $slider = $(`#${sliderId}`);
    $slider.slider("value", 0);
  });
}

function checkForInvalidCharacters() {
  const inputFields = document.querySelectorAll("input[type=number]");
  let invalidChars = ["+", "e", "."];

  inputFields.forEach(function (element) {
    element.addEventListener("keydown", function (e) {
      if (invalidChars.includes(e.key)) {
        e.preventDefault();
      }
    });
  });
}

