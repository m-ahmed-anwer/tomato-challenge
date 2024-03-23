// Singleton class to keep track of the score,level,timer

export class Level {
  constructor() {
    if (!Level.instance) {
      this.level = 1;
      this.score = 0;
      this.lives = 3;
      Level.instance = this;
    }
  }
  decreaseLives() {
    this.lives--;
  }

  getLevel() {
    return this.level;
  }

  reset() {
    this.level = 1;
    this.lives = 3;
    this.score = 0;
    this.updateLevel();
  }

  increaseScore() {
    this.score++;
    this.updateLevel();
  }

  getScore() {
    return this.score;
  }

  updateLevel() {
    const newLevel = Math.min(Math.floor(this.score / 5) + 1, 3);
    if (newLevel > this.level) {
      this.level = newLevel;
    }
  }

  getTimerDuration() {
    let baseDuration = 60; 

    switch (this.level) {
      case 1:
        baseDuration = 60;
        break;
      case 2:
        baseDuration = 45;
        break;
      case 3:
        baseDuration = 30;
        break;
      default:
        baseDuration = 60;
        break;
    }

    return baseDuration;
  }
}
