export default class {
  #templateUrl = "";
  #stylesUrl = "";

  constructor(templateUrl, stylesUrl) {
    this.#templateUrl = templateUrl;
    this.#stylesUrl = stylesUrl;
  }

  async getHtml() {
    let htmlFile = await fetch(this.#templateUrl);
    let cssFile = await fetch(this.#stylesUrl);
    let rawHtml = await htmlFile.text();
    let rawCss = await cssFile.text();

    let finalHtml = `<div>
                        <style>
                          ${rawCss}
                        </style>
                          ${rawHtml}
                     </div>`;
    return finalHtml;
  }

  onLoad() {}

  onUnload() {}
}
