import router from "../router.js";
import TapGrid from "./Grid.js";
import Observable from "./Observable.js";

const bestScoreKey = "tap-the-black_best-score";

class Game {
  static instance;
  #score;
  #lives;
  #grid;
  #showBlackInterval;

  onReset = new Observable();

  constructor() {
    if (!Game.instance) {
      Game.instance = this;
    }

    return Game.instance;
  }

  get score() {
    return this.#score;
  }

  initialize() {
    this.#grid = new TapGrid(3);
    let tapGridElement = document.getElementsByClassName("tap-grid")[0];
    this.#grid.renderGrid(tapGridElement);
    this.#handleScores();
    this.#handleLives();
    this.#renderLives();
  }

  start() {
    this.#score = 0;
    this.#lives = 3;
    this.#setBlackCellInterval();
  }

  end() {
    clearInterval(this.#showBlackInterval);
  }

  #setBlackCellInterval() {
    this.#showBlackInterval && clearInterval(this.#showBlackInterval);
    this.#showBlackInterval = setInterval(() => {
      this.#grid.showBlackCell();
    }, 1000);
  }

  reset() {
    this.#score = 0;
    this.#lives = 3;
    this.#resetLives();
    this.#resetScores();
    clearInterval(this.#showBlackInterval);
    this.onReset.emit();
  }

  #handleScores() {
    let scoreElement = document.getElementsByClassName("score")[0];

    this.#grid.rightTap.subscribe((res) => {
      scoreElement.textContent = ++this.#score + "";
    });
  }

  #handleLives() {
    this.#grid.wrongTap.subscribe(async (_) => {
      this.#lives--;
      this.#resetLives();
      if (this.#lives <= 0) {
        await router.navigate("/game-over");
        this.end();
      }
    });
  }

  #resetLives() {
    let lifeElements = document.getElementsByClassName("life");
    for (let i = 0; i < 3; i++) {
      if (i >= this.#lives) {
        lifeElements.item(i).classList.add("no-life", "far");
        lifeElements.item(i).classList.remove("fas");
      } else {
        lifeElements[i].classList.add("fas", "fa-heart");
        lifeElements.item(i).classList.remove("far", "no-life");
      }
    }
  }

  #resetScores() {
    let scoreElement = document.getElementsByClassName("score")[0];

    scoreElement.textContent = 0;
  }

  #renderLives() {
    let livesElement = document.getElementsByClassName("lives")[0];

    for (let i = 0; i < 3; i++) {
      let lifeElement = document.createElement("i");
      lifeElement.classList.add("life", "fas", "fa-heart");
      livesElement.appendChild(lifeElement);
    }
  }

  getBestScore() {
    return localStorage.getItem(bestScoreKey) || 0;
  }

  setBestScore(score) {
    localStorage.setItem(bestScoreKey, score);
  }
}

export default Object.freeze(new Game());
