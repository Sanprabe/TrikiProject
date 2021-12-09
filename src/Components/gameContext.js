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
    const emptyBoard = new Array(9).fill(null);

    const [board, setBoard] = react.useState(emptyBoard);
    const [isPlayerX, setIsPlayerX] = react.useState(true);
    const [winner, setWinner] = react.useState(null);
    const [history, setHistory] = react.useState([]);
    
    
    // Runs everytime user cliks a square
    const onClickBox = (index) => {
        if ((board[index] != null) || winner != null) return
        
        const newBoard = [...board];
        let nextPlayer;
        nextPlayer = isPlayerX? 'X': 'O';
        newBoard[index] = nextPlayer;
        
        // setWinner(null)
        setBoard(newBoard);
        setIsPlayerX(prev => !prev);
    }

    // Runs everytime user cliks ButtonHistory
    const goPrevMovement = (i) => {
        
        console.log(history[i]);
        
        let tempHistory;
        tempHistory = [...history];
        tempHistory = tempHistory.slice(0, i + 1);

        if ( i % 2 == 0 ){
            setIsPlayerX(true);
            setWinner(null);
        }else{
            setIsPlayerX(false);
            setWinner(null);
        }

        setBoard(history[i]);
        setHistory([...tempHistory]);

    }

    // Runs every time board re-render
    react.useEffect(() => {

        // console.log('board', board);

        let tempHistory;

        tempHistory = [...history, board];

        setHistory([...tempHistory]);

        // console.log('history', history);
        
        if (calculateWinner(board)){
            setWinner(calculateWinner(board));
        }

        console.log(history);

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