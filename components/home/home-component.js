import BaseComponent from "../base-component.js";
import Game from "../../modules/Game.js";

const templateUrl = "/components/home/home-component.html";
const stylesUrl = "/components/home/home-component.css";

export default class HomeComponent extends BaseComponent {
  constructor() {
    super(templateUrl, stylesUrl);
  }

  onLoad() {
    let scoreElement = document.querySelector(".best-score .value");

    scoreElement["innerText"] = Game.getBestScore();
  }
}
