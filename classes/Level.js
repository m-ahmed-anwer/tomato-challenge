// Singleton class to keep track of the score,level,timer

export class Level {
  constructor() {
    if (!Level.instance) {
      this.level = 1;
      this.score = 0;
      Level.instance = this;
    }
  }

  getLevel() {
    return this.level;
  }

  resetLevel() {
    this.level = 1;
  }

  increaseScore() {
    this.score++;
    this.updateLevel();
  }

  getScore() {
    return this.score;
  }

  setScore(score) {
    this.score = score;
    this.updateLevel();
  }

  updateLevel() {
    const newLevel = Math.min(Math.floor(this.score / 5) + 1, 3);
    if (newLevel > this.level) {
      this.level = newLevel;
    }
  }

  getTimerDuration() {
    let baseDuration = 60; // 60 seconds

    switch (this.level) {
      case 1:
        baseDuration = 60; // 60 seconds
        break;
      case 2:
        baseDuration = 45; // 45 seconds
        break;
      case 3:
        baseDuration = 30; // 30 seconds
        break;
      default:
        baseDuration = 60; // Default to 60 seconds
        break;
    }

    return baseDuration;
  }
}
