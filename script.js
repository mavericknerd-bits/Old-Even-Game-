// 1. Game variables
let playerChoice = "";   // will be "odd" or "even"
let wins = 0;
let losses = 0;

// 2. Get the elements from the page
const oddBtn = document.getElementById("oddBtn");
const evenBtn = document.getElementById("evenBtn");
const numberInput = document.getElementById("numberInput");
const playBtn = document.getElementById("playBtn");
const numbersText = document.getElementById("numbers");
const message = document.getElementById("message");
const winsText = document.getElementById("wins");
const lossesText = document.getElementById("losses");

// 3. Show a message with a colour class (win, lose or warn)
function showMessage(text, type) {
  message.textContent = text;
  message.className = type;
}

// 4. Let the player pick Odd or Even
function chooseSide(side) {
  playerChoice = side;
  oddBtn.classList.toggle("selected", side === "odd");
  evenBtn.classList.toggle("selected", side === "even");
}

// 5. Play one round
function playRound() {
  // Make sure the player picked a side
  if (playerChoice === "") {
    showMessage("Pick Odd or Even first.", "warn");
    return;
  }

  // Make sure the number is valid (1 to 10)
  const playerNumber = Number(numberInput.value);
  if (numberInput.value === "" || playerNumber < 1 || playerNumber > 10) {
    showMessage("Enter a number from 1 to 10.", "warn");
    return;
  }

  // Computer picks a random number from 1 to 10
  const computerNumber = Math.floor(Math.random() * 10) + 1;

  // Add them together and check if the total is odd or even
  const total = playerNumber + computerNumber;
  const result = total % 2 === 0 ? "even" : "odd";

  numbersText.textContent =
    "You: " + playerNumber + " + Computer: " + computerNumber +
    " = " + total + " (" + result + ")";

  // Did the player guess correctly?
  if (result === playerChoice) {
    wins = wins + 1;
    showMessage("You win!", "win");
  } else {
    losses = losses + 1;
    showMessage("You lose!", "lose");
  }

  winsText.textContent = wins;
  lossesText.textContent = losses;
  numberInput.value = "";
  numberInput.focus();
}

// 6. Connect buttons and the Enter key to the functions
oddBtn.addEventListener("click", function () { chooseSide("odd"); });
evenBtn.addEventListener("click", function () { chooseSide("even"); });
playBtn.addEventListener("click", playRound);
numberInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") playRound();
});