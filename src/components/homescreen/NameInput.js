import React, { useContext } from 'react';
import './HomeScreen.css'
import { PlayerContext } from '../contexts/PlayerContext'

function NameInput() {

    const { setPlayerName, SetNameError, nameError } = useContext(PlayerContext);

    const handleInputChange = (event) => {
        
        const name = event.target.value;
        setPlayerName(name)
        localStorage.setItem('playerName', name)
        setPlayerName(name);

        if(name.length === 0) {
            SetNameError('')
        } else if (name.length < 3) {
            SetNameError('O nome deve ter no mínimo 3 caracteres.');
        } else if (name.length > 5) {
            SetNameError('O nome deve ter no máximo 5 caracteres.');
        } else {
            SetNameError('');
        }
    }

    return (
        <div className="container-name-input">
            <div className='box-error'>{nameError && <p className="error-message">{nameError}</p>}</div>

            <div className='box-input'><input type="text" placeholder="name" autoComplete="off" translate="no" onChange={handleInputChange}/></div>
            
        </div>
    );
}

export default NameInput;