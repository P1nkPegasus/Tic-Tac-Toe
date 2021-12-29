const showStatus = document.querySelector(".game-status");

//checking if moves can still be made
let stillPlaying = true;
let currentPlayer = "X";
//creating array to track clicks and validates -- 9 in total
let validation = ["", "", "", "", "", "", "", "", ""];

//messages
const winMessage = () => `Player ${currentPlayer} has won!`;
const tieMessage = () => `Game over, it's a tie!`;
const currentPlayerTurn = () => `It is ${currentPlayer}'s turn...`;       
    showStatus.innerHTML = currentPlayerTurn();

/*  all the possible winning positions */
const winningPlays = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

/* updating game and UI to show who's move */
function boxPlayed(clickedBox, clickedBoxIndex) {
    validation[clickedBoxIndex] = currentPlayer;
    clickedBox.innerHTML = currentPlayer;
    console.log("boxPlayed");
 }

/* conditional operator*/
 function changePlayer() {
     currentPlayer = currentPlayer === "X" ? "O" : "X";
     showStatus.innerHTML = currentPlayerTurn();
     console.log("changePlayer");
 }
 

 function validateGame() {
    let winRound = false;
    for (let i = 0; i <= 7; i++) {
        const winningPlay = winningPlays[i];
        let a = validation[winningPlay[0]];
        let b = validation[winningPlay[1]];
        let c = validation[winningPlay[2]];
        if (a === "" || b === "" || c === "") {
            continue;
        }
        if (a === b && b === c) {
            winRound = true;
            break;
        }
    }
    if (winRound) {
        showStatus.innerHTML = winMessage();
        stillPlaying = false;
        return;
    }

        let tieRound = !validation.includes("");
        if (tieRound) {
            showStatus.innerHTML = tieMessage();
            stillPlaying = false;
            return;
        }
        
        changePlayer();
        console.log("validate");
 }

/* makes sure to not click on the same box */
 function boxClicked(clickedBoxEvent) {
     const clickedBox = clickedBoxEvent.target;
     const clickedBoxIndex = parseInt(clickedBox.getAttribute("box-index"));

     if (validation[clickedBoxIndex] !== "" || !stillPlaying){
         return;
        }

    boxPlayed(clickedBox, clickedBoxIndex);
    validateGame();
    console.log("boxClicked");
 }

/*sets game back to original state*/
 function startGameOver() {
     stillPlaying = true;
     currentPlayer = "X";
     validation = ["", "", "", "", "", "", "", "", ""];
     showStatus.innerHTML = currentPlayerTurn();
     document.querySelectorAll(".box").forEach(box => box.innerHTML = "");
     console.log("startGameOver");
 }

/*event listeners for clicking and to start over */
document.querySelectorAll(".box").forEach(box => box.addEventListener("click", boxClicked));
document.querySelector(".start-over").addEventListener("click", startGameOver);

