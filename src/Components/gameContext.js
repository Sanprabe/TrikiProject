import react from "react";
const GameContext = react.createContext(new Array(9).fill(null));

function GameProvider(props){
    const [board, setBoard] = react.useState(new Array(9).fill(null));
    const [isPlayerX, setIsPlayerX] = react.useState(true);
    const [winner, setWinner] = react.useState(null);

    const onClickBox = (index) => {
        if ((board[index] != null) || winner != null) return
        
        const newBoard = [...board];
        let nextPlayer;
        nextPlayer = isPlayerX? 'X': 'O';
        newBoard[index] = nextPlayer;
        
        setBoard(newBoard);
        setIsPlayerX(prev => !prev);
    }

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

      react.useEffect(() => {
        if (calculateWinner(board)){
            setWinner(calculateWinner(board));
        }

      }, [board])


    return(
        <GameContext.Provider
            value={
                {
                    board,
                    setBoard,
                    onClickBox,
                    isPlayerX,
                    winner
                }
            }
        
        >
            {props.children}
        </GameContext.Provider>
    );
}

export {GameContext, GameProvider};