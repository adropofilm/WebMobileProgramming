/* ------ Get User & Computer Plays ------- */


function initiateGame(userOption) {
    var computerOption = computerChoice();
    var results = compare(userOption, computerOption);
    document.getElementById("results").innerHTML = results;
}

function computerChoice() {
    /* This function returns the computer choice  */
    var compRand = Math.random();
    compPlay = (compRand < 0.33) ? compRand = "1" : (compRand <= 0.66) ? "2" : "3";
    return compPlay;
}

function compare(choiceOne, choiceTwo) {
    /* This function returns the results of who won  */
    let userWon = "Congrats! You win!";
    let computerWon = "Sorry! :( The computer won!";

    if (choiceOne === choiceTwo) return "Tie";

    if (choiceOne === "1") {
        if (choiceTwo === "2") {
            return userWon;
        } else {
            return computerWon;
        }
    }

    if (choiceOne === "2") {
        if (choiceTwo === "3") {
            return userWon;
        } else {
            return computerWon;
        }
    }

    if (choiceOne === "3") {
        if (choiceTwo === "2") {
            return computerWon;
        } else {
            return userWon;
        }
    }
}