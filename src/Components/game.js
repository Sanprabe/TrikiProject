import React from 'react';

import {GameProvider} from './gameContext';
import {GameUI} from './gameUI';


function Game () {

    return (
        // Organize the components used in the game
        <GameProvider>
            <GameUI />
        </GameProvider>
    );
}

export {Game}