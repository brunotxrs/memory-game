import React, { useEffect, useRef } from "react";

import '../gamescreen/GameScreen.css'
import DashboardGame from "./Dashboard";
import Game from "./Game";
import musicBackground from '../../assets/music/background-song.mp3'



function GameScreen() {
    const gameAudioRef = useRef(new Audio(musicBackground));

    useEffect(() => {
        const gameAudio = gameAudioRef.current;

        const playAudio = () => {
            gameAudio.loop = true;
            gameAudio.play().catch(error => {
                console.error("Erro ao reproduzir áudio do jogo:", error);
            });
        };

        const pauseAudio = () => {
            gameAudio.pause();
            gameAudio.currentTime = 0;

        };

        playAudio();

        return () => {
            pauseAudio()
        };


    }, []);


    return (

        <div className="container-gamescreen">
            <DashboardGame />
            <Game />

        </div>

    );
};

export default GameScreen;