// Array with classes of every card
let cardClass = ['apple','banana','strawbery','peach','grape','kiwi','papaya','orange'];
const gameBoard = document.querySelector('.container'); //grid container for the cards

//Cards Click Events
function cardClickEvents(event){
     if(event.target.classList.item(1)!=null){         
         console.log(`Card was clicked: ${event.target.classList.item(1)}`);
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
function startGame(){
    gameCards = [...cardClass,...cardClass];
    shuffle(gameCards);
    for(let i=0; i<gameCards.length; i++){
        const card = document.createElement('div');
        card.setAttribute('class', `box ${gameCards[i]}`);
        gameBoard.appendChild(card);
    }
    gameBoard.addEventListener('click',cardClickEvents);
    console.log("Game started");
}

// Starts the game
startGame();