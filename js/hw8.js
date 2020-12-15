/*
	File: ~/djrazmad/js/hw8.js
	COMP.4610 Assignment: One Line Scrabble
	David Razmadze, UMass Lowell Computer Science, david_razmadze@student.uml.edu
	Brief Description: This webpage simulates a shortened version of Scrabble.
	updated by DJR on December 15, 2020 at 11:00 AM
  
  Notes
  - Tiles data structure is located in 'js/hw8_tiles.js'
  - Graphics are located in 'images/scrabble'
  - Dictionary file is located in 'HW8/dictionary.txt'
 */

// *** Variables ***

var firstPlay = true;
var wordScore = 0;
var totalScore = 0;
var currentWord = "";
var currentWordArray = ["", "", "", "", "", "", ""];
var rackArray = ["false", "false", "false", "false", "false", "false", "false"];

// *** Ready function ("Main") ***

$(document).ready(function () {
  // Reset Stats
  $("#totalScore").text(0);
  $("#wordScore").text(0);

  // Rack - holds tiles with id of '#tile_'
  assignRackLetters();
  configureRackLetters();
  $("#tilesRemaining").text(calculateTilesRemaining());

  // Board - holds words with id of '#word_'
  assignBoardLetters();
  configureBoardLetters();

  // Additional functions
  submitPressed();
  resetPressed();
});
// *** Scrabble Elements ***

function assignRackLetters() {
  // If no more tiles remain, then game is over
  if (calculateTilesRemaining() <= 0) {
    alert("Game over");
    return;
  }

  // Get all of the pieces from 'tiles'
  var allPieces = [];
  for (var i = 0; i < 26; i++) {
    for (var j = 0; j < tiles[i].remaining; j++) {
      allPieces.push(tiles[i].letter);
    }
  }

  // Setup random tiles for rack
  const rack = $("#rack");
  const tileImgPath = "../../images/scrabble/tiles/";

  if (firstPlay) {
    for (i = 0; i < 7; i++) {
      // Get random letter from alphabet
      randomNum = Math.floor(Math.random() * allPieces.length);
      const randomCharacter = allPieces[randomNum];
      allPieces.splice(randomNum, 1);

      // Create new 'img' of a letter & append to the rack
      const newTile =
        '<img src="' +
        tileImgPath +
        randomCharacter +
        '.jpg" id="tile' +
        i +
        '" draggable="true" style="width: 83px; margin: 5px;"></img>';
      rack.append(newTile);

      // Decrement remanining count from 'tiles'
      const tileObject = tiles.find((x) => x.letter === randomCharacter);
      tileObject.remaining -= 1;
    }
    return;
  } else {
    // See if the rack tile has been played
    for (i = 0; i < 7; i++) {
      if (rackArray[i] == "true") {
        // Remove tile from the board
        $(`#tile${i}`).remove();

        // Get random letter from alphabet
        randomNum = Math.floor(Math.random() * allPieces.length);
        const randomCharacter = allPieces[randomNum];
        allPieces.splice(randomNum, 1);

        // Create new 'img' of a letter & append to the rack
        const newTile =
          '<img src="' +
          tileImgPath +
          randomCharacter +
          '.jpg" id="tile' +
          i +
          '" draggable="true" style="width: 83px; margin: 5px;"></img>';
        rack.append(newTile);

        // Decrement remanining count from 'tiles'
        const tileObject = tiles.find((x) => x.letter === randomCharacter);
        tileObject.remaining -= 1;
      } else {
        continue;
      }
    }
    // Reset rackArray
    rackArray = ["false", "false", "false", "false", "false", "false", "false"];
  }
}

function configureRackLetters() {
  for (i = 0; i < 7; i++) {
    const tile = `#tile${i}`;
    $(tile).draggable({
      revert: function (event, ui) {
        // Returns back to original position if not in 'board' or 'rack'
        // https://stackoverflow.com/a/5848800/14330947
        $(this).data("uiDraggable").originalPosition = {
          top: 0,
          left: 0,
        };
        return !event;
      },
    });
  }
}

function assignBoardLetters() {
  const board = $("#board");
  const scrabblePath = "../../images/scrabble/";

  for (i = 0; i < 7; i++) {
    // Append 'Double Word' tile
    if (i == 1 || i == 5) {
      const newTile =
        '<img src="' +
        scrabblePath +
        "Double_Word.png" +
        '" id="word' +
        i +
        '" draggable="true" style="width: 83px; margin: 5px;"></img>';
      board.append(newTile);
      continue;
    }

    // Append Blank tile
    const newTile =
      '<img src="' +
      scrabblePath +
      "Blank.jpg" +
      '" id="word' +
      i +
      '" draggable="true" style="width: 83px; margin: 5px;"></img>';
    board.append(newTile);
  }
}

function configureBoardLetters() {
  for (i = 0; i < 7; i++) {
    const word = `#word${i}`;
    // Configure jQuery for the new 'img'
    $(word).droppable({
      classes: {
        "ui-droppable-active": "ui-state-active",
        "ui-droppable-hover": "ui-state-hover",
      },
      drop: handleDropEvent,

      // Prevent multiple tiles to be dragged onto a board tile by using a class ('dropped')
      // https://stackoverflow.com/a/39774015/14330947
      accept: function (draggable) {
        if (!$(this).hasClass("dropped") || draggable.hasClass("dropped")) {
          return true;
        }
        return false;
      },
      out: function (_event, ui) {
        $(this).removeClass("dropped");
        ui.draggable.removeClass("dropped");
      },
    });
  }
}

function handleDropEvent(_event, ui) {
  const wordID = $(this).attr("id");
  const tileID = ui.draggable.attr("id");
  const tileImg = ui.draggable.attr("src");
  const rackID = ui.draggable.attr("id")[4];
  const letter = tileImg[28];
  const tileObject = tiles.find((x) => x.letter === letter);
  const letterValue = tileObject.value;

  // TODO: Check to see if elements are placed next to each other
  const boardIndex = wordID[4];
  currentWordArray[boardIndex] = letter;

  // Disable further dragging
  $(`#${tileID}`).draggable({ disabled: true });

  // Keep track of which rack tiles have been played in 'rackArray'
  rackArray[rackID] = "true";

  // Get letter from image and append to currentWord
  currentWord += letter;

  // Tally up score for tile
  wordScore += letterValue;
  $("#wordScore").text(wordScore);

  // Add class to indicate that element has been used
  $(this).addClass("dropped");
  ui.draggable.addClass("dropped");

  // Snap to the center of the board tile
  // https://stackoverflow.com/a/26764579/14330947
  ui.draggable.position({
    my: "center",
    at: "center",
    of: $(this),
    using: function (pos) {
      $(this).animate(pos, 100, "linear");
    },
  });
}

// *** Buttons ***

function submitPressed() {
  $("#submitButton").click(function () {
    // If board is empty, display an alert
    if (!currentWord) {
      alert(
        "No letters are on the board.\n\nPlease drag some tiles onto the board."
      );
      return;
    }

    // Check if word is valid
    if (!isValidWord()) {
      alert(
        `'${currentWord}' is not a word.\n\nPlease enter a valid English word.`
      );
      return;
    }

    firstPlay = false;

    // Remove the letters from board and rack
    $("#board").empty();
    assignBoardLetters();
    configureBoardLetters();
    assignRackLetters();
    configureRackLetters();

    //  Calculate bonus square multipliers
    calculateBonusTiles();
    totalScore += wordScore;
    console.log(totalScore);
    updateStats();
  });
}

function resetPressed() {
  $("#resetButton").click(function () {
    location.reload();
  });
}

// *** Helper Functions ***

function checkIfGraphicsExist() {
  // Each letter from 'tiles'
  tiles.forEach(function (tile) {
    $(".jumbotron").append(`<img id="theImg" src=${tile.src} />`);
  });

  // Blank Space
  $(".jumbotron").append(
    `<img id="theImg" src="../../images/scrabble/Blank.jpg" />`
  );

  // Double Letter
  $(".jumbotron").append(
    `<img id="theImg" src="../../images/scrabble/Double_Letter.png" />`
  );

  // Double Word
  $(".jumbotron").append(
    `<img id="theImg" src="../../images/scrabble/Double_Word.png" />`
  );

  // Tile Rack
  $(".jumbotron").append(
    `<img id="theImg" src="../../images/scrabble/Tile_Rack.png" />`
  );
}

function calculateTilesRemaining() {
  var tilesRemaining = 0;
  tiles.forEach(function (tile) {
    tilesRemaining += tile.remaining;
  });

  return tilesRemaining;
}

function calculateBonusTiles() {
  const firstBonus = currentWordArray[1];
  const secondBonus = currentWordArray[5];

  if (!(firstBonus === "")) {
    wordScore *= 2;
  }

  if (!(secondBonus === "")) {
    wordScore *= 2;
  }
}

function updateStats() {
  $("#totalScore").text(totalScore);
  $("#tilesRemaining").text(calculateTilesRemaining());
  currentWord = "";
  $("#wordScore").text(0);
  wordScore = 0;
}

// *** Extra Credit ***

function isValidWord() {
  // Case One letter words
  if (currentWord.length === 1) {
    if (currentWord === "A" || currentWord === "I") {
      return true;
    } else {
      return false;
    }
  }

  if (isValidWord.dict[currentWord]) {
    return true;
  } else {
    return false;
  }
}

isValidWord.dict = {};

// Get 'dictionary.txt' which was created from '/usr/share/dict/words'
$.ajax({
  url: "../HW8/dictionary.txt",
  success: function (dictionary) {
    const words = dictionary.split("\n");
    for (var i = 0; i < words.length; i++) {
      const word = words[i].toUpperCase();
      isValidWord.dict[word] = true;
    }
  },
});
