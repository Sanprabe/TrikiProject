import react from "react";

const GameContext = react.createContext();

// Has all the logic of the game in a context so it can be used in all child components
function GameProvider(props){
    
    // Imported from react Docs - Checks if there's a winner
    function calculateWinner(squares) {
        const lines = [
          [0, 1, 2],
          [3, 4, 5],
          [6, 7, 8],
          [0, 3, 6],
          [1, 4, 7],
          [2, 5, 8],
          [0, 4, 8],
          [2, 4, 6],
        ];
        for (let i = 0; i < lines.length; i++) {
          const [a, b, c] = lines[i];
          if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
          }
        }
        return null;
      }

    // Use state to have track of whats going on
    const emptyBoard = new Array(9).fill(null); // Array emptu -> Empty board

    const [board, setBoard] = react.useState(emptyBoard); // Current board
    const [isPlayerX, setIsPlayerX] = react.useState(true); // Next Player
    const [winner, setWinner] = react.useState(null); // Is there a winner yet?
    const [history, setHistory] = react.useState([]); // History of all movements
    
    
    // Runs everytime user cliks a square
        
    const onClickBox = (index) => {
        if ((board[index] != null) || winner != null) return // If board is not empy or there's winner button doesnt work 
        
        const newBoard = [...board];
        let currPlayer;
        currPlayer = isPlayerX? 'X': 'O'; // Determines curr player
        newBoard[index] = currPlayer; // Write curr player on the Square

        setBoard(newBoard);
        setIsPlayerX(prev => !prev);
    }

    // Runs everytime user cliks ButtonHistory
    const goPrevMovement = (i) => {
        
        // Remove all movement after the one clicked
        let tempHistory;
        tempHistory = [...history];
        tempHistory = tempHistory.slice(0, i + 1);
        
         // Depending on the movement set X or O
        if ( i % 2 === 0 ){
            setIsPlayerX(true);
        }else{
            setIsPlayerX(false);
        }

        setWinner(null) // No winner
        
        // Updates board
        setBoard(history[i]);
        setHistory([...tempHistory]);

    }

    // Runs every time board changes and re-render
    react.useEffect(() => {

        let tempHistory;
        tempHistory = [...history, board];
        setHistory([...tempHistory]); // Updates history
        
        // evaluates if there's a winner
        if (calculateWinner(board)){
            setWinner(calculateWinner(board));
        }

    }, [board])


    return(
        // Returns all variables that need to be used by child components
        <GameContext.Provider
            value={
                {
                    board,
                    setBoard,
                    onClickBox,
                    isPlayerX,
                    winner,
                    history,
                    goPrevMovement
                }
            }
        
        >
            {props.children}
        </GameContext.Provider>
    );
}

export {GameContext, GameProvider};