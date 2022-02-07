import AbstractView from "../abstract-component.js";
import Game from "../../modules/game.js";
import router from "../../router.js";

const templateUrl = "/components/play/play-component.html";
const stylesUrl = "/components/play/play-component.css";

export default class PlayComponent extends AbstractView {
  constructor() {
    super(templateUrl, stylesUrl);
  }

  onLoad() {
    Game.start();

    this.#handleButtonClick();
  }

  onUnload() {
    Game.end();
  }

  #handleButtonClick() {
    let backButton = document.getElementById("back");
    let resetButton = document.getElementById("reset");

    resetButton.addEventListener("click", () => {
      Game.restart();
    });

    backButton.addEventListener("click", () => {
      router.navigate("/");
    });
  }
}
