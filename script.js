//your JS code here. If required.
document.addEventListener('DOMContentLoaded', function() {
    const player1Input = document.getElementById('player-1');
    const player2Input = document.getElementById('player-2');
    const submitButton = document.getElementById('submit');
    const messageDiv = document.querySelector('.message');
    const cells = document.querySelectorAll('.cell');

    let currentPlayer = 'X';
    let gameOver = false;

    submitButton.addEventListener('click', function() {
        const player1 = player1Input.value.trim();
        const player2 = player2Input.value.trim();

        if (player1 === '' || player2 === '') {
            alert('Please enter names for both players.');
            return;
        }

        initializeGame(player1, player2);
    });

    function initializeGame(player1, player2) {
        player1Input.style.display = 'none';
        player2Input.style.display = 'none';
        submitButton.style.display = 'none';

        messageDiv.textContent = `${player1}, you're up`;

        cells.forEach(cell => {
            cell.addEventListener('click', cellClickHandler);
        });
    }

    function cellClickHandler() {
        if (gameOver) return;

        if (this.textContent === '') {
            this.textContent = currentPlayer;
            checkWinner();
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            messageDiv.textContent = currentPlayer === 'X' ? `${player1Input.value}, you're up` : `${player2Input.value}, you're up`;
        }
    }

    function checkWinner() {
        const winningConditions = [
            [1, 2, 3],
            [4, 5, 6],
            [7, 8, 9],
            [1, 4, 7],
            [2, 5, 8],
            [3, 6, 9],
            [1, 5, 9],
            [3, 5, 7]
        ];

        for (let condition of winningConditions) {
            const [a, b, c] = condition;
            if (cells[a - 1].textContent !== '' && cells[a - 1].textContent === cells[b - 1].textContent && cells[a - 1].textContent === cells[c - 1].textContent) {
                gameOver = true;
                messageDiv.textContent = currentPlayer === 'X' ? `${player2Input.value} congratulations you won!` : `${player1Input.value} congratulations you won!`;
                return;
            }
        }
    }
});
