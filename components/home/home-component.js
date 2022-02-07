import AbstractView from "../abstract-component.js";
import Game from "../../modules/game.js";

const templateUrl = "/components/home/home-component.html";
const stylesUrl = "/components/home/home-component.css";

export default class HomeComponent extends AbstractView {
  constructor() {
    super(templateUrl, stylesUrl);
  }

  onLoad() {
    let scoreElement = document.querySelector(".best-score .value");

    scoreElement["innerText"] = Game.getBestScore();
  }
}
