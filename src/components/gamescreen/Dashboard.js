import React, { useContext, useEffect, useState } from "react";

import '../gamescreen/GameScreen.css'
import { PlayerContext } from '../../components/contexts/PlayerContext'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faStopwatch, faUserAstronaut } from "@fortawesome/free-solid-svg-icons";

function DaschboardGame() {

    const { playerName , level} = useContext(PlayerContext);
    const [ timeRemaining,  setTimeRemaining ] = useState(0);
    const [ lives,  setLives ] = useState(0);

    useEffect(() => {
        if(timeRemaining > 0){

            const time = setInterval(() => {
                setTimeRemaining(timeRemaining -1);

                
            }, 1000);

            return () => clearInterval(time);
        }
    }, [timeRemaining]);

    useEffect(() => {
        if(level === 'easy') {
            setLives(2);
            setTimeRemaining(15);
        } else if ( level === 'medium') {
            setLives(4);
            setTimeRemaining(25);
        } else if (level === 'hard') {
            setLives(8);
            setTimeRemaining(60);
        } else {
            setLives('')
            setTimeRemaining('');
        };
    }, [level]);


    const formatTime  = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;

        return `${minutes.toString().padStart('0')}:${seconds.toString().padStart(2, '0')}`

    };

    const optionLevel = () => {

    }



    return (

        <div className="container-dashboard-game">

            <div className="box-dashboard">
                <div>
                    <span><FontAwesomeIcon icon={faUserAstronaut}/></span>
                    <span>{playerName}</span>
                </div>

                <div>
                    <span><FontAwesomeIcon icon={faStopwatch}/></span>
                    <span>{formatTime(timeRemaining)}</span>
                </div>

                <div>
                    <span><FontAwesomeIcon icon={faHeart} /></span>
                    <span>{lives}</span>
                </div>
            </div>

        </div>
    );
};

export default DaschboardGame;