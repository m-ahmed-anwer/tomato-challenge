//Singleton class for score and heart

class Score {
  constructor() {
    if (!Score.instance) {
      this.score = 0;
      Score.instance = this;
    }
  }
  increaseScore() {
    this.score++;
  }
  getScore() {
    return this.score;
  }
  setScore(score) {
    this.score = score;
  }
}

class Heart {
  constructor() {
    if (!Heart.instance) {
      this.lives = 3;
      Heart.instance = this;
    }
  }
  decreaseLives() {
    this.lives--;
  }
  setLives() {
    this.lives = 3;
  }
}

export { Score, Heart };
