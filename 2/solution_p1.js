const fs = require('fs');

const getDataFromFile = () => {
  const path = `./input.txt`;
  console.log(`Reading: ${path}`);
  return fs.readFileSync(path, 'utf8');
};

const moves = ["Rock", "Paper", "Scissors"];
const moveScores = [1, 2, 3];
const opponentOptions = ["A", "B", "C"];
const myOptions = ["X", "Y", "Z"];

const winingScore = 6;
const drawScore = 3;
const losingScore = 0;

/**
 *
 * @param {string} option
 * @returns {string} move
 */
const getOpponentMove = (option) => moves[opponentOptions.indexOf(option)];
/**
 *
 * @param {string} option
 * @returns {string} move
 */
const getMyMove = (option) => moves[myOptions.indexOf(option)];

/**
 *
 * @param {string} opponentMove
 * @param {string} myMove
 * @returns {number} score
 */

const solve = (opponentMove, myMove) => {
  const myMoveIndex = moves.indexOf(myMove);
  const opponentMoveIndex = moves.indexOf(opponentMove);
  const moveScore = moveScores[myMoveIndex];
  if (opponentMove === myMove) return drawScore + moveScore;
  if(myMoveIndex === -1 || opponentMoveIndex === -1) {
    console.error(`Wrong move input ${opponentMove} - ${myMove}`);
    return -999999;
  }
  if (((myMoveIndex + 1) % 3) === opponentMoveIndex) return losingScore + moveScore;
  if (((myMoveIndex + 2) % 3) === opponentMoveIndex) return winingScore + moveScore;
  console.error(`Something went wrong... ${opponentMove} - ${myMove}`);
  return -999999;
}

const input = getDataFromFile();
const inputList = input.split("\r\n");
/**
 *
 * @type {{myMove: string, opponentMove: string}[]}
 */
const formattedInputs = inputList.map((moves) => {
  moves = moves.split(" ");
  return ({
    opponentMove: getOpponentMove(moves[0]),
    myMove: getMyMove(moves[1])
  })
})

let points = 0;

formattedInputs.forEach(input => {
  points += solve(input.opponentMove, input.myMove);
})

console.log(`Result: ${points}`);
