/*
	File: ~/djrazmad/js/hw8_tiles.js
	COMP.4610 Assignment: Multiplication Table
	David Razmadze, UMass Lowell Computer Science, david_razmadze@student.uml.edu
	Brief Description: This webpage simulates a shortened version of Scrabble.
	updated by DJR on December 15, 2020 at 11:00 AM
*/

// Letter tiles data structure
const tiles = [
  {
    letter: "A",
    value: 1,
    amount: 9,
    remaining: 9,
    src: "../../images/scrabble/tiles/A.jpg",
  },
  {
    letter: "B",
    value: 3,
    amount: 2,
    remaining: 2,
    src: "../../images/scrabble/tiles/B.jpg",
  },
  {
    letter: "C",
    value: 3,
    amount: 2,
    remaining: 2,
    src: "../../images/scrabble/tiles/C.jpg",
  },
  {
    letter: "D",
    value: 2,
    amount: 4,
    remaining: 4,
    src: "../../images/scrabble/tiles/D.jpg",
  },
  {
    letter: "E",
    value: 1,
    amount: 12,
    remaining: 12,
    src: "../../images/scrabble/tiles/E.jpg",
  },
  {
    letter: "F",
    value: 4,
    amount: 2,
    remaining: 2,
    src: "../../images/scrabble/tiles/F.jpg",
  },
  {
    letter: "G",
    value: 2,
    amount: 3,
    remaining: 3,
    src: "../../images/scrabble/tiles/G.jpg",
  },
  {
    letter: "H",
    value: 4,
    amount: 2,
    remaining: 2,
    src: "../../images/scrabble/tiles/H.jpg",
  },
  {
    letter: "I",
    value: 1,
    amount: 9,
    remaining: 9,
    src: "../../images/scrabble/tiles/I.jpg",
  },
  {
    letter: "J",
    value: 8,
    amount: 1,
    remaining: 1,
    src: "../../images/scrabble/tiles/J.jpg",
  },
  {
    letter: "K",
    value: 5,
    amount: 1,
    remaining: 1,
    src: "../../images/scrabble/tiles/K.jpg",
  },
  {
    letter: "L",
    value: 1,
    amount: 4,
    remaining: 4,
    src: "../../images/scrabble/tiles/L.jpg",
  },
  {
    letter: "M",
    value: 3,
    amount: 2,
    remaining: 2,
    src: "../../images/scrabble/tiles/M.jpg",
  },
  {
    letter: "N",
    value: 1,
    amount: 6,
    remaining: 6,
    src: "../../images/scrabble/tiles/N.jpg",
  },
  {
    letter: "O",
    value: 1,
    amount: 8,
    remaining: 8,
    src: "../../images/scrabble/tiles/O.jpg",
  },
  {
    letter: "P",
    value: 3,
    amount: 2,
    remaining: 2,
    src: "../../images/scrabble/tiles/P.jpg",
  },
  {
    letter: "Q",
    value: 10,
    amount: 1,
    remaining: 1,
    src: "../../images/scrabble/tiles/Q.jpg",
  },
  {
    letter: "R",
    value: 1,
    amount: 6,
    remaining: 6,
    src: "../../images/scrabble/tiles/R.jpg",
  },
  {
    letter: "S",
    value: 1,
    amount: 4,
    remaining: 4,
    src: "../../images/scrabble/tiles/S.jpg",
  },
  {
    letter: "T",
    value: 1,
    amount: 6,
    remaining: 6,
    src: "../../images/scrabble/tiles/T.jpg",
  },
  {
    letter: "U",
    value: 1,
    amount: 4,
    remaining: 4,
    src: "../../images/scrabble/tiles/U.jpg",
  },
  {
    letter: "V",
    value: 4,
    amount: 2,
    remaining: 2,
    src: "../../images/scrabble/tiles/V.jpg",
  },
  {
    letter: "W",
    value: 4,
    amount: 2,
    remaining: 2,
    src: "../../images/scrabble/tiles/W.jpg",
  },
  {
    letter: "X",
    value: 8,
    amount: 1,
    remaining: 1,
    src: "../../images/scrabble/tiles/X.jpg",
  },
  {
    letter: "Y",
    value: 4,
    amount: 2,
    remaining: 2,
    src: "../../images/scrabble/tiles/Y.jpg",
  },
  {
    letter: "Z",
    value: 10,
    amount: 1,
    remaining: 1,
    src: "../../images/scrabble/tiles/Z.jpg",
  },
];

