function startGame(){
    const gameBoard = document.querySelector('.container');
    

    for(let i=1; i<=16; i++){
        const div = document.createElement('div');
        div.setAttribute('class', 'box');
        gameBoard.insertAdjacentElement('afterbegin',div);
    }
    console.log("stargin game");
}

// Starts the game
startGame();