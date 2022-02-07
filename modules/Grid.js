import Observable from "./Observable.js";

export default class Grid {
  currentBlackCell;
  rightTap;
  wrongTap;

  #tappedPrevious;

  size;

  constructor(size) {
    this.size = size;
    this.rightTap = new Observable();
    this.wrongTap = new Observable();
  }

  renderGrid(container) {
    for (let i = 0, length = this.size * this.size; i < length; i++) {
      let cell = document.createElement("div");
      cell.classList.add("grid-cell");
      container.appendChild(cell);
      this.#handleCellClick(cell);
    }
  }

  #getBlackCellIndex() {
    return (
      Math.floor(Math.random() * this.size + 1) *
        Math.floor(Math.random() * this.size + 1) -
      1
    );
  }

  showBlackCell() {
    let blackCellIndex = this.#getBlackCellIndex();
    let blackCellElement =
      document.getElementsByClassName("grid-cell")[blackCellIndex];

    this.currentBlackCell = blackCellElement;

    this.#tappedPrevious = false;

    this.#highlightcell(this.currentBlackCell, 500, "active", () => {
      blackCellElement.classList.remove("active");
      this.currentBlackCell = null;
      if (!this.#tappedPrevious) {
        this.wrongTap.emit();
      }
    });
  }

  #handleCellClick(cell) {
    cell.addEventListener("click", (event) => {
      this.#tappedPrevious = true;
      if (this.currentBlackCell) {
        if (event.target === this.currentBlackCell) {
          this.currentBlackCell.classList.remove("active");
          this.#highlightcell(event.target, 200, "tapped");
          this.rightTap.emit();
        } else {
          this.#highlightcell(event.target, 200, "wrong-tap");
          this.wrongTap.emit();
        }
      }
    });
  }

  #highlightcell(cell, duration, className, cb = null) {
    cell.classList.add(className);
    setTimeout(() => {
      cell.classList.remove(className);
      cb && cb();
    }, duration);
  }
}
