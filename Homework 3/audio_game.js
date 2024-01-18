const sounds = ['sound1.mp3', 'sound2.mp3', 'sound3.mp3', 'sound4.mp3'];
let sequence = [];
let userSequence = [];
let level = 1;
let playing = false;

function playSound(sound) {
  const audio = new Audio(`${sound}`);
  audio.play();
}

function generateSequence() {
  sequence = Array.from({ length: level }, () => sounds[Math.floor(Math.random() * sounds.length)]);
}

function playSequence() {
  let i = 0;
  playing = true;

  const intervalId = setInterval(() => {
    playSound(sequence[i]);
    i++;

    if (i >= sequence.length) {
      clearInterval(intervalId);
      playing = false;
      enableUserInput();
    }
  }, 1000);
}

function enableUserInput() {
  document.getElementById('status-message').textContent = 'Repetează secvența:';
  userSequence = [];
  document.querySelectorAll('.square').forEach(square => square.addEventListener('click', handleSquareClick));
}

function handleSquareClick(event) {
  const clickedSound = event.target.dataset.sound;
  userSequence.push(clickedSound);
  playSound(clickedSound);

  if (userSequence.length === sequence.length) {
    checkSequence();
  }
}

function checkSequence() {
  for (let i = 0; i < userSequence.length; i++) {
    if (userSequence[i] !== sequence[i]) {
      endGame();
      return;
    }
  }

  level++;
  document.getElementById('status-message').textContent = 'Corect! Trecem la nivelul următor.';
  setTimeout(startGame, 1000 * level);
}

function endGame() {
  playing = false;
  document.getElementById('status-message').textContent = 'Jocul s-a încheiat. Apasă "Start Game" pentru a începe din nou.';
  level = 1;
  document.querySelectorAll('.square').forEach(square => square.removeEventListener('click', handleSquareClick));
}

function startGame() {
  if (!playing) {
    document.getElementById('status-message').textContent = '';
    generateSequence();
    playSequence();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const sequenceContainer = document.getElementById('sequence-container');

  sounds.forEach((sound, index) => {
    const square = document.createElement('div');
    square.classList.add('square');
    square.dataset.sound = sound;
    sequenceContainer.appendChild(square);
  });

  startGame();
});
