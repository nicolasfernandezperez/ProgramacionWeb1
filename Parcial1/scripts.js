document.addEventListener('DOMContentLoaded', function () {
    const playerHands = [0, 0, 0]; 
    let currentPlayer = 0; 
    let round = 1; 
    let playerScores = [0, 0, 0];
    let isGameOver = false;

    const playerContainers = document.querySelectorAll('.player-container');
    const handImages = document.querySelectorAll('.hand-image');
    const roundsSelection = document.getElementById('roundsSelection');
    const humansSelection = document.getElementById('humansSelection');
    const playButton = document.getElementById('playButton');
    const hintButton = document.getElementById('hintButton');
    const resetButton = document.getElementById('resetButton');
    const scoreCounters = document.querySelectorAll('.score-counter');
    const resultMessage = document.getElementById('resultMessage');

    playButton.addEventListener('click', playRound);
    hintButton.addEventListener('click', showHint);
    resetButton.addEventListener('click', resetGame);

    function playRound() {
        if (isGameOver) {
            resultMessage.innerText = 'El juego ha terminado. Reinicia para jugar de nuevo.';
            return;
        }

        const selectedFingers = playerHands[currentPlayer];
        const uniqueFingers = new Set(playerHands);

        if (uniqueFingers.size === 3) {
            playerScores[currentPlayer] += 1;
            scoreCounters[currentPlayer].innerText = `Puntos: ${playerScores[currentPlayer]}`;
            resultMessage.innerText = `Jugador ${currentPlayer + 1} ganó el punto en la ronda ${round}!`;

            if (round >= parseInt(roundsSelection.value)) {
                endGame();
            } else {
                round++;
                resultMessage.innerText += ` Comienza la ronda ${round}.`;
                setTimeout(clearHands, 2000);
            }
        } else {
            resultMessage.innerText = `Nadie ganó el punto en la ronda ${round}. Intenta de nuevo.`;
            setTimeout(clearHands, 2000);
        }

        currentPlayer = (currentPlayer + 1) % 3;
    }

    function showHint() {
        const handsInfo = playerHands.map((fingers, index) => `Jugador ${index + 1}: ${fingers} dedos`);
        const hintMessage = `Pista: ${handsInfo.join(', ')}`;
        alert(hintMessage);
    }

    function resetGame() {
        playerHands.fill(0);
        round = 1;
        playerScores.fill(0);
        isGameOver = false;
        resultMessage.innerText = '';
        scoreCounters.forEach((counter, index) => (counter.innerText = `Puntos: ${playerScores[index]}`));
        clearHands();
    }

    function clearHands() {
        playerContainers.forEach((container) => (container.innerHTML = `<img src="images/cero.png" alt="Mano Cerrada" class="hand-image">`));
    }

    function endGame() {
        isGameOver = true;
        resultMessage.innerText = '¡El juego ha terminado! Puntuación final:';
        for (let i = 0; i < playerScores.length; i++) {
            resultMessage.innerText += `\nJugador ${i + 1}: ${playerScores[i]} puntos`;
        }
    }
});

