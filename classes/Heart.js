// Singleton class to keep track of the heat lives

export class Heart {
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