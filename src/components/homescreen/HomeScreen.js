import React from "react";
import './HomeScreen.css'
import logo from '../../assets/img/memory-game.png'
import LevelSelector from "./LevelSelector";
import NameInput from "./NameInput";
import StartButton from "./StartButton";

function HomeScreen() {

    return (
        <div className="container-homescreen" translate="no">
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