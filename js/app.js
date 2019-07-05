// Array with classes of every card
let cardClass = ['apple','banana','strawberry','avocado','coconut','pineapple','watermelon','orange'];
const gameBoard = document.querySelector('.container'); //grid container for the cards
let numOfMoves = 0;
let firstSelectedCard = null;
let secondSelectedCard = null;
let counter = 0;


// Resets the cards if they are guessed wrong
function wrongCards(){
    firstSelectedCard.target.style.pointerEvents = "auto";
    secondSelectedCard.target.style.pointerEvents = "auto";
    firstSelectedCard = null;
    secondSelectedCard = null;
}

// Check if the selected cards are equal
function cardChecker(){
    if (firstSelectedCard.target.classList.item(1)===secondSelectedCard.target.classList.item(1)){
        firstSelectedCard = null;
        secondSelectedCard = null;
      return true;
    }
    wrongCards();
    return false; 
}
// Updates the number of moves the player had to do to finish the game
function updateMoves(){
    var movesSpan = document.querySelector('#moves');
    movesSpan.textContent = ++numOfMoves;
}

// Points to the clicked events that are our cards
 function cardClickEvents(event){
     if(event.target.classList.item(1)!=null){         
         if(!firstSelectedCard){
            firstSelectedCard = event;
            firstSelectedCard.target.style.pointerEvents = "none";
         }else if(!secondSelectedCard){
            secondSelectedCard = event;
            secondSelectedCard.target.style.pointerEvents = "none";
            console.log(cardChecker());
            updateMoves();          
         }
         
     }
}


// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

}

//Starting the game
function startGame() {
    gameCards = [...cardClass,...cardClass];
    shuffle(gameCards);
    for(var i=0; i<gameCards.length; i++){
        const card = document.createElement('div');
        card.setAttribute('class', `box ${gameCards[i]}`);
        gameBoard.appendChild(card);
    }
    gameBoard.addEventListener('click',cardClickEvents);
    console.log("Game started");
}

// Starts the game
startGame();