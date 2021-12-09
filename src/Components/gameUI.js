import react from 'react';
import Board from './board';

import { GameContext } from './gameContext';
import { ButtonHistory } from './buttonHistory';

function GameUI () {

    function renderButtonHistory(i, key){
        // Pass key as unique identifier for the component
        return <ButtonHistory index={i} key={key}/>; 
    }

    const {
        isPlayerX,
        winner, 
        history
        } = react.useContext(GameContext);

    // Messages depending of the state of winner
    const mensajeGanador = 'Winner: ' + winner;
    const nextPlayer = isPlayerX? 'Next player: X':'Next Player: O';

    const historyDisplay = [...history];
    historyDisplay.pop(); // This avoid that the current board appears as a history button

    return (
        // Organize the components used in the game
        <div className="game">
            <div className="game-board">
            <Board />
            </div>
            <div className="game-info">
            <div className="status">
                {winner && mensajeGanador}
                {!winner && nextPlayer}
            </div>
            <ol>
                {
                    // Render all the history buttons on the screen (Not lat one)
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