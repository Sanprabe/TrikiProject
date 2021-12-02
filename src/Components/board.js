import react from "react";
import { Square } from "./square";
import { GameContext } from './gameContext';



function Board (props) {

    const {isPlayerX, winner} = react.useContext(GameContext);

    function renderSquare(i) {
        return <Square value={i} />;
    }

    const mensajeGanador = 'Winner: ' + winner;
    const nextPlayer = isPlayerX? 'Next player: X':'Next Player: O';

    return (
    <div>
        <div className="status">
            {winner != null && mensajeGanador}
            {winner == null && nextPlayer}
        </div>
        <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
        </div>
        <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
        </div>
        <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
        </div>
    </div>
    );
}


export default Board