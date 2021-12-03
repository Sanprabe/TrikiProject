import react from 'react';
import Board from './board';

import { GameContext } from './gameContext';
import { ButtonHistory } from './buttonHistory';

function GameUI () {

    function renderButtonHistory(i, key){
        return < ButtonHistory index={i} key={key} array={key} />;
    }

    const {
        isPlayerX,
        winner, 
        history
        } = react.useContext(GameContext);

    const mensajeGanador = 'Winner: ' + winner;
    const nextPlayer = isPlayerX? 'Next player: X':'Next Player: O';

    const historyDisplay = [...history];
    historyDisplay.pop();

    return (
        // Organize the components used in the game
        <div className="game">
            <div className="game-board">
            <Board />
            </div>
            <div className="game-info">
            <div className="status">
                {winner != null && mensajeGanador}
                {winner == null && nextPlayer}
            </div>
            <ol>
                {
                    historyDisplay.map((arr, index) => (
                        renderButtonHistory(index, arr)
                    ))
                }
            </ol>
            </div>
        </div>
    );
}

export {GameUI}