import { $, getRandom, arrayItemDelete } from "./utils.js";

const cardsContainer = $(".kun-cards");

export default class Game {
    #cardsStatus = new Map();
    #clickable = true;
    #clickTimes = 0;
    #clickedCards = [];

    constructor() {
        this.init();
    }

    init() {
        // Create map
        for(let i = 0; i < 16; i++) {
            this.#cardsStatus.set(i, true);
            
            var card = document.createElement("div");
            card.className = "kun-card";
            card.id = "c"+ i.toString();
            card.addEventListener("click", (e) => {
                this.handleCardClick(e.target.id);
            });
            cardsContainer.appendChild(card);
        }
        
        var cards = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
        for(let i = 1; i <= 8; i++) {
            var _c1 = getRandom(0, cards.length - 1);
            $("#c"+ cards[_c1]).setAttribute("data-image", "url(/static/card"+ i +".jpeg)");
            arrayItemDelete(cards, _c1);

            var _c2 = getRandom(0, cards.length - 1);
            $("#c"+ cards[_c2]).setAttribute("data-image", "url(/static/card"+ i +".jpeg)");
            arrayItemDelete(cards, _c2);
        }
    }

    handleCardClick(cardId) {
        if(!this.#clickable || this.#clickTimes > 2) return;

        const card = $("#"+ cardId);
        if(card.classList.contains("success")) return;

        card.style.backgroundImage = card.getAttribute("data-image");
        this.#clickTimes++;
        this.#clickedCards.push(card);
        if(this.#clickTimes == 2 && this.#clickedCards[0].id != this.#clickedCards[1].id) {
            this.#clickable = false;

            if(this.#clickedCards[0].getAttribute("data-image") == this.#clickedCards[1].getAttribute("data-image")) {
                this.#clickedCards[0].classList.add("success");
                this.#clickedCards[1].classList.add("success");

                this.score(1);
                reset();
            } else {
                this.score(-1);
            }
        }

        setTimeout(() => reset(), 2000);

        const reset = () => {
            card.style.backgroundImage = "none";
            if(this.#clickTimes == 2) {
                this.#clickable = true;
                this.#clickTimes = 0;
                this.#clickedCards = [];
            }
        }
    }

    score(add) {
        const scoreElem = $("#score");
        const currentScore = parseInt(scoreElem.innerText);
        scoreElem.innerText = (currentScore + add).toString();
    }
}
