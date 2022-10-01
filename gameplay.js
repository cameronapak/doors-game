const NUM_OF_DOORS = 100;

export class DoorsGame {
  static newGame() {
    console.log("newGame()");
    DoorsGame.isGameOver = false;
    DoorsGame.currentLevel = 1;
    DoorsGame.numOfDoors = NUM_OF_DOORS;
    DoorsGame.doors = [];
  }

  static playGame() {
    console.log("playGame()");
    DoorsGame.newGame();
    DoorsGame.doors = constructDoorsForLevel(1);
  }

  static setGameIsOver() {
    console.log("setGameIsOver()");
    DoorsGame.isGameOver = true;
    DoorsGame.doors = [];
  }

  static nextLevel() {
    console.log("nextLevel()");
    if (DoorsGame.isGameOver) {
      return;
    }
    DoorsGame.currentLevel = DoorsGame.currentLevel + 1;
    DoorsGame.doors = constructDoorsForLevel(DoorsGame.currentLevel);
  }
}

class Door {
  constructor({ isClickable }) {
    this.isClickable = isClickable || false;
    this.hasBeenClicked = false;
  }

  onClick() {
    if (!DoorsGame.isGameOver && this) {
      this.hasBeenClicked = true;
      Door.validateDoorClick(this);
    } else {
      // You cannot click...
    }
  }

  static validateDoorClick({ isClickable, hasBeenClicked }) {
    if (Boolean(!isClickable && hasBeenClicked)) {
      DoorsGame.setGameIsOver();
      console.log("GAME IS OVER");
    }
  }

  setIsClickable() {
    this.isClickable = true;
  }

  reset() {
    this.hasBeenClicked = false;
    this.isClickable = false;
  }
}

function isMultipleOf({ multiple, number }) {
  return Boolean(number % multiple === 0);
}

function constructDoorsForLevel(level = 1) {
  return Array(NUM_OF_DOORS)
    .fill()
    .map(
      (_, index) =>
        new Door({
          isClickable: isMultipleOf({ multiple: level, number: index + 1 })
        })
    );
}
