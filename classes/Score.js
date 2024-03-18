// Singleton class to keep track of the score

export class Score {
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
