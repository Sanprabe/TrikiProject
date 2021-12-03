import react from 'react';
import { GameContext } from './gameContext';

function ButtonHistory (props) {

    const {goPrevMovement} = react.useContext(GameContext);

    return (
        <li>
            <button 
                onClick={() => goPrevMovement(props.index)}
            >
                Go back to step #{props.index}
            </button>
        </li>
    );
}

export { ButtonHistory }