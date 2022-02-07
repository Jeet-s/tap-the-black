import router from "../router.js";
import TapGrid from "./Grid.js";

const bestScoreKey = "tap-the-black_best-score";

class Game {
  static instance;
  #score;
  #lives;
  #tapGrid;
  #showBlackInterval;

  constructor() {
    if (!Game.instance) {
      Game.instance = this;
    }

    return Game.instance;
  }

  get score() {
    return this.#score;
  }

  start() {
    this.#score = 0;
    this.#lives = 3;
    this.#tapGrid = new TapGrid(3);
    let tapGridElement = document.getElementsByClassName("tap-grid")[0];
    this.#tapGrid.renderGrid(tapGridElement);
    this.#handleScores();
    this.#handleLives();
    this.#renderLives();
    this.#setBlackCellInterval();
  }

  end() {
    clearInterval(this.#showBlackInterval);
  }

  #setBlackCellInterval() {
    this.#showBlackInterval && clearInterval(this.#showBlackInterval);
    this.#showBlackInterval = setInterval(() => {
      this.#tapGrid.showBlackCell();
    }, 1000);
  }

  restart() {
    this.reset();
    this.#resetLives();
    setTimeout(() => {
      this.#setBlackCellInterval();
    }, 1000);
  }

  reset() {
    this.#score = 0;
    this.#lives = 3;
    console.log("clreared interval");
    clearInterval(this.#showBlackInterval);
  }

  #handleScores() {
    let scoreElement = document.getElementsByClassName("score")[0];

    this.#tapGrid.rightTap.subscribe((res) => {
      scoreElement.textContent = ++this.#score + "";
    });
  }

  #handleLives() {
    this.#tapGrid.wrongTap.subscribe(async (_) => {
      this.#lives--;
      this.#resetLives();
      console.log(this.#lives);
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
