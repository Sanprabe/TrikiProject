import React from 'react';

import {GameProvider} from './gameContext';
import {GameUI} from './gameUI';


function Game () {

    return (
        // Game UI its envolved in the provider
        <GameProvider>
            <GameUI />
        </GameProvider>
    );
}

export {Game}