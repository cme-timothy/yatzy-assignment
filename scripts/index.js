import {
    turn,
} from "./turn_actions.js";
import {
    selectResult,
} from "./score.js";

let playerOne = false;
let playerTwo = false;
let click = 0;
let turnStart = true;
let nextPlayer = false;

const getDieOne = document.querySelector("button#die-one");
const getDieTwo = document.querySelector("button#die-two");
const getDieThree = document.querySelector("button#die-three");
const getDieFour = document.querySelector("button#die-four");
const getDieFive = document.querySelector("button#die-five");

const mainButton = document.querySelector("button.main-button");
const gameExplanation = document.querySelector(".game-explanation");

const grandTotalPlayerOne = document.querySelector("#grand-total-player-one-input");
const playerOneInput = document.querySelectorAll(".player-one-input");
const buttonPlayerOneTotalUpperSection = document.querySelector("#total-of-upper-section-player-one-input");
const buttonPlayerOneTotalLowerSection = document.querySelector("#total-of-lower-section-player-one-input");
const buttonPlayerOneTotal = document.querySelector("#total-player-one-input");
const buttonPlayerOneBonus = document.querySelector("#bonus-player-one-input");

const grandTotalPlayerTwo = document.querySelector("#grand-total-player-two-input");
const playerTwoInput = document.querySelectorAll(".player-two-input");
const buttonPlayerTwoTotalUpperSection = document.querySelector("#total-of-upper-section-player-two-input");
const buttonPlayerTwoTotalLowerSection = document.querySelector("#total-of-lower-section-player-two-input");
const buttonPlayerTwoTotal = document.querySelector("#total-player-two-input");
const buttonPlayerTwoBonus = document.querySelector("#bonus-player-two-input");

mainButton.addEventListener("click", () => {
    /* reseting game */
    if (mainButton.textContent === "Reset Game") {
        for (let i = 0; i < playerOneInput.length; i++) {
            playerOneInput[i].textContent = "";
        }
        grandTotalPlayerOne.textContent = "";
        buttonPlayerOneTotalUpperSection.textContent = "";
        buttonPlayerOneTotalLowerSection.textContent = "";
        buttonPlayerOneTotal.textContent = "";
        buttonPlayerOneBonus.textContent = "";

        for (let i = 0; i < playerTwoInput.length; i++) {
            playerTwoInput[i].textContent = "";
        }
        grandTotalPlayerTwo.textContent = "";
        buttonPlayerTwoTotalUpperSection.textContent = "";
        buttonPlayerTwoTotalLowerSection.textContent = "";
        buttonPlayerTwoTotal.textContent = "";
        buttonPlayerTwoBonus.textContent = "";

        playerOne = false;
        playerTwo = false;
        click = 0;
    }
    if (mainButton.textContent === "Next Player" || mainButton.textContent === "Reset Game") {
        getDieOne.textContent = 0;
        getDieTwo.textContent = 0;
        getDieThree.textContent = 0;
        getDieFour.textContent = 0;
        getDieFive.textContent = 0;
    }
    click++;
    mainButton.textContent = "Roll Dice";
    nextPlayer = false;
    /* player one starts the game */
    if (click === 1) {
        gameExplanation.textContent = "Player 1 Turn";
    }
    if (click === 2) {
        playerOne = true;
    }
    /* player one switch */
    if (playerTwo && !turnStart) {
        gameExplanation.textContent = "Player 1 Turn";
        let onTest;
        /* winner test */
        selectResult(onTest, playerOne, playerTwo);
        if (grandTotalPlayerOne.textContent > 0 && grandTotalPlayerTwo.textContent > 0) {
            if (grandTotalPlayerOne.textContent > grandTotalPlayerTwo.textContent) {
                gameExplanation.textContent = `Player 1 Wins ${grandTotalPlayerOne.textContent} against ${grandTotalPlayerTwo.textContent}`;
            } else if (grandTotalPlayerOne.textContent < grandTotalPlayerTwo.textContent) {
                gameExplanation.textContent = `Player 2 Wins ${grandTotalPlayerTwo.textContent} against ${grandTotalPlayerOne.textContent}`;
            } else {
                gameExplanation.textContent = `Game Tie ${grandTotalPlayerOne.textContent}:${grandTotalPlayerTwo.textContent}`;
            }
            let resetButton = false
            mainButton.textContent = "Reset Game";
            selectResult(onTest, playerOne, playerTwo, resetButton);
        }
        playerOne = true;
        playerTwo = false;
        turnStart = true;
        nextPlayer = true;
    }
    /* player two switch */
    else if (playerOne && !turnStart) {
        gameExplanation.textContent = "Player 2 Turn";
        let onTest;
        selectResult(onTest, playerOne, playerTwo);
        playerOne = false;
        playerTwo = true;
        turnStart = true;
        nextPlayer = true;
    }
    /* player one turn */
    if (playerOne && turnStart && !nextPlayer) {
        turnStart = turn();
    }
    /* player two turn */
    else if (playerTwo && turnStart && !nextPlayer) {
        turnStart = turn();
    }
});

export {
    mainButton,
};
