window.onload = function () {
    // get all the stuff from html
    let board = document.getElementById('board');
    let guessButton = document.getElementById('guessButton');
    let guessInput = document.getElementById('guessInput');

    let gamesPlayed = 0;
    let gamesWon = 0;
    let gamesLost = 0;

    // stats display
    const gamesPlayedSpan = document.getElementById('gamesPlayed');
    const gamesWonSpan = document.getElementById('gamesWon');
    const gamesLostSpan = document.getElementById('gamesLost');

    let newGameButton = document.getElementById('newGameButton');

    for (let i = 0; i < 6; i++) {
        let row = this.document.createElement('div');
        row.classList.add('row');
        board.append(row);

        for (let j = 0; j < 5; j++) {
            let cell = document.createElement('div');
            cell.classList.add('cell');
            cell.setAttribute('data-row', i);
            cell.setAttribute('data-column', j);
            row.append(cell);
        }
    }

    // word list for the game
    let word_list = ["table", "chair", "piano", "mouse", "house", "plant", "brain", "cloud", "beach", "fruit"];
    let word = word_list[Math.floor(Math.random() * word_list.length)];
    let tries = 0;
    let max_tries = 5;
    let word_len = 5;
    let gameOver = false;

    guessButton.addEventListener('click', function () {
        if (gameOver == true) // check if game finished already
        {
            alert("Game is already over");
            return;
        }
        let guess = guessInput.value.toLowerCase().trim();

        // check if word is exactly 5 letters
        if(guess.length != word_len){
            alert("Please enter a 5-letter word only");
            return;
        }
        // make sure only letters
        for(let i = 0; i < guess.length; i++){
            let code = guess.charCodeAt(i);
            if(code < 97 || code > 122){
                alert("Please enter a valid word with only letters a-z");
                return;
            }
        }

        // check each letter
        for (let i = 0; i < word_len; i++) 
        {
            let currentCell = document.querySelector(
                `[data-row="${tries}"][data-column="${i}"]`
            );
            let currentLetter = document.createTextNode(guess[i]);
            currentCell.append(currentLetter);

            if (guess[i] == word[i]) 
            {
                // correct position
                currentCell.classList.add('green');
            }
            else
            {
                if (word.indexOf(guess[i]) < 0)
                {
                    // letter not in word
                    currentCell.classList.add('red');
                }
                else
                {
                    // letter in word but wrong spot
                    currentCell.classList.add('yellow');
                }
            }
        }
        // check if won
        if (word == guess)
        {
            alert("You guessed the correct word, you deserve a cookie!🍪");
            gameOver = true;
            newGameButton.style.display = "block";

            gamesPlayed++;
            gamesWon++;
            gamesPlayedSpan.textContent = gamesPlayed;
            gamesWonSpan.textContent = gamesWon;
            return;
        };

        // check if lost
        if (tries == max_tries)
        {
            alert("You lost, but you still deserve a cookie!🍪\nThe correct word was: " + word);
            gameOver = true;
            newGameButton.style.display = "block";

            gamesPlayed++;
            gamesLost++;
            gamesPlayedSpan.textContent = gamesPlayed;
            gamesLostSpan.textContent = gamesLost;
            return;
        }

        tries++;
    })
    newGameButton.addEventListener('click', function(){
        let cells = document.querySelectorAll('.cell');
        cells.forEach(cell => {
            cell.textContent = "";
            cell.classList.remove('green', 'yellow', 'red');
        });
        guessInput.value = "";
        tries = 0;
        gameOver = false;
        word = word_list[Math.floor(Math.random() * word_list.length)];
        console.log("New word is: " + word); // TODO: remove this before submitting lol
        newGameButton.style.display = "none";

        guessInput.focus();
    });

    guessInput.addEventListener("keydown", function(event){
        if(event.key == "Enter"){
            guessButton.click();
        }
    })
}