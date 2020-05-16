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
  "orange",
];
let stopTime;
let gameStatus = [0, 3, 0, true, 0];
let [counter, totalStars, numOfMoves, resetTime, seconds] = gameStatus;
const sound = document.querySelector("audio");
const gameBoard = document.querySelector(".container"); // grid container for the cards
let fragment = document.createDocumentFragment();
let firstSelectedCard,
  secondSelectedCard = null;
const movesSpan = document.querySelector(".moves");


//service worker registration
if('serviceWorker' in navigator){
  console.log('CLIENT: service worker registration in progess.');
  navigator.serviceWorker.register('../sw.js').then(()=>{
    console.log('CLIENT: service worker registration complete.');
  },()=>{
    console.log('CLIENT: service worker registration failure');
  });
}else {
  console.log('CLIENT: service worker is not supported')
}

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
  } else {
    updateMoves();
    shakeAnimation(firstSelectedCard);
    shakeAnimation(secondSelectedCard);
  }
  firstSelectedCard = secondSelectedCard = null;
}

// Check if all cards are turned and ends the game
function endGame() {
  if (counter === 8) {
    clearInterval(stopTime);
    var modal = document.querySelector(".game-won-modal");
    counter = 0;
    window.clearInterval(timerTrigger);
    var starSpan = document.querySelector("#stars");
    var movesSpan = document.querySelector("#moves");
    var totalTime = document.querySelector(".total-time");

    totalTime.textContent = seconds + " seconds";
    starSpan.textContent = totalStars;
    movesSpan.textContent = numOfMoves;
    console.log(movesSpan);
    modal.style.display = "block";

    let user = {
      numOfMoves: numOfMoves,
      time: seconds,
      totalStars: totalStars,
    };

    localStorage.setItem(1, JSON.stringify(user));
  }

  console.log("Local Storage" + localStorage.getItem(1));
}
console.log("Local Storage" + localStorage.getItem(1));
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

// Points to the clicked events that are our cards
function cardClickEvents(event) {
  if (resetTime === true) {
    timerTrigger();
  }
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

function timerTrigger() {
  resetTime = false;
  seconds++;
  document.getElementById("timer").innerHTML = seconds + " s";
  stopTime = setTimeout(timerTrigger, 1000);
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

// Reloads the game I belive this function could have been writen better it is a bit long, but necessary.
// eslint-disable-next-line no-unused-vars
function reloadGame() {
  clearInterval(stopTime);
  var modal = document.querySelector(".game-won-modal");
  var img = document.querySelector(".stars");
  var ul = document.querySelector("ul");
  var cards = [...ul.children];
  /* This was a very quick and lazy way 
  to reload the stars, but I belive it takes less time :-)
  */
  img.innerHTML = `<img src="images/baseline-star-24px.svg" alt="star" />
                  <img src="images/baseline-star-24px.svg" alt="star" />
                  <img src="images/baseline-star-24px.svg" alt="star" />`;

  //Quick way to remove the elements and values of the elements
  ul.innerHTML = movesSpan.textContent = "";
  document.getElementById("timer").innerHTML = 0 + " s";
  //Resetting the cards and game values
  firstSelectedCard = secondSelectedCard = null;
  [counter, totalStars, numOfMoves, resetTime, seconds] = gameStatus;

  //I make usage of the same elements already created in the game to shuffle them again, avoids usage of more resources
  shuffle(cards);

  //Here I am adding the cards with their attributes
  for (let card of cards) {
    card.children[0].children[0].style.display = "none";
    card.children[0].style.cssText = `pointer-events:auto;
       background-color:var(--card-color);`;
    fragment.appendChild(card);
  }
  ul.appendChild(fragment);
  modal.style.display = "none"; // and finaly we can remove the modal from the game
}

// Starting the game
function startGame() {
  var cards = [...cardClass, ...cardClass];
  const setting = JSON.parse(localStorage.getItem(2));
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

  //getting settings from localStorage
  if(!setting){
    localStorage.setItem(2, JSON.stringify({mode:'white'}));
     alert('White')
  }else if(setting.mode==='dark'){
     document.querySelector('body').setAttribute('class','theme-dark')
  }

  gameBoard.appendChild(fragment);
  gameBoard.addEventListener("click", cardClickEvents);
  console.log("Game started");
}

const darkMode = () => {
  const settings = JSON.parse(localStorage.getItem(2));
  const body = document.querySelector("body");
  let userSettings = {
  };
  
 
  if(settings!==null){
    console.log('yes')
    switch (settings.mode) {
      case "white":
        body.setAttribute('class','theme-dark')
        userSettings.mode='dark';
        break;
      case "dark":
        body.setAttribute('class','theme-light')
        userSettings.mode='white';
        break;
        default: break;
    }
  }
 
  localStorage.setItem(2, JSON.stringify(userSettings));
};
// Starts the game
startGame();
