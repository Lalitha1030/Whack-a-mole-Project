const holes = Array.from(document.querySelectorAll('.hole'));
const moles = Array.from(document.querySelectorAll('.mole'));
const scoreDisplay = document.getElementById('score');
const timerDisplay = document.getElementById('timer');
const startButton = document.getElementById('start');
const restartButton = document.getElementById('restart');

let points = 0;
let duration = 0;
let timerIntervalId = null;
let activeTimeoutId = null;
let activeHole = null;
let gameRunning = false;
let currentDifficulty = 'normal';
let audioReady = false;

window.holes = holes;

function initAudio() {
    if (audioReady) return;
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const context = new AudioContext();
    const oscillator = context.createOscillator();
    const gainNode = context.createGain();
    oscillator.type = 'triangle';
    oscillator.frequency.value = 720;
    gainNode.gain.value = 0.02;
    oscillator.connect(gainNode);
    gainNode.connect(context.destination);
    oscillator.start();
    oscillator.stop(context.currentTime + 0.05);
    audioReady = true;
}

function playSound(type = 'hit') {
    if (!audioReady) initAudio();
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const context = new AudioContext();
    const oscillator = context.createOscillator();
    const gainNode = context.createGain();
    oscillator.connect(gainNode);
    gainNode.connect(context.destination);

    if (type === 'miss') {
        oscillator.type = 'square';
        oscillator.frequency.setValueAtTime(300, context.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(180, context.currentTime + 0.15);
        gainNode.gain.setValueAtTime(0.03, context.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, context.currentTime + 0.15);
    } else {
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(900, context.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(1100, context.currentTime + 0.1);
        gainNode.gain.setValueAtTime(0.04, context.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, context.currentTime + 0.1);
    }

    oscillator.start();
    oscillator.stop(context.currentTime + 0.15);
}

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

function restartGame() {
    gameRunning = false;
    clearInterval(timerIntervalId);
    clearTimeout(activeTimeoutId);
    if (activeHole) {
        activeHole.classList.remove('show');
        activeHole = null;
    }
    startGame();
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
        alert(`Game Over! Final Score: ${points}`);
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
        playSound('hit');
    } else {
        playSound('miss');
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
    document.body.addEventListener('pointerdown', initAudio, { once: true });
});