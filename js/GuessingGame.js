function generateWinningNumber() {
  // returns a random number from 1 through 100, not including 100
  // if 0, return 1
  // Math.floor(Math.random() * 100 + 1);
  var r = Math.floor( Math.random() * 100 );
  return r + 1;
}

function shuffle(arr) {
  var currentIndex = arr.length;
  var temp;
  var randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor( Math.random() * currentIndex );
    currentIndex = currentIndex - 1;
    temp = arr[currentIndex];
    arr[currentIndex] = arr[randomIndex];
    arr[randomIndex] = temp;
  }
  return arr;
}



function Game() {
  this.playersGuess = null;
  this.pastGuesses = [];
  this.winningNumber = generateWinningNumber();
}

Game.prototype.difference = function() {
  return Math.abs(this.playersGuess - this.winningNumber);
}

// this isn't used?
Game.prototype.isLower = function() {
  return this.playersGuess < this.winningNumber;
}

Game.prototype.playersGuessSubmission = function(guess) {
  if (guess < 1 || guess > 100 || typeof guess !== "number") {
    // invalid guess
    throw "That is an invalid guess.";
  }
  this.playersGuess = guess;
  return this.checkGuess();
}

Game.prototype.checkGuess = function() {
  var difference = this.difference();
  if (this.playersGuess === this.winningNumber) {
    return "You Win!";
  }
  else if (this.pastGuesses.indexOf(this.playersGuess) > -1) {
    return "You have already guessed that number.";
  }
  else {
    // guess is not the winning number or a repeat guess
    this.pastGuesses.push(this.playersGuess);
    if (this.pastGuesses.length === 5) {
      return "You Lose.";
    }
    else {
      // not at fifth guess yet
      // return hints
      if (difference < 10) {
        return "You're burning up!";
      }
      else if (difference < 25) {
        return "You're lukewarm.";
      }
      else if (difference < 50) {
        return "You're a bit chilly.";
      }
      else {
        // difference is above 50 but less than 100
        return "You're ice cold!";
      }
    }
  }
}

function newGame() {
  return new Game();
}

Game.prototype.provideHint = function () {
  // generateWinningNumber are two random numbers, this.winningNumber is the winning number
  var hints = shuffle([generateWinningNumber(), generateWinningNumber(), this.winningNumber]);
  return hints;
};

var game = new Game();
