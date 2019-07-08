// Array with classes of every card
let cardClass = [
  "apple",
  "banana",
  "strawberry",
  "avocado",
  "coconut",
  "pineapple",
  "watermelon",
  "orange"
];

const gameBoard = document.querySelector('.container'); //grid container for the cards
let numOfMoves = 0;
let firstSelectedCard = null;
let secondSelectedCard = null;
let counter = 0;

// Resets the cards if they are guessed wrong
function wrongCards(card) {
    card.target.children[0].style.display='none';
    card.target.style.cssText =
        `pointer-events:auto;
        background-color:var(--card-color);`;
}

// Check if the selected cards are equal
function cardChecker() {    
    if (firstSelectedCard.target.classList.item(1) === secondSelectedCard.target.classList.item(1)) {
        squeezeCardAnimation(firstSelectedCard);
        squeezeCardAnimation(secondSelectedCard);
        firstSelectedCard = null;
        secondSelectedCard = null;
      }else{
        shakeAnimation(firstSelectedCard)
        shakeAnimation(secondSelectedCard);
        firstSelectedCard = null;
        secondSelectedCard = null;
      }
 
}

// Updates the number of moves the player had to do to finish the game
function updateMoves() {
  var movesSpan = document.querySelector("#moves");
  movesSpan.textContent = ++numOfMoves;
}

function shakeAnimation(card){
    card.target.style.cssText =
        `pointer-events:auto;
        background-color:var(--card-wrong);
        animation: shake 1s ease`;
        setTimeout(wrongCards,1000,card);
}

function squeezeCardAnimation(card){
    card.target.style.cssText =
        `pointer-events:none;
        background-color:var(--card-found); 
        animation: squeeze 1s ease `;
}

// This fuction flips the card and uses a animation created in the css
function flipCardAnimation(card){
    card.target.children[0].style.display='block';
    card.target.style.cssText =
        `pointer-events:none;
        background-color:var(--card-selected); 
        animation:flip 0.5s ease;`;
}

// Points to the clicked events that are our cards
function cardClickEvents(event) {
  if (event.target.nodeName === 'SPAN') {
    if (!firstSelectedCard) {
            flipCardAnimation(firstSelectedCard = event);
    } else {
        if (!secondSelectedCard) {
            flipCardAnimation(secondSelectedCard = event);
            setTimeout(cardChecker,500);
            updateMoves();
          }
    } 
  }
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

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
  gameCards = [...cardClass, ...cardClass];
  shuffle(gameCards);

  for (var i = 0; i < gameCards.length; i++) {
    // Creating the and it's elements
    const card = document.createElement("li");
    const cardCover = document.createElement("span"); 
    const images = document.createElement("img");

    // Setting the attributes of the cards and its elements
    cardCover.setAttribute('class', `card-cover ${gameCards[i]}`);
    card.setAttribute('class','box');
    images.setAttribute('src',`/images/${gameCards[i]}.png`);

    // Adding the elements to the html and the gameBoard container
    cardCover.appendChild(images);
    card.appendChild(cardCover);
    gameBoard.appendChild(card);
  }
  gameBoard.addEventListener("click", cardClickEvents);
  console.log("Game started");
}

//Starts the game
startGame();
