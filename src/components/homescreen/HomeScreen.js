import React, { useContext, useEffect } from "react";
import './HomeScreen.css'
import logo from '../../assets/img/jogo da memoria.png'
import LevelSelector from "./LevelSelector";
import NameInput from "./NameInput";
import StartButton from "./StartButton";
import { PlayerContext } from '../contexts/PlayerContext'

function HomeScreen() {

    const { playerName } = useContext(PlayerContext);

    useEffect(() => {
        console.log("Nome do jogador:", playerName);
    }, [playerName]);

    return (
        <div className="container-homescreen">
            <div className="box-logo">
                <img className="logo" src={logo} alt="logo Jogo de Memoria"/>
            </div>
            <div className="box-components">
                <NameInput />
                <LevelSelector />
                <StartButton />
            </div>
        </div>
    );
}

export default HomeScreen;