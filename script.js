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

/*
tic-tac-toe coordinates
[[0][0] [0][1] [0][2]
 [1][0] [1][1] [1][2]
 [2][0] [2][1] [2][2]]
*/

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

function playGame(){
    let player1 = new CreatePlayer("player1", "X");
    //let player1_marker = player1[marker];
    let player2 = new CreatePlayer("player2", "O");
    //let player2_marker = player2[marker];
    let board = createBoard();
    
    for(let i = 0; i < 9; i++){
        if(i % 2 == 0){
            board = playerMove(player1.marker, board);
            if(checkWin(player1.marker, board)){
                displayBoard(board);
                console.log(player1.name + " wins!");
                break;
            } 
        }
        else{
            board = playerMove(player2.marker, board);
            if(checkWin(player2.marker, board)){
                displayBoard(board);
                console.log(player2.name + " wins!");
                break;
            }
        }
        displayBoard(board);
        //setTimeout(() => displayBoard(board), 2000);
    }
    if (!checkWin(player1.marker, board) && !checkWin(player2.marker, board)) {
        console.log("It's a tie!");
      }

}

playGame();