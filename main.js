'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let board = [];
let solution = '';
let letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

const printBoard = () =>  {
  for (let i = 0; i < board.length; i++) {
    console.log(board[i]);
  }
}

const generateSolution = () =>  {
  for (let i = 0; i < 4; i++) {
    const randomIndex = getRandomInt(0, letters.length);
    solution += letters[randomIndex];
  }
}

const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
}

const generateHint = (guess) =>  {
  
  let matchExact = 0
  let matchLoose = 0

  let guessy = guess.split('');
  let solvy = solution.split('');
  
  // loops through solution and guess arrays to check for equality at each index
  // if equal. solution element at that index = null
  // adds +1 per matchExact  
  solvy.forEach((e,i) => {
    if(e === guessy[i]){
      solvy[i] = null
      guessy[i] = null
      matchExact += 1
    }
  });
  console.log(solvy)
  console.log(guessy)
  // loops through remaining solution elements to check for matches in guess array. adds +1 for loose matches 
  solvy.forEach((e,i) => {
    if(guessy.indexOf(e) > -1 && guessy[i] != null)
    matchLoose += 1
  });
  
  // Concats and returns 
  let hint = matchExact + '-' + matchLoose
  
  return hint
}
// 
const mastermind = (guess) => {
  if( guess == solution){
    return 'You guessed it!'
  }
  else{
    board.push(guess + '-' + generateHint(guess));
  }
}


const getPrompt = () =>  {
  rl.question('guess: ', (guess) => {
    mastermind(guess);
    if(board.length === 10){
      return console.log('You ran out of turns! The solution was', solution)
    }
    printBoard();
    getPrompt();
  });
}

// Tests

if (typeof describe === 'function') {
  solution = 'abcd';
  describe('#mastermind()', () => {
    it('should register a guess and generate hints', () => {
      mastermind('aabb');
      assert.equal(board.length, 1);
    });
    it('should be able to detect a win', () => {
      assert.equal(mastermind(solution), 'You guessed it!');
    });
  });

  describe('#generateHint()', () => {
    it('should generate hints', () => {
      assert.equal(generateHint('abdc'), '2-2');
    });
    it('should generate hints if solution has duplicates', () => {
      assert.equal(generateHint('aabb'), '1-1');
    });

  });

} else {

  generateSolution();
  getPrompt();
}