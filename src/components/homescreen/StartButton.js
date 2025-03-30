import React, { useState, useContext } from "react";
import '../../components/homescreen/HomeScreen.css';

import { useNavigate } from "react-router-dom";
import { PlayerContext } from '../contexts/PlayerContext'

function StartButton() {

    const navigate = useNavigate();
    const [showError, setShowError] = useState(false);
    const { playerName, nameError, level } = useContext(PlayerContext);


    const handleClickStart = () => {

        if(playerName && playerName.length >= 3 && playerName.length <= 5 && !nameError && level) {
            setShowError(false);
            navigate('/gamescreen', { state: { playerName, level, classeAdicional: 'background' } });
            
        }else{
            setShowError(true);


            setTimeout(() => {
                setShowError(false);
            }, 2000)
            
        }

    }

    const initialMessageStyle = {
        fontSize: '1.2em', 
        color: 'black',
    };

    const errorMessageStyle = {
        fontSize: '1em',
        color: 'red', 
        fontWeight: '700',
    };


    return(
        <div className="container-start-button">

            <div className="box-info">
                <div className="initial-info" style={initialMessageStyle} hidden={showError}>
                    Encontre todos os pares de cartas!
                </div>
                <div className="error-message" style={errorMessageStyle} hidden={!showError}>
                    Por favor, insira um nome entre 3 e 5 caracteres e selecione um nível.
                </div>
            </div>


            <div className="box-Button">

                <button className="btn-start" 
                onClick={handleClickStart}
                
                >
                    <p>start</p>
                </button>
            </div>
        </div>
    );
}

export default StartButton;