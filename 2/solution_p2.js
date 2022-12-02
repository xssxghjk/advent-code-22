const fs = require('fs');

const getDataFromFile = () => {
  const path = `./input.txt`;
  console.log(`Reading: ${path}`);
  return fs.readFileSync(path, 'utf8');
};

const moves = ["Rock", "Paper", "Scissors"];
const moveScores = [1, 2, 3];
const opponentOptions = ["A", "B", "C"];
const resultOptions = ["X", "Y", "Z"];

const resultIndexAlgoMap = {
  0: 1,
  1: 0,
  2: 2
}

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
 * @returns {string} myMove
 * @param opponentOption
 * @param result
 */
const getMyMove = (opponentOption, result) => {
  const opponentMove = getOpponentMove(opponentOption);
  const opponentMoveIndex = moves.indexOf(opponentMove);
  const resultIndex = resultOptions.indexOf(result);
  const indexAdjustment = resultIndexAlgoMap[resultIndex];
  let myMoveIndex = (opponentMoveIndex - indexAdjustment);
  // can't "% 3" with negative numbers :<, let's hack our problems away
  if (myMoveIndex === -1) myMoveIndex = 2;
  if (myMoveIndex === -2) myMoveIndex = 1;
  return moves[myMoveIndex];
};

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
const formattedInputs = inputList.map((matchDetails) => {
  matchDetails = matchDetails.split(" ");
  return ({
    opponentMove: getOpponentMove(matchDetails[0]),
    myMove: getMyMove(matchDetails[0], matchDetails[1])
  })
})

let points = 0;

formattedInputs.forEach(input => {
  points += solve(input.opponentMove, input.myMove);
})

console.log(`Result: ${points}`);
