import React, { useContext, useEffect, useState, useRef } from "react";

import '../gamescreen/GameScreen.css'
import { PlayerContext } from '../../components/contexts/PlayerContext'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faStopwatch, faUserAstronaut } from "@fortawesome/free-solid-svg-icons";

function DashboardGame() {

    const { playerName ,  level, gameOver, setGameOver, score, setScore, lives} = useContext(PlayerContext);
    const [ timeRemaining,  setTimeRemaining ] = useState(0);
    const [ initialTimeLoaded, setInitialTimeLoaded ] = useState(false);
    const timerInterval = useRef(null);

    useEffect(() => {
        let intervalId;


        if(timeRemaining > 0 && !gameOver){ 
            intervalId = setInterval(() => {
                setTimeRemaining(prevTime => prevTime -1);
            }, 1000);
            timerInterval.current = intervalId;
        } else if (gameOver) {
            clearInterval(intervalId); 

            let bonusPoints = 0;
            if(timeRemaining <= 60 && timeRemaining >= 51) {
                bonusPoints = 600
                setScore(prevScore => prevScore + bonusPoints);

            } else if(timeRemaining <= 50 && timeRemaining >= 41) {
                bonusPoints = 500
                setScore(prevScore => prevScore + bonusPoints);


            } else if(timeRemaining <= 40 && timeRemaining >= 31) {
                bonusPoints = 400
                setScore(prevScore => prevScore + bonusPoints);

            } else if(timeRemaining <= 30 && timeRemaining >= 21) {
                bonusPoints = 300
                setScore(prevScore => prevScore + bonusPoints);


            } else if(timeRemaining <= 20 && timeRemaining >= 11) {
                bonusPoints = 200
                setScore(prevScore => prevScore + bonusPoints);


            } else if(timeRemaining <= 10 && timeRemaining >= 1) {
                bonusPoints = 100
                setScore(prevScore => prevScore + bonusPoints);


            } 

        } else if (timeRemaining <= 0 && initialTimeLoaded && !gameOver) { 
            setGameOver(true);
            
        }

        return () => clearInterval(intervalId);
    }, [timeRemaining, gameOver, setGameOver, setScore, initialTimeLoaded]); 


    useEffect(() => {
        if(level === 'easy') {
            setTimeRemaining(15);
            setInitialTimeLoaded(true);
        } else if ( level === 'medium') {
            setTimeRemaining(25);
            setInitialTimeLoaded(true);
        } else if (level === 'hard') {
            setTimeRemaining(60);
            setInitialTimeLoaded(true);
        } else {
            setTimeRemaining('');
            setInitialTimeLoaded(false);
        };
    }, [level]);


    const formatTime  = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;

        return `${minutes.toString().padStart('0')}:${seconds.toString().padStart(2, '0')}`

    };


    return (

        <div className="container-dashboard-game" translate="no">

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

export default DashboardGame;