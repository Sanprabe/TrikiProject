import react from 'react';
import { GameContext } from './gameContext';


function Square (props) {

    const {board, onClickBox} = react.useContext(GameContext);

    return (
        <button 
            className="square"
            onClick={() => onClickBox(props.value)}
        >
            {board[props.value]}
        </button>
    );
}

export {Square}