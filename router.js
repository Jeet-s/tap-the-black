import GameOverComponent from "./components/game-over/game-over-component.js";
import HomeComponent from "./components/home/home-component.js";
import PlayComponent from "./components/play/play-component.js";

const views = [
  {
    path: "/",
    component: HomeComponent,
  },
  {
    path: "/play",
    component: PlayComponent,
  },
  {
    path: "/game-over",
    component: GameOverComponent,
  },
];

class Router {
  static instance;
  currentView;

  constructor() {
    if (!Router.instance) {
      document.addEventListener("DOMContentLoaded", () => {
        document.body.addEventListener("click", (e) => {
          const htmlElement = e.target;
          if (htmlElement["matches"]("[data-link]")) {
            e.preventDefault();
            this.navigate(htmlElement["attributes"]["href"].value || "/");
          }
        });
        this.navigate("/");
      });

      Router.instance = this;
    }

    return Router.instance;
  }

  async navigate(route) {
    let matchedView = views.find((v) => v.path === route);
    if (!matchedView) {
      route = "/";
      matchedView = views.find((v) => v.path === route);
    }

    if (this.currentView?.onUnload) this.currentView?.onUnload();

    this.currentView = new matchedView.component();

    document.querySelector("#router-outlet").innerHTML =
      await this.currentView.getHtml();

    if (this.currentView?.onLoad) this.currentView?.onLoad();
  }
}

export default new Router();
