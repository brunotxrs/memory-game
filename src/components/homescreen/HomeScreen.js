import React from "react";
import './HomeScreen.css'
import logo from '../../assets/img/jogo da memoria.png'
import LevelSelector from "./LevelSelector";
import NameInput from "./NameInput";
import StartButton from "./StartButton";

function HomeScreen() {
    return (
        <div className="container-homescreen">
            <div className="box-logo">
                <img className="logo" src={logo} alt="logo Jogo de Memoria"/>
            </div>
            <NameInput />
            <LevelSelector />
            <StartButton />
        </div>
    );
}

export default HomeScreen;