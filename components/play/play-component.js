import BaseComponent from "../base-component.js";
import Game from "../../modules/Game.js";
import router from "../../router.js";

const templateUrl = "/components/play/play-component.html";
const stylesUrl = "/components/play/play-component.css";

export default class PlayComponent extends BaseComponent {
  #tapToStartElement;

  constructor() {
    super(templateUrl, stylesUrl);
  }

  onLoad() {
    Game.initialize();

    Game.onReset.subscribe((_) => {
      this.#tapToStartElement["style"].display = "flex";
    });

    this.#handleButtonClick();
  }

  onUnload() {
    Game.end();
  }

  #handleButtonClick() {
    let backButton = document.getElementById("back");
    let resetButton = document.getElementById("reset");
    this.#tapToStartElement = document.getElementById("tap-to-start");

    resetButton.addEventListener("click", () => {
      Game.reset();
    });

    backButton.addEventListener("click", () => {
      router.navigate("/");
    });

    this.#tapToStartElement.addEventListener("click", () => {
      this.#tapToStartElement["style"].display = "none";
      Game.start();
    });
  }
}
