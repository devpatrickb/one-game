const startGame = document.querySelector("#startGame");
const playerCountMinusBtn = document.querySelector("#minusBtn");
const playerCountPlusBtn = document.querySelector("#plusBtn");
const playerCountInput = document.querySelector("#playercount");
const startGameBtn = document.querySelector("#startGameBtn");
const cardArea = document.querySelector("#cardArea");
const showCardsBtn = document.querySelector("#showCards");
const drawCardBtn = document.querySelector("#drawCard");
const fullscreenBtn = document.querySelector("#fullscreen");

const currentPlayerText = document.querySelector("#currentPlayer");
const nextPlayerBtn = document.querySelector("#nextPlayer");

// Screens
const startscreen = document.querySelector("#startscreen");
const playercountscreen = document.querySelector("#playercountscreen");
const gamescreen = document.querySelector("#gamescreen");

const winnerPopup = document.querySelector("#winnerPopup");
const winnerText = document.querySelector("#winnerText");
const newGame = document.querySelector("#restartGame");

// Variables
const TRANSITION_TIME = 300;

let playerCount = Number(playerCountInput.value);
let currentPlayer = 1;
let players = [];
let deck = [];
let cardsVisible = false;

let topCard = null;

// Tool Functions

function switchScreen(from, to) {
  from.classList.remove("show");

  to.style.display = "flex";

  setTimeout(() => {
    to.classList.add("show");
    from.style.display = "none";
  }, TRANSITION_TIME);
}

function setupGame() {
  currentPlayer = 1;

  deck = [];
  createDeck();
  deck = shuffle(deck);

  createPlayers();
  dealCards();

  topCard = deck.pop();
  showTopCard();

  cardsVisible = false;
  cardArea.innerHTML = "";
  showPlayer();
}

// App Functions

function showPlayer() {
  currentPlayerText.textContent = `Spieler ${currentPlayer} ist dran`;
}

function createPlayers() {
  players = [];

  for (let i = 1; i <= playerCount; i++) {
    players.push({
      name: `Spieler ${i}`,
      cards: [],
    });
  }
}

function createDeck() {
  const colors = ["Rot", "Blau", "Grün", "Gelb"];

  colors.forEach((color) => {
    for (let i = 0; i <= 9; i++) {
      deck.push(`${color} ${i}`);
    }
    for (let i = 0; i <= 9; i++) {
      deck.push(`${color} ${i}`);
    }
  });
}

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

// i < 1 zurück auf i < 7

function dealCards() {
  players.forEach((player) => {
    for (let i = 0; i < 1; i++) {
      player.cards.push(deck.pop());
    }
  });
}

function showCards() {
  const player = players[currentPlayer - 1];

  cardArea.innerHTML = "";

  player.cards.forEach((card) => {
    const button = document.createElement("button");

    const [color, number] = card.split(" ");

    button.textContent = number;

    if (color === "Rot") {
      button.classList.add("redCard");
    }

    if (color === "Blau") {
      button.classList.add("blueCard");
    }

    if (color === "Grün") {
      button.classList.add("greenCard");
    }

    if (color === "Gelb") {
      button.classList.add("yellowCard");
    }

    button.addEventListener("click", () => {
      playCard(card);
    });

    cardArea.appendChild(button);
  });
}

function drawCard() {
  const player = players[currentPlayer - 1];

  if (deck.length === 0) {
    alert("Keine Karten mehr im Stapel!");
    return;
  }

  const card = deck.pop();

  player.cards.push(card);

  cardsVisible = false;
  cardArea.innerHTML = "";

  alert(`Spieler ${currentPlayer} hat eine Karte gezogen`);
}

function playCard(card) {
  const [color, number] = card.split(" ");
  const [topColor, topNumber] = topCard.split(" ");

  if (color !== topColor && number !== topNumber) {
    alert("Diese Karte kannst du nicht legen!");
    return;
  }

  const player = players[currentPlayer - 1];

  player.cards = player.cards.filter((c) => c !== card);

  if (player.cards.length === 0) {
    showWinner(player);
    return;
  }

  topCard = card;

  cardArea.innerHTML = "";

  showTopCard();

  cardsVisible = false;
  nextPlayer();
}

function showTopCard() {
  const topCardElement = document.querySelector("#topCard");

  const [color, number] = topCard.split(" ");

  topCardElement.textContent = number;

  topCardElement.className = "";

  if (color === "Rot") {
    topCardElement.classList.add("redCard");
  }

  if (color === "Blau") {
    topCardElement.classList.add("blueCard");
  }

  if (color === "Grün") {
    topCardElement.classList.add("greenCard");
  }

  if (color === "Gelb") {
    topCardElement.classList.add("yellowCard");
  }
}

function nextPlayer() {
  currentPlayer++;
  cardsVisible = false;

  if (currentPlayer > playerCount) {
    currentPlayer = 1;
  }

  cardArea.innerHTML = "";

  showPlayer();
}

function showWinner(player) {
  winnerText.textContent = `${player.name} hat gewonnen 🎉`;
  winnerPopup.classList.add("show");
}

fullscreenBtn.addEventListener("click", () => {
  if (!document.fullscreenElement) {
    // Fullscreen aktivieren
    document.documentElement.requestFullscreen();
  } else {
    // Fullscreen verlassen
    document.exitFullscreen();
  }
});

startGame.addEventListener("click", () => {
  startscreen.classList.add("exit");
  playercountscreen.style.display = "flex";
  setTimeout(() => {
    playercountscreen.classList.add("show");
    startscreen.style.display = "none";
  }, TRANSITION_TIME);
});

playerCountMinusBtn.addEventListener("click", () => {
  if (playerCountInput.value > 2) {
    playerCountInput.value--;
    console.log(playerCountInput.value);
  } else {
    return;
  }
});

playerCountPlusBtn.addEventListener("click", () => {
  if (playerCountInput.value < 6) {
    playerCountInput.value++;
    console.log(playerCountInput.value);
  } else {
    return;
  }
});

startGameBtn.addEventListener("click", () => {
  playerCount = Number(playerCountInput.value);

  setupGame();
  switchScreen(playercountscreen, gamescreen);
});

// nextPlayerBtn.addEventListener("click", nextPlayer);

showCardsBtn.addEventListener("click", () => {
  if (!cardsVisible) {
    cardsVisible = true;
    showCards();
  }
});

drawCardBtn.addEventListener("click", drawCard);

newGame.addEventListener("click", () => {
  playerCount = Number(playerCountInput.value);

  setupGame();
  winnerPopup.classList.remove("show");
});

createDeck();
console.log(deck);
