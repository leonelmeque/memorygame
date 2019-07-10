"use strict";
// Array with classes of every card
const cardClass = [
  "apple",
  "banana",
  "strawberry",
  "avocado",
  "coconut",
  "pineapple",
  "watermelon",
  "orange"
];

const sound = document.querySelector("audio");
const gameBoard = document.querySelector(".container"); // grid container for the cards
let fragment = document.createDocumentFragment();
let numOfMoves = 0;
let firstSelectedCard = null;
let secondSelectedCard = null;
let counter = 0;
let totalStars = 3;
const movesSpan = document.querySelector(".moves");

// Resets the cards if they are guessed wrong
function wrongCards(card) {
  card.target.children[0].style.display = "none";
  card.target.style.cssText = `pointer-events:auto;
        background-color:var(--card-color);`;
}

// Check if the selected cards are equal
function cardChecker() {
  if (
    firstSelectedCard.target.classList.item(1) ===
    secondSelectedCard.target.classList.item(1)
  ) {
    squeezeCardAnimation(firstSelectedCard);
    squeezeCardAnimation(secondSelectedCard);
    counter++;
    endGame();
    firstSelectedCard = null;
    secondSelectedCard = null;
  } else {
    updateMoves();
    shakeAnimation(firstSelectedCard);
    shakeAnimation(secondSelectedCard);
    firstSelectedCard = null;
    secondSelectedCard = null;
  }
}

// Check if all cards are turned and ends the game
function endGame() {
  if (counter === 8) {
    var modal = document.querySelector('.game-won-modal');
    counter = 0;
  
    const starSpan = document.querySelector("#stars");
    const movesSpan = document.querySelector(".moves");

    modal.style.display = 'block';
    starSpan.textContent = totalStars;
    movesSpan.textContent = numOfMoves;
  }
}

// Updates the number of moves the player had to do to finish the game
function updateMoves() {
  movesSpan.textContent = ++numOfMoves;
  const star = document.querySelector(".stars");
  if (numOfMoves === 6) {
    star.children[2].src = "images/baseline-star_border-24px.svg";
    totalStars--;
  } else {
    if (numOfMoves === 12) {
      star.children[1].src = "images/baseline-star_border-24px.svg";
      totalStars--;
    } else {
      if (numOfMoves === 18) {
        star.children[0].src = "images/baseline-star_border-24px.svg";
        totalStars--;
      }
    }
  }
}

// Function to make the card shake
function shakeAnimation(card) {
  sound.src = "audio/131657__bertrof__game-sound-wrong.wav";
  sound.volume = 0.2;
  sound.play().catch(() => {});
  card.target.style.cssText = `pointer-events:auto;
        background-color:var(--card-wrong);
        animation: shake 1s ease`;
  setTimeout(wrongCards, 1000, card);
}

// Function to make the card squeeze
function squeezeCardAnimation(card) {
  sound.src = "audio/131660__bertrof__game-sound-correct.wav";
  sound.volume = 0.2;
  sound.play().catch(() => {});
  card.target.style.cssText = `pointer-events:none;
        background-color:var(--card-found); 
        animation: squeeze 1s ease `;
}

// This function flips the card and uses a animation created in the css
function flipCardAnimation(card) {
  sound.src = "audio/84322__splashdust__flipcard.wav";
  sound.volume = 1;
  sound.play();
  card.target.children[0].style.display = "block";
  card.target.style.cssText = `pointer-events:none;
        background-color:var(--card-selected); 
        animation:flip 0.5s ease;`;
}
// Reloads the game
// eslint-disable-next-line no-unused-vars
function reloadGame() {
  var modal = document.querySelector('.game-won-modal');
  var img = document.querySelector(".stars");
  img.innerHTML = `<img src="images/baseline-star-24px.svg" alt="star" />
                  <img src="images/baseline-star-24px.svg" alt="star" />
                  <img src="images/baseline-star-24px.svg" alt="star" />`;
  var ul = document.querySelector("ul");
  var cards = [...ul.children];
  modal.style.display = 'none';
  shuffle(cards);
  movesSpan.textContent = "";
  firstSelectedCard = null;
  secondSelectedCard = null;
  ul.innerHTML = "";
  counter = 0;
  numOfMoves = 0;
  for (let card of cards) {
    card.children[0].children[0].style.display = "none";
    card.children[0].style.cssText = `pointer-events:auto;
       background-color:var(--card-color);`;
    fragment.appendChild(card);
  }
    ul.appendChild(fragment);
}

// Points to the clicked events that are our cards
function cardClickEvents(event) {
  if (event.target.nodeName === "SPAN") {
    if (!firstSelectedCard) {
      flipCardAnimation((firstSelectedCard = event));
    } else {
      if (!secondSelectedCard) {
        flipCardAnimation((secondSelectedCard = event));
        setTimeout(cardChecker, 500);
      }
    }
  }
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
  let currentIndex = array.length;
  let temporaryValue;
  let randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
}

// Starting the game
function startGame() {
  var cards = [...cardClass, ...cardClass];
  shuffle(cards);

  for (let card of cards) {
    // Creating the and it's elements
    const cardItem = document.createElement("li");
    const cardCover = document.createElement("span");
    const images = document.createElement("img");

    // Setting the attributes of the cards and its elements
    cardCover.setAttribute("class", `card-cover ${card}`);
    cardItem.setAttribute("class", "box");
    images.setAttribute("src", `images/${card}.png`);

    // Adding the elements to the html and the gameBoard container
    cardCover.appendChild(images);
    cardItem.appendChild(cardCover);
    fragment.appendChild(cardItem);
  }
  gameBoard.appendChild(fragment);
  gameBoard.addEventListener("click", cardClickEvents);
  console.log("Game started");
}

// Starts the game
startGame();
