import BaseComponent from "../base-component.js";
import Game from "../../modules/Game.js";

const templateUrl = "/components/game-over/game-over-component.html";
const stylesUrl = "/components/game-over/game-over-component.css";

export default class GameOverComponent extends BaseComponent {
  constructor() {
    super(templateUrl, stylesUrl);
  }

  onLoad() {
    let scoreLement = document.querySelector(".score .value");
    let scoreLabelLement = document.querySelector(".score .label");

    scoreLement["innerText"] = Game.score;

    let bestScore = Game.getBestScore();
    if (Game.score > bestScore) {
      scoreLabelLement["innerText"] = "New Best Score";
      scoreLabelLement["style"].color = "green";
      Game.setBestScore(Game.score);
    }
  }
}
