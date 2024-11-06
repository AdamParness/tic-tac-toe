function CreatePlayer(name, marker){
    this.name = name
    this.marker = marker;
}

//function to create tic-tac-toe board
function createBoard(){
    return [["","",""],
            ["","",""],
            ["","",""]]
}

function playerMove(marker, board){
    let x = Math.floor(Math.random() * 3);
    let y = Math.floor(Math.random() * 3);
    do{
        x = Math.floor(Math.random() * 3);
        y = Math.floor(Math.random() * 3);
    } while(board[x][y] != "");

    board[x][y] = marker;
    return board;
}

function checkWin(marker, board){
    let win = false;

    //Check Diagonal Wins
    if(board[0][0] == marker && board[1][1] == marker && board[2][2] == marker) win = true;
    if(board[0][2] == marker && board[1][1] == marker && board[2][0] == marker) win = true;

    //Check Row Wins
    if(board[0][0] == marker && board[0][1] == marker && board[0][2] == marker) win = true;
    if(board[1][0] == marker && board[1][1] == marker && board[1][2] == marker) win = true;
    if(board[2][0] == marker && board[2][2] == marker && board[2][2] == marker) win = true;

    //Check Column Wins
    if(board[0][0] == marker && board[1][0] == marker && board[2][0] == marker) win = true;
    if(board[0][1] == marker && board[1][1] == marker && board[2][1] == marker) win = true;
    if(board[0][2] == marker && board[1][2] == marker && board[2][2] == marker) win = true;

    return win;
}

function displayBoard(board){

    console.log(board[0][0] + ' | ' + board[0][1] + ' | ' + board[0][2] + 
        "\n" + "-".repeat(12) + 
        "\n" + board[1][0] + ' | ' + board[1][1] + ' | ' + board[1][2] + 
        "\n" + "-".repeat(12) + 
        "\n" + board[2][0] + ' | ' + board[2][1] + ' | ' + board[2][2]);
    
}

function startGame() {
    let startBtn = document.querySelector("#start");
    let turn = document.querySelector("h2");
    
    // Define the event handler function for starting/resetting the game
    function handleGameStart() {
        let player1Name = prompt("Enter name for Player 1 (X):");
        if (player1Name === null) return; // User clicked Cancel
            
        let player2Name = prompt("Enter name for Player 2 (O):");
        if (player2Name === null) return; // User clicked Cancel
            
        // Set default names if empty strings were entered
        player1Name = player1Name.trim() || "Player 1";
        player2Name = player2Name.trim() || "Player 2";
        
        // Change button text to "Reset Game"
        startBtn.textContent = "Reset Game";
        
        // Clear the board if it's a reset
        resetBoard();
        
        // Start the game
        playGame(player1Name, player2Name);
    }
    
    // Function to reset the board
    function resetBoard() {
        let cells = document.querySelectorAll(".cell");
        cells.forEach(cell => {
            cell.textContent = "";
        });
        turn.textContent = "Click the grid to begin";
    }
    
    // Add the event listener
    startBtn.addEventListener('click', handleGameStart);
}

function playGame(name1, name2) {
    let player1 = new CreatePlayer(name1, "X");
    let player2 = new CreatePlayer(name2, "O");
    let board = createBoard();
    let turn = document.querySelector("h2");
    let cells = document.querySelectorAll(".cell"); 
    let currentPlayer = player1; 
    let gameActive = true;

    // Remove existing click event listeners from cells
    cells.forEach(cell => {
        const oldCell = cell.cloneNode(true);
        cell.parentNode.replaceChild(oldCell, cell);
    });
    
    // Get fresh NodeList of cells after replacement
    cells = document.querySelectorAll(".cell");
    
    // Create a map to track cell positions
    const cellPositions = [
        [0, 0], [0, 1], [0, 2],
        [1, 0], [1, 1], [1, 2],
        [2, 0], [2, 1], [2, 2]
    ];
    
    cells.forEach((cell, index) => {
        // Get row and column from the positions map
        const [row, col] = cellPositions[index];
        
        // Add data attributes to track position
        cell.dataset.row = row;
        cell.dataset.col = col;
        
        cell.addEventListener('click', function handleClick() {
            // Check if cell is empty and game is active
            if (cell.textContent === '' && gameActive) {
                // Update display
                cell.textContent = currentPlayer.marker;
                
                // Update board array using data attributes
                const row = parseInt(cell.dataset.row);
                const col = parseInt(cell.dataset.col);
                board[row][col] = currentPlayer.marker;
                
                // Check for win
                if (checkWin(currentPlayer.marker, board)) {
                    turn.textContent = `${currentPlayer.name} wins!`;
                    gameActive = false;
                    return;
                }
                
                // Check for tie
                if (!board.flat().includes('')) {
                    turn.textContent = "It's a tie!";
                    gameActive = false;
                    return;
                }
                
                // Switch players
                currentPlayer = currentPlayer === player1 ? player2 : player1;
                turn.textContent = `${currentPlayer.name}'s turn`;
            }
        });
    });
    
    // Initial turn display
    turn.textContent = `${currentPlayer.name}'s turn`;
}

startGame();
