import React from 'react';
import Board from './board';

import {GameProvider} from './gameContext';

function Game () {


    return (
        <GameProvider>
            <div className="game">
                <div className="game-board">
                <Board />
                </div>
                <div className="game-info">
                <div>{/* status */}</div>
                <ol>{/* TODO */}</ol>
                </div>
            </div>
        </GameProvider>
    );
}

export {Game}