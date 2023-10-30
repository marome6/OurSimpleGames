// Creating a score object to track the game score
const score = {
    wins : 0,
    losses : 0,
    ties: 0
};

// Listening to the storage event to check if any data is available
// in the localStorage. Then calling a callback function to update
// the scores whenever new data exists
window.addEventListener('storage', updateScores(), true);

// Generating the computer move using a random number and then
// compare it with the uaser move
function GenerateComputerMove(userMove)
{
    // Using the random() function to generate a value between 0 and 1
    // and storing it in a constant
    const randomNumber = Math.random();
    // Creating a constant to store the computer move
    let computerMove = '';
    // Checking the random value based on an assumption of dividing the range
    // from 0 to 1 into three sections
    if(randomNumber >= 0 && randomNumber < 1/3){
        computerMove = 'Rock';
    } else if(randomNumber >= 1/3 && randomNumber < 2/3){
        computerMove = 'Paper';
    } else if(randomNumber >= 2/3 && randomNumber < 1){
        computerMove = 'Scissors';
    }

    // Displaying the values
    console.log(`Random value: ${randomNumber} -- Computer move: ${computerMove} -- User move: ${userMove}`);

    // Calling the comparison function
    compareChoices(computerMove, userMove);
}


function compareChoices(computerChoice, userChoice)
{
    // Storing the comparsion result
    let theResult = '';
    // Compare the user move with the computer move
    if(computerChoice === userChoice){
        theResult = 'Tie.';
    } else if(computerChoice === 'Rock' && userChoice === 'Paper'){
        theResult = 'You win.';
    } else if(computerChoice === 'Rock' && userChoice === 'Scissors'){
        theResult = 'You lose.';
    } else if(computerChoice === 'Paper' && userChoice === 'Rock'){
        theResult = 'You lose.';
    } else if(computerChoice === 'Paper' && userChoice === 'Scissors'){
        theResult = 'You win.';
    } else if(computerChoice === 'Scissors' && userChoice === 'Paper'){
        theResult = 'You lose.';
    } else if(computerChoice === 'Scissors' && userChoice === 'Rock'){
        theResult = 'You win.';
    }

    // Updating the scores
    if(theResult === 'You win.'){
        score.wins += 1;
    } else if(theResult === 'You lose.'){
        score.losses += 1;
    } else if(theResult === 'Tie.'){
        score.ties += 1;
    }

    // Storing the updated scores in the localStorage object
    // Since localStorage works with strings only, we will convert the javaScript object
    // into string before adding it to localStorage
    localStorage.setItem('score', JSON.stringify(score));

    // Displaying the results
    displayResults(theResult, computerChoice, userChoice);
}

// Resetting the score counters
function resetCounters()
{
    score.wins = 0;
    score.losses = 0;
    score.ties = 0;
    // Deleting the saved data from the localStorage
    localStorage.removeItem('score');
    // Displaying the results
    displayResults();
}

// Updating the scores using the localStorage
function updateScores(e)
{
    // Getting the data from the localStorage and converting it back into a javaScript object
    let newScore = JSON.parse(localStorage.getItem('score'));
    // Checking the newScore if it is not null
    if(newScore === null){
        alert("There is no saved score available");
    } else {
        alert("Saved score available");
        // Updating the scores
        score.wins = newScore.wins;
        score.losses = newScore.losses;
        score.ties = newScore.ties;
    }
}

function displayResults(result='New Game', computer='No Moves', user='No Moves')
{
    // Dsiplaying the result
    // Starting by locating the paragraphs
    let theResultDisplay = document.querySelector('.jsResult');
    let theMovesDisplay = document.querySelector('.jsMoves');
    let theScoreDisplay = document.querySelector('.jsScore');

    // Populating the paragraphs with the text
    theResultDisplay.innerHTML = result;
    theMovesDisplay.innerHTML = `You <img src="images/${user}Final.png" class="moveIcon"/>
    <img src="images/${computer}Final.png" class="moveIcon"/>
    computer`;
    theScoreDisplay.innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}