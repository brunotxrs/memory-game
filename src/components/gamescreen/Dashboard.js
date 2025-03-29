import React, { useContext, useEffect, useState, useRef } from "react";

import '../gamescreen/GameScreen.css'
import { PlayerContext } from '../../components/contexts/PlayerContext'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faStopwatch, faUserAstronaut } from "@fortawesome/free-solid-svg-icons";

function DaschboardGame() {

    const { playerName ,  level, gameOver, setGameOver, score, setScore} = useContext(PlayerContext);
    const [ timeRemaining,  setTimeRemaining ] = useState(0);
    const [ lives,  setLives,  ] = useState(0);
    const [ initialTimeLoaded, setInitialTimeLoaded ] = useState(false);
    const timerInterval = useRef(null);

    useEffect(() => {
        let intervalId;
        console.log(timeRemaining)

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
                console.log(`💰 Bônus de ${bonusPoints} pontos aplicado. Tempo parado: ${timeRemaining}`)

            } else if(timeRemaining <= 50 && timeRemaining >= 41) {
                bonusPoints = 500
                setScore(prevScore => prevScore + bonusPoints);
                console.log(`💰 Bônus de ${bonusPoints} pontos aplicado. Tempo parado: ${timeRemaining}`)

            } else if(timeRemaining <= 40 && timeRemaining >= 31) {
                bonusPoints = 400
                setScore(prevScore => prevScore + bonusPoints);
                console.log(`💰 Bônus de ${bonusPoints} pontos aplicado. Tempo parado: ${timeRemaining}`)

            } else if(timeRemaining <= 30 && timeRemaining >= 21) {
                bonusPoints = 300
                setScore(prevScore => prevScore + bonusPoints);
                console.log(`💰 Bônus de ${bonusPoints} pontos aplicado. Tempo parado: ${timeRemaining}`)

            } else if(timeRemaining <= 20 && timeRemaining >= 11) {
                bonusPoints = 200
                setScore(prevScore => prevScore + bonusPoints);
                console.log(`💰 Bônus de ${bonusPoints} pontos aplicado. Tempo parado: ${timeRemaining}`)

            } else if(timeRemaining <= 10 && timeRemaining >= 1) {
                bonusPoints = 100
                setScore(prevScore => prevScore + bonusPoints);
                console.log(`💰 Bônus de ${bonusPoints} pontos aplicado. Tempo parado: ${timeRemaining}`)

            } 

        } else if (timeRemaining <= 0 && initialTimeLoaded && !gameOver) { // Adicionada verificação initialTimeLoaded
            setGameOver(true);
            console.log("🚩 Jogo acabou por tempo!");
            
        }

        return () => clearInterval(intervalId);
    }, [timeRemaining, gameOver, setGameOver, setScore, initialTimeLoaded]); 

    useEffect(() => {
        if (gameOver) { // Garante que o log ocorra após o gameOver
            console.log(`💰 Bônus aplicado. Pontuação total: ${score}. Tempo parado: ${timeRemaining}`);
        }
    }, [gameOver, score, timeRemaining]);

    useEffect(() => {
        if(level === 'easy') {
            setLives(2);
            setTimeRemaining(15);
            setInitialTimeLoaded(true);
        } else if ( level === 'medium') {
            setLives(4);
            setTimeRemaining(25);
            setInitialTimeLoaded(true);
        } else if (level === 'hard') {
            setLives(8);
            setTimeRemaining(60);
            setInitialTimeLoaded(true);
        } else {
            setLives('')
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

export default DaschboardGame;