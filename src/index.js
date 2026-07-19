const holes = Array.from(document.querySelectorAll('.hole'));
const moles = Array.from(document.querySelectorAll('.mole'));
const scoreDisplay = document.getElementById('score');
const timerDisplay = document.getElementById('timer');
const startButton = document.getElementById('start');

let points = 0;
let duration = 0;
let timerIntervalId = null;
let activeTimeoutId = null;
let activeHole = null;
let gameRunning = false;
let currentDifficulty = 'normal';

window.holes = holes;

function randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function setDelay(difficulty) {
    if (difficulty === 'easy') {
        return 1500;
    }
    if (difficulty === 'normal') {
        return 1000;
    }
    if (difficulty === 'hard') {
        return randomInteger(600, 1200);
    }
    return 1000;
}

function chooseHole(holeList) {
    const list = Array.isArray(holeList) ? holeList : Array.from(holeList || []);
    if (!list.length) return null;
    return list[Math.floor(Math.random() * list.length)];
}

function toggleVisibility(hole) {
    if (hole) {
        hole.classList.toggle('show');
    }
    return hole;
}

function showAndHide(hole, delay) {
    toggleVisibility(hole);
    return window.setTimeout(() => {
        toggleVisibility(hole);
    }, delay);
}

function showUp(difficulty = 'normal') {
    if (activeHole) {
        activeHole.classList.remove('show');
    }

    const hole = chooseHole(holes);
    if (hole) {
        activeHole = hole;
        toggleVisibility(hole);
        const delay = setDelay(difficulty);
        clearTimeout(activeTimeoutId);
        activeTimeoutId = window.setTimeout(() => {
            if (activeHole === hole) {
                toggleVisibility(hole);
                activeHole = null;
            }
            if (gameRunning) {
                showUp(difficulty);
            }
        }, delay);
        return activeTimeoutId;
    }
    return 0;
}

function setDuration(seconds) {
    duration = seconds;
    if (timerDisplay) {
        timerDisplay.textContent = duration;
    }
    return duration;
}

function startTimer() {
    clearInterval(timerIntervalId);
    timerIntervalId = window.setInterval(updateTimer, 1000);
    return timerIntervalId;
}

function updateTimer() {
    if (duration <= 0) {
        clearInterval(timerIntervalId);
        return;
    }

    duration -= 1;
    if (timerDisplay) {
        timerDisplay.textContent = duration;
    }

    if (duration <= 0) {
        clearInterval(timerIntervalId);
        gameOver();
    }
}

function startGame() {
    gameRunning = true;
    currentDifficulty = 'normal';
    setDuration(20);
    clearScore();
    setEventListeners();
    showUp();
    startTimer();
    return 'game started';
}

function gameOver() {
    gameRunning = false;
    clearInterval(timerIntervalId);
    clearTimeout(activeTimeoutId);
    if (activeHole) {
        activeHole.classList.remove('show');
        activeHole = null;
    }
    if (duration <= 0) {
        return 'game stopped';
    }
    return showUp();
}

function updateScore() {
    points += 1;
    if (scoreDisplay) {
        scoreDisplay.textContent = points;
    }
    return points;
}

function clearScore() {
    points = 0;
    if (scoreDisplay) {
        scoreDisplay.textContent = points;
    }
    return points;
}

function whack(event) {
    if (event && event.preventDefault) {
        event.preventDefault();
    }

    if (activeHole && activeHole.classList.contains('show')) {
        activeHole.classList.remove('show');
        activeHole = null;
    }

    updateScore();
    return points;
}

function setEventListeners() {
    moles.forEach((mole) => {
        mole.onclick = whack;
    });

    if (startButton) {
        startButton.onclick = () => startGame();
    }
}

window.randomInteger = randomInteger;
window.setDelay = setDelay;
window.chooseHole = chooseHole;
window.toggleVisibility = toggleVisibility;
window.showAndHide = showAndHide;
window.showUp = showUp;
window.startGame = startGame;
window.gameOver = gameOver;
window.setDuration = setDuration;
window.updateScore = updateScore;
window.clearScore = clearScore;
window.whack = whack;
window.setEventListeners = setEventListeners;

window.addEventListener('DOMContentLoaded', () => {
    setDuration(0);
    clearScore();
    setEventListeners();
});