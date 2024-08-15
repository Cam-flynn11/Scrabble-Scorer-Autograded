// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system.

const input = require("readline-sync");

const oldPointStructure = {
  1: ["A", "E", "I", "O", "U", "L", "N", "R", "S", "T"],
  2: ["D", "G"],
  3: ["B", "C", "M", "P"],
  4: ["F", "H", "V", "W", "Y"],
  5: ["K"],
  8: ["J", "X"],
  10: ["Q", "Z"],
};

function oldScrabbleScorer(word) {
  word = word.toUpperCase();
  let letterPoints = "";

  for (let i = 0; i < word.length; i++) {
    for (const pointValue in oldPointStructure) {
      if (oldPointStructure[pointValue].includes(word[i])) {
        letterPoints += `Points for '${word[i]}': ${pointValue}\n`;
      }
    }
  }
  return letterPoints;
}

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {
  console.log("Let's play some scrabble!");

  let chosenWord = input.question("Enter a word: ");
  // console.log(simpleScorer(chosenWord));

  return chosenWord;
}

let newPointStructure = transform(oldPointStructure);

let simpleScorer = function (word) {
  word = word.toUpperCase();
  let letterScore = 0;
  for (let index = 0; index < word.length; index++) {
    letterScore += 1;
  }
  return letterScore;
};

let vowelBonusScorer = function (word) {
  word = word.toUpperCase();
  let vowels = ["A", "E", "I", "O", "U"];
  let letterScore = 0;
  for (let index = 0; index < word.length; index++) {
    if (vowels.includes(word[index])) {
      letterScore += 3;
    } else {
      letterScore += 1;
    }
  }
  return letterScore;
};

// TODO: Read the instruction. You will be using newPointStructure from line 41 here.
let scrabbleScorer = function (word) {
  let points = 0;
  for (let index = 0; index < word.length; index++) {
    points += newPointStructure[word[index]];
  }
  return points;
};

const scoringAlgorithms = [
  {
    name: "Simple",
    description: "Each letter is worth 1 point.",
    scorerFunction: simpleScorer,
  },
  {
    name: "Bonus Vowel",
    description: "Vowels are 3 pts, consonants are 1 pt.",
    scorerFunction: vowelBonusScorer,
  },
  {
    name: "Scrabble",
    description: "The traditional scoring algorithm.",
    // TODO: Once scrabbleScorer is done, replace oldScrabbleScorer here with scrabbleScorer.
    scorerFunction: scrabbleScorer,
  },
];

function scorerPrompt() {
  console.log("Which scoring algorithm would you like to use?");
  console.log(
    "0 - " +
      scoringAlgorithms[0].name +
      ": " +
      scoringAlgorithms[0].description +
      "\n",
    "1 - " +
      scoringAlgorithms[1].name +
      ": " +
      scoringAlgorithms[1].description +
      "\n",
    "2 - " + scoringAlgorithms[2].name + ": " + scoringAlgorithms[2].description
  );

  let chosenNum = input.question("Enter 0, 1, or 2: ");
  return chosenNum;
}

// {
//   1: ["A", "E", "I", "O", "U", "L", "N", "R", "S", "T"],
//   2: ["D", "G"],
//   3: ["B", "C", "M", "P"],
//   4: ["F", "H", "V", "W", "Y"],
//   5: ["K"],
//   8: ["J", "X"],
//   10: ["Q", "Z"],
// };

function transform(oldPointStructure) {
  let newLetterPoint = {};

  for (lineKey in oldPointStructure) {
    let pointvalueOneArray = oldPointStructure[lineKey];

    for (let index = 0; index < pointvalueOneArray.length; index++) {
      newLetterPoint[pointvalueOneArray[index].toLowerCase()] = Number(lineKey);
    }
  }
  return newLetterPoint;
}

function runProgram() {
  let retrieveInput = initialPrompt();
  let answers = scorerPrompt();
  let scorerFunction = scoringAlgorithms[answers].scorerFunction;
  console.log(scorerFunction(retrieveInput));
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
  initialPrompt: initialPrompt,
  transform: transform,
  oldPointStructure: oldPointStructure,
  simpleScorer: simpleScorer,
  vowelBonusScorer: vowelBonusScorer,
  scrabbleScorer: scrabbleScorer,
  scoringAlgorithms: scoringAlgorithms,
  newPointStructure: newPointStructure,
  runProgram: runProgram,
  scorerPrompt: scorerPrompt,
};
