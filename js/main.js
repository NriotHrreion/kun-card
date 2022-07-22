import { $ } from "./utils.js";
import Game from "./game.js";

// new Game();

class Main {
    #startGameButton = $("#start-game-button");
    #aboutMenuButton = $("#about-menu-button");
    #backButton = $("#back-button");
    
    #startMenu = $("#start-menu");
    #mainMenu = $("#main-menu");
    #aboutMenu = $("#about-menu");

    #currentMenu = this.#startMenu;

    /** @type {Game} */
    #game;

    constructor() {
        this.init();
    }

    init() {
        this.#startGameButton.addEventListener("click", () => {
            this.go(this.#startMenu, this.#mainMenu);
            this.startGame();
        });
        this.#aboutMenuButton.addEventListener("click", () => {
            this.go(this.#startMenu, this.#aboutMenu);
        });
        this.#backButton.addEventListener("click", () => {
            this.go(this.#currentMenu, this.#startMenu);
        });
    }

    startGame() {
        this.#game = new Game();
    }

    go(from, to) {
        from.style.display = "none";
        to.style.display = "block";
        this.#currentMenu = to;
    }
}

new Main();
